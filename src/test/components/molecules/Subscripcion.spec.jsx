import { render, screen, fireEvent } from '@testing-library/react';
import Subscripcion from '../../../components/molecules/Subscripcion';

describe('Subscripcion Component', () => {

    it('renderiza el campo de correo y el botón', () => {
        render(
            <Subscripcion onSuscribir={() => {}} />
        );

        const input = screen.getByPlaceholderText(
            'Ingresa tu correo electrónico'
        );

        const boton = screen.getByRole('button', {
            name: 'Subscribirme'
        });

        expect(input).toBeTruthy();
        expect(boton).toBeTruthy();
    });


    it('ejecuta onSuscribir y limpia el correo al enviar', () => {
        const mockSuscribir = jasmine.createSpy('onSuscribir');

        render(
            <Subscripcion onSuscribir={mockSuscribir} />
        );

        const input = screen.getByPlaceholderText(
            'Ingresa tu correo electrónico'
        );

        fireEvent.change(input, {
            target: { value: 'cliente@bergen.com' }
        });

        const formulario = input.closest('form');

        fireEvent.submit(formulario);

        expect(mockSuscribir).toHaveBeenCalledWith(
            'cliente@bergen.com'
        );

        expect(input.value).toBe('');
    });


    it('no ejecuta onSuscribir si el correo está vacío', () => {
        const mockSuscribir = jasmine.createSpy('onSuscribir');

        render(
            <Subscripcion onSuscribir={mockSuscribir} />
        );

        const input = screen.getByPlaceholderText(
            'Ingresa tu correo electrónico'
        );

        fireEvent.change(input, {
            target: { value: '   ' }
        });

        const formulario = input.closest('form');

        fireEvent.submit(formulario);

        expect(mockSuscribir).not.toHaveBeenCalled();
    });

});