
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Envio from '../../../pages/clientes/Envio';

import {
    agregarProducto,
    obtenerProductos
} from '../../../scripts/storage/storage';

import {
    agregarAlCarrito
} from '../../../scripts/storage/carritoStorage';

describe('Envio Component', () => {

    const productoEjemplo = {
        nombre: 'Perfume Prueba Envio',
        descripcion: 'Perfume para realizar pruebas',
        imagen: '/imagenes/perfume-prueba.webp',
        precio: 64,
        precioAnterior: null,
        stock: 10
    };

    let respaldoStorage;

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

    const prepararCarrito = () => {
        agregarProducto(productoEjemplo);

        const productoGuardado = obtenerProductos().find(
            (producto) => producto.nombre === productoEjemplo.nombre
        );

        expect(productoGuardado).toBeDefined();

        const agregado = agregarAlCarrito(productoGuardado.id, 2);

        expect(agregado).toBe(true);
    };

    const renderEnvio = () => {
        return render(
            <MemoryRouter initialEntries={['/envio']}>
                <Routes>
                    <Route path="/envio" element={<Envio />} />

                    <Route
                        path="/catalogo"
                        element={<h1>Catálogo de prueba</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    };


    it('muestra un mensaje cuando el carrito está vacío', () => {
        renderEnvio();

        const titulo = screen.getByText('Tu carrito está vacío');

        const descripcion = screen.getByText(
            'Agrega productos antes de finalizar tu compra.'
        );

        const enlace = screen.getByRole('link', {
            name: 'Explorar catálogo'
        });

        expect(titulo).toBeTruthy();
        expect(descripcion).toBeTruthy();
        expect(enlace.getAttribute('href')).toBe('/catalogo');
    });


    it('muestra el formulario cuando existen productos', () => {
        prepararCarrito();

        const { container } = renderEnvio();

        const titulo = screen.getByText('Finalizar compra');

        const nombre = screen.getByLabelText('Nombre completo');

        const boton = screen.getByRole('button', {
            name: 'Confirmar compra'
        });

        const total = container.querySelector(
            '.resumen-compra-total'
        );

        expect(titulo).toBeTruthy();
        expect(nombre).toBeTruthy();
        expect(boton).toBeTruthy();
        expect(total.textContent).toContain('$128');
    });


    it('impide confirmar si el carrito se vació', () => {
        prepararCarrito();

        const mockAlert = spyOn(window, 'alert');

        renderEnvio();

        const boton = screen.getByRole('button', {
            name: 'Confirmar compra'
        });

        localStorage.removeItem('bergen_carrito');

        fireEvent.submit(boton.closest('form'));

        expect(mockAlert).toHaveBeenCalledWith(
            'Tu carrito está vacío.'
        );

        expect(
            screen.queryByText('¡Compra confirmada!')
        ).toBeNull();
    });

});
