
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Carrito from '../../../pages/clientes/Carrito';

describe('Carrito Component', () => {

    let respaldoStorage = {};

    beforeEach(() => {
        respaldoStorage = {};

        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            respaldoStorage[clave] = localStorage.getItem(clave);
        }

        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();

        Object.keys(respaldoStorage).forEach((clave) => {
            localStorage.setItem(clave, respaldoStorage[clave]);
        });
    });

    const renderCarrito = () => {
        return render(
            <MemoryRouter initialEntries={['/carrito']}>
                <Routes>
                    <Route
                        path="/carrito"
                        element={<Carrito />}
                    />

                    <Route
                        path="/catalogo"
                        element={<h1>Catálogo de prueba</h1>}
                    />

                    <Route
                        path="/envio"
                        element={<h1>Envío de prueba</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    };


    it('renderiza correctamente la página del carrito', () => {
        renderCarrito();

        const titulo = screen.getByText('Mi carrito');

        const descripcion = screen.getByText(
            'Revisa los productos de tu compra.'
        );

        const enlace = screen.getByText('Continuar comprando');

        expect(titulo).toBeTruthy();
        expect(descripcion).toBeTruthy();
        expect(enlace).toBeTruthy();
    });


    it('muestra un mensaje cuando el carrito está vacío', () => {
        renderCarrito();

        const mensaje = screen.getByText('Tu carrito está vacío');

        const resumen = screen.getByText('Tu carrito está vacío.');

        expect(mensaje).toBeTruthy();
        expect(resumen).toBeTruthy();

        expect(screen.queryByRole('button', {
            name: 'Proceder al pago'
        })).toBeNull();
    });


    it('permite regresar al catálogo para continuar comprando', () => {
        renderCarrito();

        const enlace = screen.getByRole('link', {
            name: 'Continuar comprando'
        });

        expect(enlace.getAttribute('href')).toBe('/catalogo');

        fireEvent.click(enlace);

        expect(
            screen.getByText('Catálogo de prueba')
        ).toBeTruthy();

        expect(
            screen.queryByText('Mi carrito')
        ).toBeNull();
    });

});
