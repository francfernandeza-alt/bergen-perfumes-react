import { render, screen, fireEvent } from '@testing-library/react';
import AccionesProducto from '../../../components/molecules/AccionesProducto';

describe('AccionesProducto Component', () => {

    it('renderiza los dos botones correctamente', () => {
        render(
            <AccionesProducto
                onDetalle={() => {}}
                onAgregar={() => {}}
            />
        );

        const botonDetalle = screen.getByText('Detalle producto');
        const botonAgregar = screen.getByText('Agregar al carro');

        expect(botonDetalle).toBeTruthy();
        expect(botonAgregar).toBeTruthy();
    });


    it('ejecuta onDetalle al hacer click en Detalle producto', () => {
        const mockDetalle = jasmine.createSpy('onDetalle');

        render(
            <AccionesProducto
                onDetalle={mockDetalle}
                onAgregar={() => {}}
            />
        );

        const botonDetalle = screen.getByText('Detalle producto');

        fireEvent.click(botonDetalle);

        expect(mockDetalle).toHaveBeenCalledTimes(1);
    });


    it('ejecuta onAgregar al hacer click en Agregar al carro', () => {
        const mockAgregar = jasmine.createSpy('onAgregar');

        render(
            <AccionesProducto
                onDetalle={() => {}}
                onAgregar={mockAgregar}
            />
        );

        const botonAgregar = screen.getByText('Agregar al carro');

        fireEvent.click(botonAgregar);

        expect(mockAgregar).toHaveBeenCalledTimes(1);
    });

});