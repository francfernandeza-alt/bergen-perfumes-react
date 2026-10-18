
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LayoutAdmin from '../../../components/templates/LayoutAdmin';

describe('LayoutAdmin Component', () => {

    const renderLayout = (ruta = '/admin') => {
        return render(
            <MemoryRouter initialEntries={[ruta]}>
                <Routes>
                    <Route path="/admin" element={<LayoutAdmin />}>
                        <Route
                            index
                            element={<div>Contenido Dashboard</div>}
                        />
                        <Route
                            path="productos"
                            element={<div>Contenido Productos</div>}
                        />
                    </Route>
                </Routes>
            </MemoryRouter>
        );
    };


    it('renderiza correctamente el panel administrativo', () => {
        renderLayout();

        const logo = screen.getByText('BERGEN PERFUMES');
        const titulo = screen.getByText('Panel de administración');
        const dashboard = screen.getByText('Dashboard');
        const productos = screen.getByText('Productos');

        expect(logo).toBeTruthy();
        expect(titulo).toBeTruthy();
        expect(dashboard).toBeTruthy();
        expect(productos).toBeTruthy();
    });


    it('marca como activa la sección de productos', () => {
        const { container } = renderLayout('/admin/productos');

        const enlaceProductos = container.querySelector(
            'a[href="/admin/productos"]'
        );

        const enlaceDashboard = container.querySelector(
            'a[href="/admin"]'
        );

        expect(enlaceProductos.classList.contains('activo')).toBe(true);
        expect(enlaceDashboard.classList.contains('activo')).toBe(false);

        expect(screen.getByText('Contenido Productos')).toBeTruthy();
    });


    it('permite navegar entre Dashboard y Productos', async () => {
        const { container } = renderLayout();

        const enlaceProductos = container.querySelector(
            'a[href="/admin/productos"]'
        );

        expect(screen.getByText('Contenido Dashboard')).toBeTruthy();

        fireEvent.click(enlaceProductos);

        const contenido = await screen.findByText('Contenido Productos');

        expect(contenido).toBeTruthy();

        expect(
            enlaceProductos.classList.contains('activo')
        ).toBe(true);

        expect(screen.queryByText('Contenido Dashboard')).toBeNull();
    });

});
