
import { render, screen, fireEvent, within } from '@testing-library/react';
import ListaCarrito from '../../../components/organisms/ListaCarrito';

describe('ListaCarrito Component', () => {

    const productosEjemplo = [
        {
            id: 1,
            nombre: 'Polo Blue',
            imagen: '/imagenes/polo-blue.webp',
            precio: 64,
            cantidad: 2
        },
        {
            id: 2,
            nombre: 'Versace Eros',
            imagen: '/imagenes/versace-eros.webp',
            precio: 50,
            cantidad: 3
        }
    ];


    it('muestra un mensaje cuando el carrito está vacío', () => {
        render(<ListaCarrito productos={[]} />);

        const titulo = screen.getByText('Tu carrito está vacío');

        const mensaje = screen.getByText(
            'Agrega tus perfumes favoritos para comenzar tu compra.'
        );

        expect(titulo).toBeTruthy();
        expect(mensaje).toBeTruthy();
    });


    it('renderiza correctamente los productos del carrito', () => {
        render(
            <ListaCarrito productos={productosEjemplo} />
        );

        const producto1 = screen.getByText('Polo Blue');
        const producto2 = screen.getByText('Versace Eros');

        const subtotal1 = screen.getByText('128 Esmeraldas');
        const subtotal2 = screen.getByText('150 Esmeraldas');

        expect(producto1).toBeTruthy();
        expect(producto2).toBeTruthy();
        expect(subtotal1).toBeTruthy();
        expect(subtotal2).toBeTruthy();
    });


    it('permite cambiar cantidades y eliminar productos', () => {
        const mockCambiarCantidad = jasmine.createSpy('onCambiarCantidad');
        const mockEliminar = jasmine.createSpy('onEliminar');

        render(
            <ListaCarrito
                productos={productosEjemplo}
                onCambiarCantidad={mockCambiarCantidad}
                onEliminar={mockEliminar}
            />
        );

        const articulo = screen.getByText('Polo Blue').closest('article');

        const botonesCantidad = articulo.querySelectorAll(
            '.item-carrito-cantidad button'
        );

        fireEvent.click(botonesCantidad[1]);

        expect(mockCambiarCantidad).toHaveBeenCalledWith(1, 3);

        const botonEliminar = within(articulo).getByRole('button', {
            name: 'Eliminar'
        });

        fireEvent.click(botonEliminar);

        expect(mockEliminar).toHaveBeenCalledTimes(1);
        expect(mockEliminar).toHaveBeenCalledWith(1);
    });

});
