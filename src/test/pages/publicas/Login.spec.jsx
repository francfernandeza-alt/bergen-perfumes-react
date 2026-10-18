
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Login from '../../../pages/publicas/Login';

import { crearUsuario } from '../../../scripts/storage/usuariosStorage.js';
import { obtenerSesion } from '../../../scripts/storage/sesionStorage.js';

describe('Login Component', () => {

    let respaldoUsuarios;
    let respaldoSesion;

    beforeEach(() => {
        respaldoUsuarios = localStorage.getItem('bergen_usuarios');
        respaldoSesion = localStorage.getItem('bergen_sesion');

        localStorage.removeItem('bergen_usuarios');
        localStorage.removeItem('bergen_sesion');
    });

    afterEach(() => {
        localStorage.removeItem('bergen_usuarios');
        localStorage.removeItem('bergen_sesion');

        if (respaldoUsuarios !== null) {
            localStorage.setItem('bergen_usuarios', respaldoUsuarios);
        }

        if (respaldoSesion !== null) {
            localStorage.setItem('bergen_sesion', respaldoSesion);
        }
    });

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

        expect(
            screen.getByText('Bienvenido nuevamente')
        ).toBeTruthy();

        expect(
            screen.getByLabelText('Correo electrónico')
        ).toBeTruthy();

        expect(
            screen.getByLabelText('Contraseña')
        ).toBeTruthy();

        expect(
            screen.getByRole('button', { name: 'Ingresar' })
        ).toBeTruthy();

        expect(
            screen.getByText('Tu información está protegida.')
        ).toBeTruthy();
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

    it('permite iniciar sesión como cliente y guarda su rol', () => {

        const creado = crearUsuario({
            rut: '12345678-9',
            nombre: 'Cliente',
            apellidos: 'Prueba',
            correo: 'cliente@bergen.com',
            contrasena: 'BergenDemo2026',
            direccion: 'Dirección de prueba'
        });

        expect(creado).toBe(true);

        renderLogin();

        fireEvent.change(
            screen.getByLabelText('Correo electrónico'),
            {
                target: { value: 'cliente@bergen.com' }
            }
        );

        fireEvent.change(
            screen.getByLabelText('Contraseña'),
            {
                target: { value: 'BergenDemo2026' }
            }
        );

        fireEvent.click(
            screen.getByRole('button', { name: 'Ingresar' })
        );

        const sesion = obtenerSesion();

        expect(sesion).not.toBeNull();
        expect(sesion.correo).toBe('cliente@bergen.com');
        expect(sesion.rol).toBe('cliente');

        expect(
            screen.getByText('Página de inicio de prueba')
        ).toBeTruthy();
    });

});
