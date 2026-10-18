
import { render, screen } from '@testing-library/react';
import PrecioProducto from '../../../components/molecules/PrecioProducto';

describe('PrecioProducto Component', () => {

    it('muestra correctamente el precio actual', () => {
        render(
            <PrecioProducto
                precio={800}
            />
        );

        const precioActual = screen.getByText('$800');

        expect(precioActual).toBeTruthy();
    });


    it('muestra el precio anterior cuando es mayor al precio actual', () => {
        render(
            <PrecioProducto
                precio={800}
                precioAnterior={1000}
            />
        );

        const precioAnterior = screen.getByText('$1.000');
        const precioActual = screen.getByText('$800');

        expect(precioAnterior).toBeTruthy();
        expect(precioActual).toBeTruthy();
    });


    it('no muestra el precio anterior cuando no es mayor al precio actual', () => {
        render(
            <PrecioProducto
                precio={800}
                precioAnterior={700}
            />
        );

        const precioAnterior = screen.queryByText('$700');

        expect(precioAnterior).toBeNull();

        expect(screen.getByText('$800')).toBeTruthy();
    });

});
