
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import FormularioProductoAdmin from '../../../pages/admin/FormularioProductoAdmin';

describe('FormularioProductoAdmin Component', () => {

    const renderFormulario = (ruta = '/admin/productos/nuevo') => {
        return render(
            <MemoryRouter initialEntries={[ruta]}>
                <Routes>
                    <Route
                        path="/admin/productos/nuevo"
                        element={<FormularioProductoAdmin />}
                    />

                    <Route
                        path="/admin/productos/editar/:id"
                        element={<FormularioProductoAdmin />}
                    />

                    <Route
                        path="/admin/productos"
                        element={<h1>Listado de productos</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    };

    const seleccionarPrimeraCategoriaValida = () => {
        const categoria = screen.getByLabelText(/Categoría/i);
        const opciones = Array.from(categoria.options);
        const opcionValida = opciones.find(
            (opcion) => opcion.value !== '' && !opcion.disabled
        );

        expect(opcionValida).toBeDefined();

        fireEvent.change(categoria, {
            target: { value: opcionValida.value }
        });
    };

    it('renderiza correctamente el formulario para agregar productos', () => {
        renderFormulario();

        const titulo = screen.getByText('Agregar nuevo perfume');
        const nombre = screen.getByLabelText('Nombre del perfume');
        const marca = screen.getByLabelText('Marca del perfume');
        const categoria = screen.getByLabelText(/Categoría/i);
        const precio = screen.getByLabelText('Precio');
        const stock = screen.getByLabelText('Stock disponible');

        expect(titulo).toBeTruthy();
        expect(nombre).toBeTruthy();
        expect(marca).toBeTruthy();
        expect(categoria).toBeTruthy();
        expect(precio).toBeTruthy();
        expect(stock).toBeTruthy();
    });

    it('permite guardar un producto y regresar al listado', () => {
        renderFormulario();

        fireEvent.change(screen.getByLabelText('Nombre del perfume'), {
            target: { value: 'Polo Blue' }
        });

        fireEvent.change(screen.getByLabelText('Marca del perfume'), {
            target: { value: 'Ralph Lauren' }
        });

        seleccionarPrimeraCategoriaValida();

        fireEvent.change(screen.getByLabelText('Descripción'), {
            target: { value: 'Perfume para hombre' }
        });

        fireEvent.change(screen.getByLabelText('Precio'), {
            target: { value: '64' }
        });

        fireEvent.change(screen.getByLabelText('Ruta de imagen'), {
            target: { value: '/imagenes/polo-blue.webp' }
        });

        fireEvent.change(screen.getByLabelText('Stock disponible'), {
            target: { value: '10' }
        });

        const boton = screen.getByRole('button', {
            name: 'Agregar producto'
        });

        fireEvent.submit(boton.closest('form'));

        const listado = screen.getByText('Listado de productos');

        expect(listado).toBeTruthy();
        expect(screen.queryByText('Agregar nuevo perfume')).toBeNull();
    });

    it('muestra un mensaje cuando el producto no existe y permite volver', () => {
        renderFormulario('/admin/productos/editar/producto-inexistente-999999');

        const titulo = screen.getByText('Producto no encontrado');

        const descripcion = screen.getByText(
            'El producto que intentas editar no existe.'
        );

        expect(titulo).toBeTruthy();
        expect(descripcion).toBeTruthy();

        const boton = screen.getByRole('button', {
            name: 'Volver a productos'
        });

        fireEvent.click(boton);

        expect(
            screen.getByText('Listado de productos')
        ).toBeTruthy();
    });

});
