import { render, screen, fireEvent } from '@testing-library/react';
import ControlCantidad from '../../../components/molecules/ControlCantidad';

describe('ControlCantidad Component', () => {

    it('muestra correctamente la cantidad actual', () => {
        render(
            <ControlCantidad
                cantidad={3}
                onAumentar={() => {}}
                onDisminuir={() => {}}
            />
        );

        const cantidad = screen.getByText('3');

        expect(cantidad).toBeTruthy();
    });


    it('ejecuta onAumentar al hacer click en el botón +', () => {
        const mockAumentar = jasmine.createSpy('onAumentar');

        render(
            <ControlCantidad
                cantidad={2}
                onAumentar={mockAumentar}
                onDisminuir={() => {}}
            />
        );

        const botonAumentar = screen.getByText('+');

        fireEvent.click(botonAumentar);

        expect(mockAumentar).toHaveBeenCalledTimes(1);
    });


    it('deshabilita el botón - cuando la cantidad es 1', () => {
        render(
            <ControlCantidad
                cantidad={1}
                onAumentar={() => {}}
                onDisminuir={() => {}}
            />
        );

        const botonDisminuir = screen.getByText('-');

        expect(botonDisminuir.disabled).toBeTrue();
    });

});