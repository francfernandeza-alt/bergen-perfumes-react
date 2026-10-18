
import { render, screen, fireEvent, within } from '@testing-library/react';
import ListaProductos from '../../../components/organisms/ListaProductos';

describe('ListaProductos Component', () => {

    const productosEjemplo = [
        {
            id: 1,
            nombre: 'Polo Blue',
            descripcion: 'Perfume para hombre',
            imagen: '/imagenes/polo-blue.webp',
            precio: 64,
            precioAnterior: 80,
            stock: 10
        },
        {
            id: 2,
            nombre: 'Versace Eros',
            descripcion: 'Perfume masculino',
            imagen: '/imagenes/versace-eros.webp',
            precio: 50,
            precioAnterior: 70,
            stock: 5
        }
    ];


    it('muestra un mensaje cuando no hay productos', () => {
        render(<ListaProductos productos={[]} />);

        const mensaje = screen.getByText(
            'No se encontraron productos disponibles.'
        );

        expect(mensaje).toBeTruthy();
    });


    it('renderiza correctamente los productos disponibles', () => {
        const { container } = render(
            <ListaProductos productos={productosEjemplo} />
        );

        const producto1 = screen.getByText('Polo Blue');
        const producto2 = screen.getByText('Versace Eros');

        const tarjetas = container.querySelectorAll(
            '.lista-productos .col-12'
        );

        expect(producto1).toBeTruthy();
        expect(producto2).toBeTruthy();
        expect(tarjetas.length).toBe(2);
    });


    it('permite ver detalles y agregar productos al carrito', () => {
        const mockDetalle = jasmine.createSpy('onDetalle');
        const mockAgregar = jasmine.createSpy('onAgregar');

        const { container } = render(
            <ListaProductos
                productos={productosEjemplo}
                onDetalle={mockDetalle}
                onAgregar={mockAgregar}
            />
        );

        const primeraTarjeta = container.querySelector(
            '.lista-productos .col-12'
        );

        const botonDetalle = within(primeraTarjeta).getByRole(
            'button',
            { name: /detalle/i }
        );

        const botonAgregar = within(primeraTarjeta).getByRole(
            'button',
            { name: /agregar/i }
        );

        fireEvent.click(botonDetalle);
        fireEvent.click(botonAgregar);

        expect(mockDetalle).toHaveBeenCalledTimes(1);
        expect(mockAgregar).toHaveBeenCalledTimes(1);
    });

});
