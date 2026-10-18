
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import DetalleProducto from '../../../pages/publicas/DetalleProducto';

import {
    agregarProducto,
    obtenerProductos
} from '../../../scripts/storage/storage';

import {
    obtenerCarrito
} from '../../../scripts/storage/carritoStorage';

describe('DetalleProducto Component', () => {

    const productoEjemplo = {
        nombre: 'Perfume Prueba Detalle',
        descripcion: 'Fragancia de prueba',
        imagen: '/imagenes/perfume-prueba.webp',
        precio: 64,
        precioAnterior: 80,
        stock: 5
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

    const prepararProducto = () => {
        agregarProducto(productoEjemplo);

        const productoGuardado = obtenerProductos().find(
            (producto) => producto.nombre === productoEjemplo.nombre
        );

        expect(productoGuardado).toBeDefined();

        return productoGuardado;
    };

    const renderDetalle = (id) => {
        return render(
            <MemoryRouter initialEntries={['/producto/' + id]}>
                <Routes>
                    <Route
                        path="/producto/:id"
                        element={<DetalleProducto />}
                    />
                </Routes>
            </MemoryRouter>
        );
    };


    it('muestra un mensaje cuando el producto no existe', () => {
        renderDetalle('producto-inexistente-999999');

        expect(
            screen.getByText('Producto no encontrado')
        ).toBeTruthy();

        expect(
            screen.getByText('El perfume que buscas no está disponible.')
        ).toBeTruthy();

        const enlace = screen.getByRole('link', {
            name: 'Volver al catálogo'
        });

        expect(enlace.getAttribute('href')).toBe('/catalogo');
    });


    it('muestra correctamente la información del producto', () => {
        const producto = prepararProducto();

        renderDetalle(producto.id);

        expect(
            screen.getByText('Perfume Prueba Detalle')
        ).toBeTruthy();

        expect(
            screen.getByText('Fragancia de prueba')
        ).toBeTruthy();

        expect(
            screen.getByText('Stock disponible: 5')
        ).toBeTruthy();

        const imagen = screen.getByAltText('Perfume Prueba Detalle');

        expect(imagen.getAttribute('src')).toBe(
            '/imagenes/perfume-prueba.webp'
        );

        expect(
            screen.getByRole('button', {
                name: 'Agregar al carrito'
            })
        ).toBeTruthy();
    });


    it('permite modificar la cantidad y agregar el producto al carrito', () => {
        const producto = prepararProducto();

        const mockAlert = spyOn(window, 'alert');

        const { container } = renderDetalle(producto.id);

        const control = container.querySelector(
            '.detalle-acciones'
        );

        const botonesCantidad = within(control).getAllByRole('button');

        fireEvent.click(botonesCantidad[1]);

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Agregar al carrito'
            })
        );

        const carrito = obtenerCarrito();

        expect(carrito.length).toBe(1);
        expect(carrito[0].id).toBe(producto.id);
        expect(carrito[0].cantidad).toBe(2);

        expect(mockAlert).toHaveBeenCalledWith(
            '2 unidad(es) de Perfume Prueba Detalle agregada(s) al carrito.'
        );
    });

});
