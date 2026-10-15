import { render, screen, fireEvent } from '@testing-library/react';
import CampoFormulario from '../../../components/molecules/CampoFormulario';

describe('CampoFormulario Component', () => {

    it('renderiza la etiqueta y el campo correctamente', () => {
        render(
            <CampoFormulario
                etiqueta="Correo electrónico"
                nombre="correo"
                valor=""
                onChange={() => {}}
            />
        );

        const input = screen.getByLabelText('Correo electrónico');

        expect(input).toBeTruthy();
    });


    it('aplica correctamente las propiedades al input', () => {
        render(
            <CampoFormulario
                etiqueta="Correo electrónico"
                tipo="email"
                nombre="correo"
                placeholder="Ingrese su correo"
                valor="cliente@bergen.com"
                onChange={() => {}}
            />
        );

        const input = screen.getByLabelText('Correo electrónico');

        expect(input.getAttribute('type')).toBe('email');
        expect(input.getAttribute('placeholder')).toBe('Ingrese su correo');
        expect(input.value).toBe('cliente@bergen.com');
    });


    it('ejecuta onChange cuando cambia el campo', () => {
        const mockChange = jasmine.createSpy('onChange');

        render(
            <CampoFormulario
                etiqueta="Nombre"
                nombre="nombre"
                valor=""
                onChange={mockChange}
            />
        );

        const input = screen.getByLabelText('Nombre');

        fireEvent.change(input, {
            target: { value: 'Bergen' }
        });

        expect(mockChange).toHaveBeenCalled();
    });

});