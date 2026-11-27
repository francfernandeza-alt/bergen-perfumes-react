
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';

import FormularioProductoAdmin from '../../../pages/admin/FormularioProductoAdmin';

import {
    simularFetch,
    solicitudes,
    conEstado,
    productoDTO,
    RUTA_CSRF
} from '../../utils/fetchSimulado';

describe('FormularioProductoAdmin Component', () => {

    const URL_IMGBB = 'https://i.ibb.co/xyz/nuevo.png';

    const productosBackend = [
        productoDTO(),
        productoDTO({
            idProducto: 2,
            nombre: 'Miss Dior',
            idCategoria: 2,
            nombreCategoria: 'Femenino',
            idMarca: 5,
            nombreMarca: 'Dior'
        })
    ];

    // Muestra el aviso que llega al listado después de guardar
    function ListadoDePrueba() {
        const location = useLocation();

        return (
            <div>
                <h1>Listado de productos</h1>
                <p>{location.state?.aviso?.texto}</p>
            </div>
        );
    }

    const renderFormulario = (ruta = '/admin/productos/nuevo') => render(
        <MemoryRouter initialEntries={[ruta]}>
            <Routes>
                <Route
                    path="/admin/productos/nuevo"
                    element={<FormularioProductoAdmin />}
                />

                <Route
                    path="/admin/productos/editar/:id"
                    element={<FormularioProductoAdmin />}
                />

                <Route
                    path="/admin/productos"
                    element={<ListadoDePrueba />}
                />
            </Routes>
        </MemoryRouter>
    );

    const cambiar = (etiqueta, valor) => {
        fireEvent.change(screen.getByLabelText(etiqueta), {
            target: { value: valor }
        });
    };

    const completarNuevoProducto = () => {
        cambiar('Nombre del perfume', 'Sauvage');
        cambiar('Categoría del perfume', '1');
        cambiar('Marca del perfume', '5');
        cambiar('Precio', '90000');
        cambiar('Stock disponible', '8');

        fireEvent.change(screen.getByLabelText('Imagen del perfume'), {
            target: {
                files: [new File([new Uint8Array(100)], 'sauvage.png', { type: 'image/png' })]
            }
        });
    };

    const enviar = (nombreBoton) => {
        fireEvent.submit(
            screen.getByRole('button', { name: nombreBoton }).closest('form')
        );
    };


    it('carga marcas y categorías desde los productos del backend', async () => {
        simularFetch({
            'GET /api/v2/productos': productosBackend
        });

        renderFormulario();

        expect(screen.getByText('Cargando formulario...')).toBeTruthy();

        expect(await screen.findByText('Agregar nuevo perfume')).toBeTruthy();
        expect(screen.getByRole('option', { name: 'Dior' })).toBeTruthy();
        expect(screen.getByRole('option', { name: 'Femenino' })).toBeTruthy();
    });


    it('sube la imagen, crea el producto, asocia la imagen y vuelve al listado', async () => {
        const espia = simularFetch({
            ...RUTA_CSRF,
            'GET /api/v2/productos': productosBackend,
            'POST /api/v2/productos/imagenes/upload': { url: URL_IMGBB },
            'POST /api/v2/productos': conEstado(201, productoDTO({
                idProducto: 30,
                nombre: 'Sauvage',
                imagenPrincipal: null
            })),
            'POST /api/v2/productos/30/imagen-principal': productoDTO({
                idProducto: 30,
                nombre: 'Sauvage',
                imagenPrincipal: URL_IMGBB
            })
        });

        renderFormulario();

        await screen.findByText('Agregar nuevo perfume');

        completarNuevoProducto();
        enviar('Agregar producto');

        expect(await screen.findByText('Listado de productos')).toBeTruthy();
        expect(screen.getByText('"Sauvage" se creó correctamente.')).toBeTruthy();

        const envios = solicitudes(espia).filter((s) => s.metodo === 'POST');

        expect(envios.map((s) => s.ruta)).toEqual([
            '/api/v2/productos/imagenes/upload',
            '/api/v2/productos',
            '/api/v2/productos/30/imagen-principal'
        ]);

        expect(JSON.parse(envios[1].opciones.body)).toEqual(jasmine.objectContaining({
            nombre: 'Sauvage',
            idCategoria: 1,
            idMarca: 5,
            precio: 90000,
            stock: 8
        }));

        expect(JSON.parse(envios[2].opciones.body).url).toBe(URL_IMGBB);
    });


    it('no crea el producto si la imagen no se pudo subir', async () => {
        const espia = simularFetch({
            ...RUTA_CSRF,
            'GET /api/v2/productos': productosBackend,
            'POST /api/v2/productos/imagenes/upload': conEstado(502, {
                mensaje: 'ImgBB no pudo procesar la imagen'
            })
        });

        renderFormulario();

        await screen.findByText('Agregar nuevo perfume');

        completarNuevoProducto();
        enviar('Agregar producto');

        expect(
            await screen.findByText('No se pudo subir la imagen: ImgBB no pudo procesar la imagen')
        ).toBeTruthy();

        // Los datos escritos se conservan para reintentar
        expect(screen.getByLabelText('Nombre del perfume').value).toBe('Sauvage');

        expect(
            solicitudes(espia).some((s) => s.metodo === 'POST' && s.ruta === '/api/v2/productos')
        ).toBeFalse();
    });


    it('avisa si el producto se guardó pero la imagen no se pudo asociar', async () => {
        simularFetch({
            ...RUTA_CSRF,
            'GET /api/v2/productos': productosBackend,
            'POST /api/v2/productos/imagenes/upload': { url: URL_IMGBB },
            'POST /api/v2/productos': conEstado(201, productoDTO({ idProducto: 30, nombre: 'Sauvage' })),
            'POST /api/v2/productos/30/imagen-principal': conEstado(500)
        });

        renderFormulario();

        await screen.findByText('Agregar nuevo perfume');

        completarNuevoProducto();
        enviar('Agregar producto');

        expect(await screen.findByText('Listado de productos')).toBeTruthy();
        expect(screen.getByText(/se guardó, pero no se pudo asociar la imagen/)).toBeTruthy();
    });


    it('muestra el mensaje de validación del backend al crear', async () => {
        simularFetch({
            ...RUTA_CSRF,
            'GET /api/v2/productos': productosBackend,
            'POST /api/v2/productos/imagenes/upload': { url: URL_IMGBB },
            'POST /api/v2/productos': conEstado(404, { mensaje: 'Marca no encontrada: 5' })
        });

        renderFormulario();

        await screen.findByText('Agregar nuevo perfume');

        completarNuevoProducto();
        enviar('Agregar producto');

        expect(await screen.findByText('Marca no encontrada: 5')).toBeTruthy();
        expect(screen.queryByText('Listado de productos')).toBeNull();
    });


    it('carga el producto al editar y lo actualiza sin cambiar la imagen', async () => {
        const espia = simularFetch({
            ...RUTA_CSRF,
            'GET /api/v2/productos': productosBackend,
            'GET /api/v2/productos/1': productoDTO(),
            'PUT /api/v2/productos/1': productoDTO({ stock: 30 })
        });

        renderFormulario('/admin/productos/editar/1');

        expect(await screen.findByText('Editar perfume')).toBeTruthy();
        expect(screen.getByLabelText('Nombre del perfume').value).toBe('Polo Blue');

        cambiar('Stock disponible', '30');
        enviar('Guardar cambios');

        expect(await screen.findByText('"Polo Blue" se actualizó correctamente.')).toBeTruthy();

        const metodos = solicitudes(espia).map((s) => `${s.metodo} ${s.ruta}`);

        expect(metodos).toContain('PUT /api/v2/productos/1');
        expect(metodos).not.toContain('POST /api/v2/productos/imagenes/upload');
        expect(JSON.parse(
            solicitudes(espia).find((s) => s.metodo === 'PUT').opciones.body
        ).stock).toBe(30);
    });


    it('muestra un mensaje cuando el producto no existe y permite volver', async () => {
        simularFetch({
            'GET /api/v2/productos': productosBackend,
            'GET /api/v2/productos/999': conEstado(404, { mensaje: 'Producto no encontrado: 999' })
        });

        renderFormulario('/admin/productos/editar/999');

        expect(await screen.findByText('Producto no encontrado')).toBeTruthy();

        fireEvent.click(screen.getByRole('button', { name: 'Volver a productos' }));

        await waitFor(() => {
            expect(screen.getByText('Listado de productos')).toBeTruthy();
        });
    });

});
