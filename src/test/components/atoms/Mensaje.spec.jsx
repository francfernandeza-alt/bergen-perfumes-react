import { render, screen } from '@testing-library/react';
import Mensaje from '../../../components/atoms/Mensaje';

describe('Mensaje Component', () => {

    it('renderiza el texto correctamente', () => {
        render(
            <Mensaje texto="Producto agregado al carrito" />
        );

        const mensaje = screen.getByText('Producto agregado al carrito');

        expect(mensaje).toBeTruthy();
    });


    it('aplica correctamente la variante', () => {
        render(
            <Mensaje
                texto="Ocurrió un error"
                variante="danger"
            />
        );

        const mensaje = screen.getByText('Ocurrió un error');

        expect(mensaje).toHaveClass('alert-danger');
    });


    it('aplica la clase base y una clase personalizada', () => {
        render(
            <Mensaje
                texto="Compra realizada correctamente"
                className="mensaje-compra"
            />
        );

        const mensaje = screen.getByText('Compra realizada correctamente');

        expect(mensaje).toHaveClass('alert');
        expect(mensaje).toHaveClass('mensaje-compra');
    });

});