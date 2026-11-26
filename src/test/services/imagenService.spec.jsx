
import {
    validarImagen,
    subirImagen,
    asignarImagenPrincipal,
    TAMANO_MAXIMO_IMAGEN
} from '../../services/imagenService';

import {
    simularFetch,
    solicitudes,
    conEstado,
    productoDTO,
    RUTA_CSRF,
    TOKEN_PRUEBA
} from '../utils/fetchSimulado';

describe('imagenService', () => {

    const URL_IMGBB = 'https://i.ibb.co/abc/polo-blue.png';

    const crearArchivo = (tipo = 'image/png', tamano = 100, nombre = 'perfume.png') =>
        new File([new Uint8Array(tamano)], nombre, { type: tipo });

    it('acepta imágenes JPG, PNG y WEBP de hasta 1 MB', () => {
        expect(validarImagen(crearArchivo('image/jpeg'))).toBeNull();
        expect(validarImagen(crearArchivo('image/png'))).toBeNull();
        expect(validarImagen(crearArchivo('image/webp'))).toBeNull();
        expect(validarImagen(crearArchivo('image/png', TAMANO_MAXIMO_IMAGEN))).toBeNull();
    });

    it('rechaza formatos no permitidos', () => {
        expect(validarImagen(crearArchivo('image/gif')))
            .toBe('Formato no permitido. Usa JPG, PNG o WEBP.');

        expect(validarImagen(crearArchivo('application/pdf')))
            .toBe('Formato no permitido. Usa JPG, PNG o WEBP.');
    });

    it('rechaza archivos de más de 1 MB', () => {
        expect(validarImagen(crearArchivo('image/png', TAMANO_MAXIMO_IMAGEN + 1)))
            .toBe('La imagen no puede superar 1 MB.');
    });

    it('rechaza la ausencia de archivo', () => {
        expect(validarImagen(null)).toBe('Debes seleccionar una imagen.');
    });

    it('sube la imagen al backend y devuelve la URL de ImgBB', async () => {
        const espia = simularFetch({
            ...RUTA_CSRF,
            'POST /api/productos/imagenes/upload': { url: URL_IMGBB }
        });

        const archivo = crearArchivo();
        const url = await subirImagen(archivo);

        const [envio] = solicitudes(espia);

        expect(url).toBe(URL_IMGBB);
        expect(envio.opciones.credentials).toBe('include');
        expect(envio.opciones.headers['X-XSRF-TOKEN']).toBe(TOKEN_PRUEBA);

        // El navegador define el Content-Type multipart con su boundary
        expect(envio.opciones.headers['Content-Type']).toBeUndefined();
        expect(envio.opciones.body instanceof FormData).toBeTrue();
        expect(envio.opciones.body.get('imagen')).toBe(archivo);
    });

    it('nunca contacta a ImgBB directamente desde el navegador', async () => {
        const espia = simularFetch({
            ...RUTA_CSRF,
            'POST /api/productos/imagenes/upload': { url: URL_IMGBB }
        });

        await subirImagen(crearArchivo());

        espia.calls.allArgs().forEach(([url]) => {
            expect(String(url)).not.toContain('imgbb.com');
        });
    });

    it('no envía archivos inválidos al backend', async () => {
        const espia = simularFetch({});

        await expectAsync(subirImagen(crearArchivo('image/gif')))
            .toBeRejectedWithError(Error, 'Formato no permitido. Usa JPG, PNG o WEBP.');

        expect(espia).not.toHaveBeenCalled();
    });

    it('muestra el error cuando ImgBB falla', async () => {
        simularFetch({
            ...RUTA_CSRF,
            'POST /api/productos/imagenes/upload': conEstado(502, {
                mensaje: 'ImgBB no pudo procesar la imagen'
            })
        });

        await expectAsync(subirImagen(crearArchivo()))
            .toBeRejectedWithError(Error, 'ImgBB no pudo procesar la imagen');
    });

    it('asocia la URL como imagen principal del producto', async () => {
        const espia = simularFetch({
            ...RUTA_CSRF,
            'POST /api/productos/7/imagen-principal': productoDTO({
                idProducto: 7,
                imagenPrincipal: URL_IMGBB
            })
        });

        const producto = await asignarImagenPrincipal(7, URL_IMGBB, 'Polo Blue');

        const [envio] = solicitudes(espia);

        expect(JSON.parse(envio.opciones.body)).toEqual({
            url: URL_IMGBB,
            textoAlternativo: 'Polo Blue'
        });
        expect(envio.opciones.headers['X-XSRF-TOKEN']).toBe(TOKEN_PRUEBA);
        expect(producto.imagenPrincipal).toBe(URL_IMGBB);
    });

});
