
import { render, screen, fireEvent, within } from '@testing-library/react';
import ItemCarrito from '../../../components/organisms/ItemCarrito';

describe('ItemCarrito Component', () => {

    const productoEjemplo = {
        id: 1,
        nombre: 'Polo Blue',
        imagen: '/imagenes/263-Polo-Blue.webp',
        precio: 64,
        cantidad: 2
    };


    it('renderiza el producto y calcula correctamente el subtotal', () => {
        render(<ItemCarrito producto={productoEjemplo} />);

        const nombre = screen.getByText('Polo Blue');
        const imagen = screen.getByAltText('Polo Blue');
        const precio = screen.getByText('64 Esmeraldas');
        const subtotal = screen.getByText('128 Esmeraldas');

        expect(nombre).toBeTruthy();
        expect(imagen.getAttribute('src')).toBe('/imagenes/263-Polo-Blue.webp');
        expect(precio).toBeTruthy();
        expect(subtotal).toBeTruthy();
    });


    it('permite aumentar y disminuir la cantidad del producto', () => {
        const mockCambiarCantidad = jasmine.createSpy('onCambiarCantidad');

        const { container } = render(
            <ItemCarrito
                producto={productoEjemplo}
                onCambiarCantidad={mockCambiarCantidad}
            />
        );

        const control = container.querySelector('.item-carrito-cantidad');
        const botones = within(control).getAllByRole('button');

        fireEvent.click(botones[1]);

        expect(mockCambiarCantidad).toHaveBeenCalledWith(1, 3);

        fireEvent.click(botones[0]);

        expect(mockCambiarCantidad).toHaveBeenCalledWith(1, 1);

        expect(mockCambiarCantidad).toHaveBeenCalledTimes(2);
    });


    it('ejecuta onEliminar con el ID del producto', () => {
        const mockEliminar = jasmine.createSpy('onEliminar');

        render(
            <ItemCarrito
                producto={productoEjemplo}
                onEliminar={mockEliminar}
            />
        );

        const boton = screen.getByRole('button', {
            name: 'Eliminar'
        });

        fireEvent.click(boton);

        expect(mockEliminar).toHaveBeenCalledTimes(1);
        expect(mockEliminar).toHaveBeenCalledWith(1);
    });

});