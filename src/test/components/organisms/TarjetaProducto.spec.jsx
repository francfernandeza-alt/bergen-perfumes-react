
import { render, screen, fireEvent } from '@testing-library/react';
import TarjetaProducto from '../../../components/organisms/TarjetaProducto';

describe('TarjetaProducto Component', () => {

    const productoEjemplo = {
        id: 1,
        nombre: 'Polo Blue',
        descripcion: 'Perfume para hombre',
        imagen: '/imagenes/polo-blue.webp',
        precio: 64,
        precioAnterior: 80
    };


    it('renderiza los datos del producto y muestra la oferta', () => {
        render(<TarjetaProducto producto={productoEjemplo} />);

        const nombre = screen.getByText('Polo Blue');
        const descripcion = screen.getByText('Perfume para hombre');
        const imagen = screen.getByAltText('Polo Blue');
        const oferta = screen.getByText('Oferta');

        expect(nombre).toBeTruthy();
        expect(descripcion).toBeTruthy();
        expect(imagen.getAttribute('src')).toBe('/imagenes/polo-blue.webp');
        expect(oferta).toBeTruthy();
    });


    it('no muestra la etiqueta de oferta cuando no corresponde', () => {
        const productoSinOferta = {
            ...productoEjemplo,
            precioAnterior: null
        };

        render(<TarjetaProducto producto={productoSinOferta} />);

        const oferta = screen.queryByText('Oferta');

        expect(oferta).toBeNull();
    });


    it('ejecuta las acciones de detalle y agregar al carrito', () => {
        const mockDetalle = jasmine.createSpy('onDetalle');
        const mockAgregar = jasmine.createSpy('onAgregar');

        render(
            <TarjetaProducto
                producto={productoEjemplo}
                onDetalle={mockDetalle}
                onAgregar={mockAgregar}
            />
        );

        const botonDetalle = screen.getByRole('button', {
            name: /detalle/i
        });

        const botonAgregar = screen.getByRole('button', {
            name: /agregar/i
        });

        fireEvent.click(botonDetalle);
        fireEvent.click(botonAgregar);

        expect(mockDetalle).toHaveBeenCalledTimes(1);
        expect(mockDetalle).toHaveBeenCalledWith(1);

        expect(mockAgregar).toHaveBeenCalledTimes(1);
        expect(mockAgregar).toHaveBeenCalledWith(1);
    });

});
