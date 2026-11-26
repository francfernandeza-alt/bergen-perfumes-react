
import {
    listarProductosAdmin,
    obtenerProductoAdmin,
    crearProducto,
    actualizarProducto,
    desactivarProducto,
    obtenerOpcionesCatalogo,
    convertirAProductoDTO
} from '../../services/adminProductoService';

import {
    simularFetch,
    solicitudes,
    conEstado,
    productoDTO,
    RUTA_CSRF,
    TOKEN_PRUEBA
} from '../utils/fetchSimulado';

describe('adminProductoService', () => {

    const datosFormulario = {
        nombre: '  Polo Blue  ',
        idCategoria: '1',
        idMarca: '3',
        descripcion: 'Fragancia fresca',
        precio: '64000',
        precioOferta: '',
        stock: '15',
        volumenMl: '125',
        destacado: true,
        activo: true
    };

    it('lista productos y los adapta al formato del panel', async () => {
        simularFetch({
            'GET /api/productos': [
                productoDTO({ precioOferta: 55000 })
            ]
        });

        const productos = await listarProductosAdmin();

        expect(productos.length).toBe(1);
        expect(productos[0]).toEqual(jasmine.objectContaining({
            id: 1,
            idMarca: 3,
            marca: 'Ralph Lauren',
            idCategoria: 1,
            categoria: 'Masculino',
            precio: 64000,
            precioOferta: 55000,
            imagen: 'https://i.ibb.co/abc/polo-blue.webp'
        }));
    });

    it('devuelve null cuando el producto no existe', async () => {
        simularFetch({
            'GET /api/productos/99': conEstado(404, { mensaje: 'Producto no encontrado: 99' })
        });

        expect(await obtenerProductoAdmin(99)).toBeNull();
    });

    it('crea un producto enviando el DTO, la sesión y el token CSRF', async () => {
        const espia = simularFetch({
            ...RUTA_CSRF,
            'POST /api/productos': conEstado(201, productoDTO({ idProducto: 20 }))
        });

        const creado = await crearProducto(datosFormulario);

        const [envio] = solicitudes(espia);

        expect(envio.metodo).toBe('POST');
        expect(envio.opciones.credentials).toBe('include');
        expect(envio.opciones.headers['X-XSRF-TOKEN']).toBe(TOKEN_PRUEBA);
        expect(JSON.parse(envio.opciones.body)).toEqual({
            idCategoria: 1,
            idMarca: 3,
            nombre: 'Polo Blue',
            descripcion: 'Fragancia fresca',
            precio: 64000,
            precioOferta: null,
            stock: 15,
            volumenMl: 125,
            destacado: true,
            activo: true
        });

        expect(creado.id).toBe(20);
    });

    it('actualiza un producto con PUT', async () => {
        const espia = simularFetch({
            ...RUTA_CSRF,
            'PUT /api/productos/1': productoDTO({ stock: 3 })
        });

        const actualizado = await actualizarProducto(1, { ...datosFormulario, stock: '3' });

        expect(solicitudes(espia)[0].metodo).toBe('PUT');
        expect(actualizado.stock).toBe(3);
    });

    it('desactiva un producto con DELETE', async () => {
        const espia = simularFetch({
            ...RUTA_CSRF,
            'DELETE /api/productos/1': conEstado(204)
        });

        await desactivarProducto(1);

        const [envio] = solicitudes(espia);

        expect(envio.metodo).toBe('DELETE');
        expect(envio.opciones.headers['X-XSRF-TOKEN']).toBe(TOKEN_PRUEBA);
    });

    it('muestra el mensaje de validación del backend', async () => {
        simularFetch({
            ...RUTA_CSRF,
            'POST /api/productos': conEstado(400, {
                mensaje: 'El precio de oferta debe estar entre cero y el precio normal'
            })
        });

        await expectAsync(crearProducto(datosFormulario))
            .toBeRejectedWithError(Error, 'El precio de oferta debe estar entre cero y el precio normal');
    });

    it('informa cuando el usuario no tiene permisos', async () => {
        simularFetch({
            ...RUTA_CSRF,
            'DELETE /api/productos/1': conEstado(403)
        });

        await expectAsync(desactivarProducto(1))
            .toBeRejectedWithError(Error, 'No tienes permisos para realizar esta acción.');
    });

    it('convierte campos opcionales vacíos en null', () => {
        const dto = convertirAProductoDTO({
            ...datosFormulario,
            descripcion: '   ',
            volumenMl: ''
        });

        expect(dto.descripcion).toBeNull();
        expect(dto.volumenMl).toBeNull();
        expect(dto.precioOferta).toBeNull();
    });

    it('obtiene marcas y categorías sin repetir y ordenadas', () => {
        const opciones = obtenerOpcionesCatalogo([
            { idMarca: 3, marca: 'Ralph Lauren', idCategoria: 1, categoria: 'Masculino' },
            { idMarca: 5, marca: 'Dior', idCategoria: 2, categoria: 'Femenino' },
            { idMarca: 3, marca: 'Ralph Lauren', idCategoria: 1, categoria: 'Masculino' }
        ]);

        expect(opciones.marcas).toEqual([
            { id: 5, nombre: 'Dior' },
            { id: 3, nombre: 'Ralph Lauren' }
        ]);

        expect(opciones.categorias).toEqual([
            { id: 2, nombre: 'Femenino' },
            { id: 1, nombre: 'Masculino' }
        ]);
    });

});
