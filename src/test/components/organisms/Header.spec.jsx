
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../../../components/organisms/Header';

function MostrarUbicacion() {
    const location = useLocation();

    return (
        <div data-testid="ubicacion">
            {location.pathname + location.search}
        </div>
    );
}

describe('Header Component', () => {

    const renderHeader = () => {
        return render(
            <MemoryRouter initialEntries={['/']}>
                <Header />

                <MostrarUbicacion />
            </MemoryRouter>
        );
    };

    it('renderiza correctamente el logo y los enlaces de navegación', () => {
        renderHeader();

        const logo = screen.getByAltText('Bergen Perfumes');
        const inicio = screen.getByText('Inicio');
        const catalogo = screen.getByText('Catálogo');

        expect(logo).toBeTruthy();
        expect(inicio.getAttribute('href')).toBe('/');
        expect(catalogo.getAttribute('href')).toBe('/catalogo');
    });

    it('abre y cierra el menú de navegación', () => {
        const { container } = renderHeader();

        const botonMenu = container.querySelector('.header-boton-menu');
        const navegacion = container.querySelector('.header-navegacion');
        const acciones = container.querySelector('.header-acciones');

        expect(
            navegacion.classList.contains('header-navegacion-abierta')
        ).toBe(false);

        fireEvent.click(botonMenu);

        expect(
            navegacion.classList.contains('header-navegacion-abierta')
        ).toBe(true);

        expect(
            acciones.classList.contains('header-acciones-abiertas')
        ).toBe(true);

        fireEvent.click(botonMenu);

        expect(
            navegacion.classList.contains('header-navegacion-abierta')
        ).toBe(false);

        expect(
            acciones.classList.contains('header-acciones-abiertas')
        ).toBe(false);
    });

    it('navega al catálogo al buscar un producto', () => {
        const { container } = renderHeader();

        const buscador = container.querySelector('.header-buscador input');

        fireEvent.change(buscador, {
            target: { value: 'Polo Blue' }
        });

        const formulario = buscador.closest('form');

        fireEvent.submit(formulario);

        expect(
            screen.getByTestId('ubicacion').textContent
        ).toBe('/catalogo?buscar=Polo%20Blue');
    });

});
