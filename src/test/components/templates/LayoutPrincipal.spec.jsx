

import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import LayoutPrincipal from '../../../components/templates/LayoutPrincipal';

describe('LayoutPrincipal Component', () => {

    const renderLayout = () => {
        return render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<LayoutPrincipal />}>

                        <Route
                            index
                            element={
                                <div>
                                    <h1>Página de inicio</h1>
                                    <Link to="/catalogo">Ver catálogo</Link>
                                </div>
                            }
                        />

                        <Route
                            path="catalogo"
                            element={<h1>Página de catálogo</h1>}
                        />

                    </Route>
                </Routes>
            </MemoryRouter>
        );
    };


    it('renderiza correctamente el Header y Footer', () => {
        const { container } = renderLayout();

        const header = container.querySelector('.header');
        const footer = container.querySelector('.footer-bergen');

        expect(header).toBeTruthy();
        expect(footer).toBeTruthy();

        expect(
            within(header).getByAltText('Bergen Perfumes')
        ).toBeTruthy();

        expect(
            within(footer).getByText('SOBRE NOSOTROS')
        ).toBeTruthy();
    });


    it('muestra correctamente el contenido de la página', () => {
        const { container } = renderLayout();

        const contenido = container.querySelector(
            '.layout-principal-contenido'
        );

        const paginaInicio = within(contenido).getByText(
            'Página de inicio'
        );

        expect(contenido).toBeTruthy();
        expect(paginaInicio).toBeTruthy();
    });


    it('actualiza el contenido al navegar y mantiene el Header y Footer', () => {
        const { container } = renderLayout();

        const enlaceCatalogo = screen.getByRole('link', {
            name: 'Ver catálogo'
        });

        fireEvent.click(enlaceCatalogo);

        expect(
            screen.getByText('Página de catálogo')
        ).toBeTruthy();

        expect(
            screen.queryByText('Página de inicio')
        ).toBeNull();

        expect(
            container.querySelector('.header')
        ).toBeTruthy();

        expect(
            container.querySelector('.footer-bergen')
        ).toBeTruthy();
    });

});

