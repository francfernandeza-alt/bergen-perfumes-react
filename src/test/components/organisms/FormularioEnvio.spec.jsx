
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioEnvio from '../../../components/organisms/FormularioEnvio';

describe('FormularioEnvio Component', () => {

    it('renderiza correctamente los campos del formulario', () => {
        render(<FormularioEnvio />);

        const nombre = screen.getByLabelText('Nombre completo');
        const correo = screen.getByLabelText('Correo electrónico');
        const telefono = screen.getByLabelText('Teléfono');
        const region = screen.getByLabelText('Región');
        const comuna = screen.getByLabelText('Comuna');
        const direccion = screen.getByLabelText('Dirección');

        const boton = screen.getByRole('button', {
            name: 'Confirmar compra'
        });

        expect(nombre).toBeTruthy();
        expect(correo).toBeTruthy();
        expect(telefono).toBeTruthy();
        expect(region).toBeTruthy();
        expect(comuna).toBeTruthy();
        expect(direccion).toBeTruthy();
        expect(boton).toBeTruthy();
    });


    it('actualiza los datos cuando el usuario escribe', () => {
        render(<FormularioEnvio />);

        const nombre = screen.getByLabelText('Nombre completo');
        const correo = screen.getByLabelText('Correo electrónico');

        fireEvent.change(nombre, {
            target: { value: 'Juan Pérez' }
        });

        fireEvent.change(correo, {
            target: { value: 'juan@bergen.cl' }
        });

        expect(nombre.value).toBe('Juan Pérez');
        expect(correo.value).toBe('juan@bergen.cl');
    });


    it('ejecuta onConfirmar con los datos del formulario', () => {
        const mockConfirmar = jasmine.createSpy('onConfirmar');

        render(
            <FormularioEnvio onConfirmar={mockConfirmar} />
        );

        fireEvent.change(screen.getByLabelText('Nombre completo'), {
            target: { value: 'Juan Pérez' }
        });

        fireEvent.change(screen.getByLabelText('Correo electrónico'), {
            target: { value: 'juan@bergen.cl' }
        });

        fireEvent.change(screen.getByLabelText('Teléfono'), {
            target: { value: '912345678' }
        });

        fireEvent.change(screen.getByLabelText('Región'), {
            target: { value: 'Metropolitana' }
        });

        fireEvent.change(screen.getByLabelText('Comuna'), {
            target: { value: 'Maipú' }
        });

        fireEvent.change(screen.getByLabelText('Dirección'), {
            target: { value: 'Av. Principal 123' }
        });

        const boton = screen.getByRole('button', {
            name: 'Confirmar compra'
        });

        const formulario = boton.closest('form');

        fireEvent.submit(formulario);

        expect(mockConfirmar).toHaveBeenCalledTimes(1);

        expect(mockConfirmar).toHaveBeenCalledWith({
            nombre: 'Juan Pérez',
            correo: 'juan@bergen.cl',
            telefono: '912345678',
            region: 'Metropolitana',
            comuna: 'Maipú',
            direccion: 'Av. Principal 123',
            indicaciones: '',
            metodoPago: 'tarjeta'
        });
    });

});
