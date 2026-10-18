
import { render, screen, fireEvent, within } from '@testing-library/react';
import TablaProductosAdmin from '../../../components/organisms/TablaProductosAdmin';

describe('TablaProductosAdmin Component', () => {

    const productosEjemplo = [
        {
            id: 1,
            nombre: 'Polo Blue',
            imagen: '/imagenes/polo-blue.webp',
            precio: 64,
            stock: 10
        },
        {
            id: 2,
            nombre: 'Versace Eros',
            imagen: '/imagenes/versace-eros.webp',
            precio: 50,
            stock: 0
        }
    ];


    it('muestra un mensaje cuando no hay productos registrados', () => {
        render(<TablaProductosAdmin productos={[]} />);

        const mensaje = screen.getByText(
            'No hay productos registrados.'
        );

        const total = screen.getByText('Total de productos: 0');

        expect(mensaje).toBeTruthy();
        expect(total).toBeTruthy();
    });


    it('muestra correctamente los productos y su stock', () => {
        render(
            <TablaProductosAdmin productos={productosEjemplo} />
        );

        const producto1 = screen.getByText('Polo Blue');
        const producto2 = screen.getByText('Versace Eros');

        const stockDisponible = screen.getByText('10 disponibles');
        const sinStock = screen.getByText('Sin stock');

        const total = screen.getByText('Total de productos: 2');

        expect(producto1).toBeTruthy();
        expect(producto2).toBeTruthy();
        expect(stockDisponible).toBeTruthy();
        expect(sinStock).toBeTruthy();
        expect(total).toBeTruthy();
    });


    it('permite editar y confirmar la eliminación de un producto', () => {
        const mockEditar = jasmine.createSpy('onEditar');
        const mockEliminar = jasmine.createSpy('onEliminar');

        const mockConfirmar = spyOn(window, 'confirm')
            .and.returnValue(false);

        render(
            <TablaProductosAdmin
                productos={productosEjemplo}
                onEditar={mockEditar}
                onEliminar={mockEliminar}
            />
        );

        const fila = screen.getByText('Polo Blue').closest('tr');

        const botonEditar = within(fila).getByRole('button', {
            name: 'Editar'
        });

        const botonEliminar = within(fila).getByRole('button', {
            name: 'Eliminar'
        });

        fireEvent.click(botonEditar);

        expect(mockEditar).toHaveBeenCalledWith(productosEjemplo[0]);

        fireEvent.click(botonEliminar);

        expect(mockEliminar).not.toHaveBeenCalled();

        mockConfirmar.and.returnValue(true);

        fireEvent.click(botonEliminar);

        expect(mockConfirmar).toHaveBeenCalledWith(
            '¿Estás seguro de eliminar "Polo Blue"?'
        );

        expect(mockEliminar).toHaveBeenCalledTimes(1);
        expect(mockEliminar).toHaveBeenCalledWith(1);
    });

});
