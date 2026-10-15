import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input Component', () => {

    it('renderiza correctamente sus atributos', () => {
        render(
            <Input
                tipo="email"
                nombre="correo"
                id="correo"
                placeholder="Ingrese su correo"
                valor="correo@bergen.com"
                onChange={() => {}}
            />
        );

        const input = screen.getByPlaceholderText('Ingrese su correo');

        expect(input.getAttribute('type')).toBe('email');
        expect(input.getAttribute('name')).toBe('correo');
        expect(input.getAttribute('id')).toBe('correo');
        expect(input.value).toBe('correo@bergen.com');
    });


    it('ejecuta onChange cuando cambia el valor', () => {
        const mockChange = jasmine.createSpy('onChange');

        render(
            <Input
                placeholder="Nombre"
                valor=""
                onChange={mockChange}
            />
        );

        const input = screen.getByPlaceholderText('Nombre');

        fireEvent.change(input, {
            target: { value: 'Leonardo' }
        });

        expect(mockChange).toHaveBeenCalled();
    });


    it('aplica requerido y deshabilitado correctamente', () => {
        render(
            <Input
                placeholder="Correo"
                valor=""
                onChange={() => {}}
                requerido={true}
                deshabilitado={true}
            />
        );

        const input = screen.getByPlaceholderText('Correo');

        expect(input.required).toBeTrue();
        expect(input.disabled).toBeTrue();
    });

});