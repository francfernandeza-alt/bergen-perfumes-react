
import { render, screen, fireEvent } from '@testing-library/react';
import ResumenCompra from '../../../components/organisms/ResumenCompra';

describe('ResumenCompra Component', () => {

    const productosEjemplo = [
        {
            id: 1,
            nombre: 'Polo Blue',
            precio: 64,
            cantidad: 2
        },
        {
            id: 2,
            nombre: 'Versace Eros',
            precio: 50,
            cantidad: 3
        }
    ];

    it('muestra un mensaje cuando el carrito está vacío', () => {
        render(<ResumenCompra productos={[]} />);

        const mensaje = screen.getByText(
            'Tu carrito está vacío.'
        );

        expect(mensaje).toBeTruthy();

        expect(screen.queryByRole('button', {
            name: 'Proceder al pago'
        })).toBeNull();
    });

    it('calcula correctamente los productos y el total de compra', () => {
        render(
            <ResumenCompra productos={productosEjemplo} />
        );

        const producto1 = screen.getByText('Polo Blue');
        const producto2 = screen.getByText('Versace Eros');

        const totalProductos = screen.getByText('5');
        const totalCompra = screen.getByText('$278');

        expect(producto1).toBeTruthy();
        expect(producto2).toBeTruthy();
        expect(totalProductos).toBeTruthy();
        expect(totalCompra).toBeTruthy();
    });

    it('permite proceder al pago y ocultar el botón', () => {
        const mockPagar = jasmine.createSpy('onPagar');

        const { rerender } = render(
            <ResumenCompra
                productos={productosEjemplo}
                onPagar={mockPagar}
            />
        );

        const boton = screen.getByRole('button', {
            name: 'Proceder al pago'
        });

        fireEvent.click(boton);

        expect(mockPagar).toHaveBeenCalledTimes(1);

        rerender(
            <ResumenCompra
                productos={productosEjemplo}
                onPagar={mockPagar}
                mostrarBoton={false}
            />
        );

        expect(screen.queryByRole('button', {
            name: 'Proceder al pago'
        })).toBeNull();
    });

});
