
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Inicio from '../../../pages/publicas/Inicio';

describe('Inicio Component', () => {

    const productosEjemplo = [
        {
            id: 1,
            nombre: 'Perfume Uno',
            descripcion: 'Fragancia uno',
            imagen: '/imagenes/uno.webp',
            precio: 64,
            stock: 10
        },
        {
            id: 2,
            nombre: 'Perfume Dos',
            descripcion: 'Fragancia dos',
            imagen: '/imagenes/dos.webp',
            precio: 50,
            stock: 10
        },
        {
            id: 3,
            nombre: 'Perfume Tres',
            descripcion: 'Fragancia tres',
            imagen: '/imagenes/tres.webp',
            precio: 70,
            stock: 10
        },
        {
            id: 4,
            nombre: 'Perfume Cuatro',
            descripcion: 'Fragancia cuatro',
            imagen: '/imagenes/cuatro.webp',
            precio: 80,
            stock: 10
        },
        {
            id: 5,
            nombre: 'Perfume Cinco',
            descripcion: 'Fragancia cinco',
            imagen: '/imagenes/cinco.webp',
            precio: 90,
            stock: 10
        },
        {
            id: 6,
            nombre: 'Perfume Seis',
            descripcion: 'Fragancia seis',
            imagen: '/imagenes/seis.webp',
            precio: 100,
            stock: 10
        }
    ];

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

    const prepararProductos = () => {
        localStorage.setItem(
            'bergen_productos',
            JSON.stringify(productosEjemplo)
        );
    };

    const renderInicio = () => {
        return render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Inicio />} />

                    <Route
                        path="/catalogo"
                        element={<h1>Catálogo de prueba</h1>}
                    />

                    <Route
                        path="/producto/:id"
                        element={<h1>Detalle de producto de prueba</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    };


    it('renderiza correctamente la página de inicio', () => {
        renderInicio();

        expect(
            screen.getByText('BIENVENIDO A BERGEN PERFUMES')
        ).toBeTruthy();

        expect(
            screen.getByText('Encuentra tu próxima fragancia')
        ).toBeTruthy();

        expect(
            screen.getByText('Perfumes destacados')
        ).toBeTruthy();

        expect(
            screen.getByText('Descubre toda nuestra colección')
        ).toBeTruthy();
    });


    it('muestra solamente los primeros cinco perfumes destacados', () => {
        prepararProductos();

        renderInicio();

        const seccion = screen.getByText(
            'Perfumes destacados'
        ).closest('section');

        const tarjetas = seccion.querySelectorAll(
            '.tarjeta-producto'
        );

        expect(tarjetas.length).toBe(5);

        expect(
            within(seccion).getByText('Perfume Uno')
        ).toBeTruthy();

        expect(
            within(seccion).getByText('Perfume Cinco')
        ).toBeTruthy();

        expect(
            within(seccion).queryByText('Perfume Seis')
        ).toBeNull();
    });


    it('permite navegar al detalle de un perfume destacado', () => {
        prepararProductos();

        renderInicio();

        const tarjeta = screen.getByText(
            'Perfume Uno'
        ).closest('article');

        const botonDetalle = within(tarjeta).getByRole(
            'button',
            { name: /detalle/i }
        );

        fireEvent.click(botonDetalle);

        expect(
            screen.getByText('Detalle de producto de prueba')
        ).toBeTruthy();

        expect(
            screen.queryByText('Encuentra tu próxima fragancia')
        ).toBeNull();
    });

});
