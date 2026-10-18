
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Login from '../../../pages/publicas/Login';

describe('Login Component', () => {

    const renderLogin = () => {
        return render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/"
                        element={<h1>Página de inicio de prueba</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    };


    it('renderiza correctamente el formulario de inicio de sesión', () => {
        renderLogin();

        const titulo = screen.getByText('Bienvenido nuevamente');

        const correo = screen.getByLabelText('Correo electrónico');

        const contrasena = screen.getByLabelText('Contraseña');

        const boton = screen.getByRole('button', {
            name: 'Ingresar'
        });

        const mensaje = screen.getByText(
            'Tu información está protegida.'
        );

        expect(titulo).toBeTruthy();
        expect(correo).toBeTruthy();
        expect(contrasena).toBeTruthy();
        expect(boton).toBeTruthy();
        expect(mensaje).toBeTruthy();
    });


    it('permite volver a la página de inicio', () => {
        renderLogin();

        const enlace = screen.getByRole('link', {
            name: 'Volver al inicio'
        });

        expect(enlace.getAttribute('href')).toBe('/');

        fireEvent.click(enlace);

        expect(
            screen.getByText('Página de inicio de prueba')
        ).toBeTruthy();

        expect(
            screen.queryByText('Bienvenido nuevamente')
        ).toBeNull();
    });


    it('recibe un intento de inicio de sesión válido', () => {
        const mockConsola = spyOn(console, 'log');

        renderLogin();

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

        expect(mockConsola).toHaveBeenCalledWith(
            'Intento de inicio de sesión:',
            'cliente@bergen.com'
        );
    });

});
