
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioLogin from '../../../components/organisms/FormularioLogin';

describe('FormularioLogin Component', () => {

    it('renderiza correctamente los campos del formulario', () => {
        render(<FormularioLogin />);

        const correo = screen.getByLabelText('Correo electrónico');
        const contrasena = screen.getByLabelText('Contraseña');
        const boton = screen.getByRole('button', {
            name: 'Ingresar'
        });

        expect(correo).toBeTruthy();
        expect(contrasena).toBeTruthy();
        expect(boton).toBeTruthy();
    });


    it('muestra un error cuando el correo no es válido', () => {
        const mockIngresar = jasmine.createSpy('onIngresar');

        render(
            <FormularioLogin onIngresar={mockIngresar} />
        );

        const correo = screen.getByLabelText('Correo electrónico');
        const contrasena = screen.getByLabelText('Contraseña');

        fireEvent.change(correo, {
            target: { value: 'correo-invalido' }
        });

        fireEvent.change(contrasena, {
            target: { value: 'ClaveSegura123!' }
        });

        const boton = screen.getByRole('button', {
            name: 'Ingresar'
        });

        fireEvent.submit(boton.closest('form'));

        const mensaje = screen.getByText(
            'El correo electrónico no es válido.'
        );

        expect(mensaje).toBeTruthy();
        expect(mockIngresar).not.toHaveBeenCalled();
    });


    it('ejecuta onIngresar con los datos válidos', () => {
        const mockIngresar = jasmine.createSpy('onIngresar');

        render(
            <FormularioLogin onIngresar={mockIngresar} />
        );

        const correo = screen.getByLabelText('Correo electrónico');
        const contrasena = screen.getByLabelText('Contraseña');

        fireEvent.change(correo, {
            target: { value: 'cliente@bergen.com' }
        });

        fireEvent.change(contrasena, {
            target: { value: 'ClaveSegura123!' }
        });

        const boton = screen.getByRole('button', {
            name: 'Ingresar'
        });

        fireEvent.submit(boton.closest('form'));

        expect(mockIngresar).toHaveBeenCalledTimes(1);

        expect(mockIngresar).toHaveBeenCalledWith(
            'cliente@bergen.com',
            'ClaveSegura123!'
        );
    });

});
