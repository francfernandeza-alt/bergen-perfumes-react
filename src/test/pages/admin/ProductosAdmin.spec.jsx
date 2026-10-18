
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import ProductosAdmin from '../../../pages/admin/ProductosAdmin';
import { obtenerProductos } from '../../../scripts/storage/storage';

describe('ProductosAdmin Component', () => {

    const renderProductosAdmin = () => {
        return render(
            <MemoryRouter initialEntries={['/admin/productos']}>
                <Routes>
                    <Route
                        path="/admin/productos"
                        element={<ProductosAdmin />}
                    />

                    <Route
                        path="/admin/productos/nuevo"
                        element={<h1>Formulario nuevo producto</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    };


    it('renderiza correctamente la página de administración', () => {
        renderProductosAdmin();

        const titulo = screen.getByText('Gestión de productos');

        const descripcion = screen.getByText(
            'Administra los perfumes disponibles en Bergen Perfumes.'
        );

        const boton = screen.getByRole('button', {
            name: 'Agregar producto'
        });

        expect(titulo).toBeTruthy();
        expect(descripcion).toBeTruthy();
        expect(boton).toBeTruthy();
    });


    it('permite navegar al formulario para agregar productos', () => {
        renderProductosAdmin();

        const boton = screen.getByRole('button', {
            name: 'Agregar producto'
        });

        fireEvent.click(boton);

        const formulario = screen.getByText(
            'Formulario nuevo producto'
        );

        expect(formulario).toBeTruthy();

        expect(
            screen.queryByText('Gestión de productos')
        ).toBeNull();
    });


    it('muestra los productos obtenidos del almacenamiento', () => {
        const productosGuardados = obtenerProductos();

        renderProductosAdmin();

        const total = screen.getByText(
            'Total de productos: ' + productosGuardados.length
        );

        expect(total).toBeTruthy();

        if (productosGuardados.length === 0) {
            const mensaje = screen.getByText(
                'No hay productos registrados.'
            );

            expect(mensaje).toBeTruthy();
        } else {
            const productosEncontrados = screen.getAllByText(
                productosGuardados[0].nombre
            );

            expect(productosEncontrados.length).toBeGreaterThan(0);
        }
    });
});
