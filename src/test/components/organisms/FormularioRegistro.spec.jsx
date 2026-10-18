
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioRegistro from '../../../components/organisms/FormularioRegistro';

describe('FormularioRegistro Component', () => {

    it('renderiza correctamente los campos del formulario', () => {
        render(<FormularioRegistro />);

        expect(screen.getByLabelText('RUT')).toBeTruthy();
        expect(screen.getByLabelText('Nombre')).toBeTruthy();
        expect(screen.getByLabelText('Apellidos')).toBeTruthy();
        expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();
        expect(screen.getByLabelText('Contraseña')).toBeTruthy();
        expect(screen.getByLabelText('Confirmar contraseña')).toBeTruthy();
        expect(screen.getByLabelText('Dirección')).toBeTruthy();

        const boton = screen.getByRole('button', {
            name: 'Crear cuenta'
        });

        expect(boton).toBeTruthy();
    });


    it('actualiza los datos cuando el usuario escribe', () => {
        render(<FormularioRegistro />);

        const nombre = screen.getByLabelText('Nombre');
        const apellidos = screen.getByLabelText('Apellidos');
        const correo = screen.getByLabelText('Correo electrónico');

        fireEvent.change(nombre, {
            target: { value: 'Juan' }
        });

        fireEvent.change(apellidos, {
            target: { value: 'Pérez' }
        });

        fireEvent.change(correo, {
            target: { value: 'juan@bergen.com' }
        });

        expect(nombre.value).toBe('Juan');
        expect(apellidos.value).toBe('Pérez');
        expect(correo.value).toBe('juan@bergen.com');
    });


    it('muestra un error cuando el RUT no es válido', () => {
        const mockRegistrar = jasmine.createSpy('onRegistrar');

        render(
            <FormularioRegistro onRegistrar={mockRegistrar} />
        );

        const rut = screen.getByLabelText('RUT');

        fireEvent.change(rut, {
            target: { value: 'abc' }
        });

        const boton = screen.getByRole('button', {
            name: 'Crear cuenta'
        });

        fireEvent.submit(boton.closest('form'));

        const mensaje = screen.getByText(
            'El RUT no es válido.'
        );

        expect(mensaje).toBeTruthy();
        expect(mockRegistrar).not.toHaveBeenCalled();
    });

});
