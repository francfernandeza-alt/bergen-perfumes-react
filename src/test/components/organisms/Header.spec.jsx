
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../../components/organisms/Header';

describe('Header Component', () => {

    it('renderiza correctamente el logo y los enlaces de navegación', () => {
        render(<Header />);

        const logo = screen.getByAltText('Bergen Perfumes');
        const inicio = screen.getByText('Inicio');
        const catalogo = screen.getByText('Catálogo');

        expect(logo).toBeTruthy();
        expect(inicio.getAttribute('href')).toBe('/');
        expect(catalogo.getAttribute('href')).toBe('/catalogo');
    });


    it('abre y cierra el menú de navegación', () => {
        const { container } = render(<Header />);

        const botonMenu = container.querySelector('.header-boton-menu');
        const navegacion = container.querySelector('.header-navegacion');
        const acciones = container.querySelector('.header-acciones');

        expect(navegacion.classList.contains('header-navegacion-abierta')).toBe(false);

        fireEvent.click(botonMenu);

        expect(navegacion.classList.contains('header-navegacion-abierta')).toBe(true);
        expect(acciones.classList.contains('header-acciones-abiertas')).toBe(true);

        fireEvent.click(botonMenu);

        expect(navegacion.classList.contains('header-navegacion-abierta')).toBe(false);
        expect(acciones.classList.contains('header-acciones-abiertas')).toBe(false);
    });


    it('ejecuta onBuscar al buscar un producto', () => {
        const mockBuscar = jasmine.createSpy('onBuscar');

        const { container } = render(
            <Header onBuscar={mockBuscar} />
        );

        const buscador = container.querySelector('.header-buscador input');

        fireEvent.change(buscador, {
            target: { value: 'Polo Blue' }
        });

        const formulario = buscador.closest('form');

        fireEvent.submit(formulario);

        expect(mockBuscar).toHaveBeenCalledTimes(1);
        expect(mockBuscar).toHaveBeenCalledWith('Polo Blue');
    });

});
