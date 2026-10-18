
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Catalogo from '../../../pages/publicas/Catalogo';

describe('Catalogo Component', () => {

    const productosEjemplo = [
        {
            id: 1,
            nombre: 'Polo Blue',
            descripcion: 'Perfume para hombre',
            imagen: '/imagenes/polo-blue.webp',
            precio: 64,
            precioAnterior: 80,
            stock: 10
        },
        {
            id: 2,
            nombre: 'Versace Eros',
            descripcion: 'Perfume masculino',
            imagen: '/imagenes/versace-eros.webp',
            precio: 50,
            precioAnterior: 70,
            stock: 5
        }
    ];

    const renderCatalogo = () => {
        spyOn(Storage.prototype, 'getItem').and.returnValue(
            JSON.stringify(productosEjemplo)
        );

        return render(
            <MemoryRouter initialEntries={['/catalogo']}>
                <Routes>
                    <Route
                        path="/catalogo"
                        element={<Catalogo />}
                    />

                    <Route
                        path="/producto/:id"
                        element={<h1>Detalle de producto de prueba</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    };


    it('renderiza correctamente los productos del catálogo', () => {
        renderCatalogo();

        const titulo = screen.getByText('Nuestro catálogo');
        const producto1 = screen.getByText('Polo Blue');
        const producto2 = screen.getByText('Versace Eros');
        const contador = screen.getByText('2 productos encontrados');

        expect(titulo).toBeTruthy();
        expect(producto1).toBeTruthy();
        expect(producto2).toBeTruthy();
        expect(contador).toBeTruthy();
    });


    it('filtra correctamente los productos mediante el buscador', () => {
        renderCatalogo();

        const buscador = screen.getByPlaceholderText(
            'Buscar perfume...'
        );

        fireEvent.change(buscador, {
            target: { value: 'Versace' }
        });

        fireEvent.submit(buscador.closest('form'));

        expect(screen.getByText('Versace Eros')).toBeTruthy();

        expect(screen.queryByText('Polo Blue')).toBeNull();

        expect(
            screen.getByText('1 productos encontrados')
        ).toBeTruthy();
    });


    it('permite navegar al detalle de un producto', () => {
        renderCatalogo();

        const tarjeta = screen.getByText('Polo Blue').closest('article');

        const botonDetalle = within(tarjeta).getByRole(
            'button',
            { name: /detalle/i }
        );

        fireEvent.click(botonDetalle);

        const paginaDetalle = screen.getByText(
            'Detalle de producto de prueba'
        );

        expect(paginaDetalle).toBeTruthy();

        expect(
            screen.queryByText('Nuestro catálogo')
        ).toBeNull();
    });

});
