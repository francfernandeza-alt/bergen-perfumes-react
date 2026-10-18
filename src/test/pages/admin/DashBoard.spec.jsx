
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../../../pages/admin/Dashboard';

describe('Dashboard Component', () => {

    const renderDashboard = () => {
        return render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route
                        path="/admin"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/admin/productos"
                        element={<h1>Listado de productos</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    };


    it('renderiza correctamente el panel de administración', () => {
        renderDashboard();

        const titulo = screen.getByText('Panel de administración');

        const descripcion = screen.getByText(
            'Bienvenido al panel administrativo de Bergen Perfumes.'
        );

        const gestion = screen.getByText('Gestión de productos');

        expect(titulo).toBeTruthy();
        expect(descripcion).toBeTruthy();
        expect(gestion).toBeTruthy();
    });


    it('muestra el enlace para administrar productos', () => {
        renderDashboard();

        const enlace = screen.getByRole('link', {
            name: 'Administrar productos'
        });

        expect(enlace).toBeTruthy();
        expect(enlace.getAttribute('href')).toBe('/admin/productos');
    });


    it('permite navegar a la administración de productos', () => {
        renderDashboard();

        const enlace = screen.getByRole('link', {
            name: 'Administrar productos'
        });

        fireEvent.click(enlace);

        const paginaProductos = screen.getByText(
            'Listado de productos'
        );

        expect(paginaProductos).toBeTruthy();

        expect(
            screen.queryByText('Panel de administración')
        ).toBeNull();
    });

});
