import { render, screen, fireEvent } from '@testing-library/react';
import Boton from '../../../components/atoms/Boton';

describe('Boton Component', () => {

    it('renderiza el texto del botón correctamente', () => {
        render(
            <Boton texto="Comprar" />
        );

        const boton = screen.getByText('Comprar');

        expect(boton).toBeTruthy();
    });


    it('ejecuta onClick al hacer click en el botón', () => {
        const mockClick = jasmine.createSpy('onClick');

        render(
            <Boton
                texto="Comprar"
                onClick={mockClick}
            />
        );

        const boton = screen.getByText('Comprar');

        fireEvent.click(boton);

        expect(mockClick).toHaveBeenCalledTimes(1);
    });


    it('deshabilita el botón cuando deshabilitado es true', () => {
        render(
            <Boton
                texto="Comprar"
                deshabilitado={true}
            />
        );

        const boton = screen.getByText('Comprar');

        expect(boton.disabled).toBeTrue();
    });

});