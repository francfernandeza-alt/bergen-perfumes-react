import { render } from '@testing-library/react';
import Icono from '../../../components/atoms/Icono';

describe('Icono Component', () => {

    it('renderiza un elemento i correctamente', () => {
        const { container } = render(
            <Icono nombre="cart" />
        );

        const icono = container.querySelector('i');

        expect(icono).toBeTruthy();
    });


    it('aplica correctamente la clase del icono', () => {
        const { container } = render(
            <Icono nombre="cart" />
        );

        const icono = container.querySelector('i');

        expect(icono).toHaveClass('bi');
        expect(icono).toHaveClass('bi-cart');
    });


    it('aplica la clase personalizada', () => {
        const { container } = render(
            <Icono
                nombre="person"
                className="icono-grande"
            />
        );

        const icono = container.querySelector('i');

        expect(icono).toHaveClass('icono-grande');
    });

});