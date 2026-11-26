
import {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    waitForElementToBeRemoved
} from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import ProductosAdmin from '../../../pages/admin/ProductosAdmin';
import { AuthProvider } from '../../../context/AuthContext.jsx';

import {
    simularFetch,
    solicitudes,
    conEstado,
    productoDTO,
    RUTA_CSRF
} from '../../utils/fetchSimulado';

describe('ProductosAdmin Component', () => {

    const sesion = (rol = 'ADMIN') => ({
        'GET /api/autenticacion/sesion': {
            idUsuario: 1,
            correo: 'admin@bergen.com',
            rol
        }
    });

    const productosBackend = [
        productoDTO(),
        productoDTO({
            idProducto: 2,
            nombre: 'Versace Eros',
            idMarca: 4,
            nombreMarca: 'Versace',
            stock: 0
        })
    ];

    const renderPagina = (estado = null) => render(
        <MemoryRouter
            initialEntries={[{ pathname: '/admin/productos', state: estado }]}
        >
            <AuthProvider>
                <Routes>
                    <Route
                        path="/admin/productos"
                        element={<ProductosAdmin />}
                    />

                    <Route
                        path="/admin/productos/nuevo"
                        element={<h1>Formulario de nuevo producto</h1>}
                    />

                    <Route
                        path="/admin/productos/editar/:id"
                        element={<h1>Formulario de edición</h1>}
                    />
                </Routes>
            </AuthProvider>
        </MemoryRouter>
    );


    it('muestra un indicador de carga y luego los productos del backend', async () => {
        simularFetch({
            ...sesion(),
            'GET /api/productos': productosBackend
        });

        renderPagina();

        expect(screen.getByText('Cargando productos...')).toBeTruthy();

        expect(await screen.findByText('Polo Blue')).toBeTruthy();
        expect(screen.getByText('Versace Eros')).toBeTruthy();
        expect(screen.getByText('Total de productos: 2')).toBeTruthy();
        expect(screen.queryByText('Cargando productos...')).toBeNull();
    });


    it('muestra un error si el backend falla y permite reintentar', async () => {
        let intentos = 0;

        simularFetch({
            ...sesion(),
            'GET /api/productos': () => {
                intentos++;
                return intentos === 1
                    ? conEstado(500)
                    : productosBackend;
            }
        });

        renderPagina();

        expect(
            await screen.findByText('No se pudieron cargar los productos.')
        ).toBeTruthy();

        fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));

        expect(await screen.findByText('Polo Blue')).toBeTruthy();
    });


    it('desactiva un producto, informa el resultado y actualiza el listado', async () => {
        let desactivado = false;

        const espia = simularFetch({
            ...sesion(),
            ...RUTA_CSRF,
            'GET /api/productos': () => desactivado
                ? [productosBackend[1]]
                : productosBackend,
            'DELETE /api/productos/1': () => {
                desactivado = true;
                return conEstado(204);
            }
        });

        spyOn(window, 'confirm').and.returnValue(true);

        renderPagina();

        const fila = (await screen.findByText('Polo Blue')).closest('tr');

        fireEvent.click(
            within(fila).getByRole('button', { name: 'Desactivar' })
        );

        expect(
            await screen.findByText('"Polo Blue" fue desactivado y ya no aparece en el catálogo.')
        ).toBeTruthy();

        // En Jasmine un expect fallido no lanza error, por eso se espera la eliminación del nodo
        if (screen.queryByText('Polo Blue')) {
            await waitForElementToBeRemoved(() => screen.queryByText('Polo Blue'));
        }

        expect(screen.queryByText('Polo Blue')).toBeNull();
        expect(screen.getByText('Total de productos: 1')).toBeTruthy();

        expect(
            solicitudes(espia).some((s) => s.metodo === 'DELETE' && s.ruta === '/api/productos/1')
        ).toBeTrue();
    });


    it('muestra el error del backend si no se puede desactivar', async () => {
        simularFetch({
            ...sesion(),
            ...RUTA_CSRF,
            'GET /api/productos': productosBackend,
            'DELETE /api/productos/1': conEstado(403)
        });

        spyOn(window, 'confirm').and.returnValue(true);

        renderPagina();

        const fila = (await screen.findByText('Polo Blue')).closest('tr');

        fireEvent.click(
            within(fila).getByRole('button', { name: 'Desactivar' })
        );

        expect(
            await screen.findByText('No tienes permisos para realizar esta acción.')
        ).toBeTruthy();

        expect(screen.getByText('Polo Blue')).toBeTruthy();
    });


    it('permite navegar al formulario para agregar productos', async () => {
        simularFetch({
            ...sesion(),
            'GET /api/productos': productosBackend
        });

        renderPagina();

        fireEvent.click(
            await screen.findByRole('button', { name: 'Agregar producto' })
        );

        expect(screen.getByText('Formulario de nuevo producto')).toBeTruthy();
    });


    it('muestra el aviso recibido después de guardar un producto', async () => {
        simularFetch({
            ...sesion(),
            'GET /api/productos': productosBackend
        });

        renderPagina({
            aviso: { tipo: 'success', texto: '"Polo Blue" se creó correctamente.' }
        });

        expect(
            await screen.findByText('"Polo Blue" se creó correctamente.')
        ).toBeTruthy();
    });


    it('un usuario sin rol ADMIN solo puede consultar', async () => {
        const espia = simularFetch({
            ...sesion('VENDEDOR'),
            'GET /api/productos': productosBackend
        });

        renderPagina();

        expect(await screen.findByText('Polo Blue')).toBeTruthy();

        // Esperar a que la sesión se haya consultado (se lanza error para que waitFor reintente)
        await waitFor(() => {
            const consultada = espia.calls.allArgs()
                .some(([url]) => String(url).includes('/autenticacion/sesion'));

            if (!consultada) {
                throw new Error('La sesión todavía no se consulta');
            }
        });

        expect(screen.queryByRole('button', { name: 'Agregar producto' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Editar' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Desactivar' })).toBeNull();
    });

});
