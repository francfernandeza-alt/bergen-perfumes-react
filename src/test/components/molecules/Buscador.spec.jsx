import { render, screen, fireEvent } from '@testing-library/react';
import Buscador from '../../../components/molecules/Buscador';

describe('Buscador Component', () => {

    it('renderiza el campo de búsqueda y el botón', () => {
        render(
            <Buscador onBuscar={() => {}} />
        );

        const input = screen.getByPlaceholderText('Buscar perfume...');
        const boton = screen.getByRole('button', { name: 'Buscar' });

        expect(input).toBeTruthy();
        expect(boton).toBeTruthy();
    });


    it('actualiza el valor cuando el usuario escribe', () => {
        render(
            <Buscador onBuscar={() => {}} />
        );

        const input = screen.getByPlaceholderText('Buscar perfume...');

        fireEvent.change(input, {
            target: { value: 'Versace' }
        });

        expect(input.value).toBe('Versace');
    });


    it('ejecuta onBuscar con el texto sin espacios al enviar', () => {
        const mockBuscar = jasmine.createSpy('onBuscar');

        render(
            <Buscador onBuscar={mockBuscar} />
        );

        const input = screen.getByPlaceholderText('Buscar perfume...');
        const boton = screen.getByRole('button', { name: 'Buscar' });

        fireEvent.change(input, {
            target: { value: '   Dior Sauvage   ' }
        });

        fireEvent.click(boton);

        expect(mockBuscar).toHaveBeenCalledWith('Dior Sauvage');
    });

});