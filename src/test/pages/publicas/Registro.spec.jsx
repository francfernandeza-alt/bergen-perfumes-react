
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Registro from '../../../pages/publicas/Registro';

describe('Registro Component', () => {

    const renderRegistro = () => {
        return render(
            <MemoryRouter initialEntries={['/registro']}>
                <Routes>
                    <Route
                        path="/registro"
                        element={<Registro />}
                    />

                    <Route
                        path="/"
                        element={<h1>Página de inicio de prueba</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );
    };


    it('renderiza correctamente el formulario de registro', () => {
        renderRegistro();

        expect(screen.getByText('Crea tu cuenta')).toBeTruthy();

        expect(screen.getByLabelText('RUT')).toBeTruthy();

        expect(screen.getByLabelText('Nombre')).toBeTruthy();

        expect(screen.getByLabelText('Apellidos')).toBeTruthy();

        expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();

        expect(screen.getByLabelText('Contraseña')).toBeTruthy();

        expect(screen.getByLabelText('Confirmar contraseña')).toBeTruthy();

        expect(screen.getByLabelText('Dirección')).toBeTruthy();

        expect(screen.getByRole('button', {
            name: 'Crear cuenta'
        })).toBeTruthy();

        expect(screen.getByText(
            'Tus datos serán utilizados para gestionar tu cuenta y tus compras.'
        )).toBeTruthy();
    });


    it('permite volver a la página de inicio', () => {
        renderRegistro();

        const enlace = screen.getByRole('link', {
            name: 'Volver al inicio'
        });

        expect(enlace.getAttribute('href')).toBe('/');

        fireEvent.click(enlace);

        expect(screen.getByText(
            'Página de inicio de prueba'
        )).toBeTruthy();

        expect(screen.queryByText('Crea tu cuenta')).toBeNull();
    });


    it('impide registrar un usuario con RUT inválido', () => {
        const mockConsola = spyOn(console, 'log');

        renderRegistro();

        const rut = screen.getByLabelText('RUT');

        fireEvent.change(rut, {
            target: { value: 'abc' }
        });

        const boton = screen.getByRole('button', {
            name: 'Crear cuenta'
        });

        fireEvent.submit(boton.closest('form'));

        expect(screen.getByText(
            'El RUT no es válido.'
        )).toBeTruthy();

        expect(mockConsola).not.toHaveBeenCalledWith(
            'Formulario de registro enviado'
        );
    });

});
