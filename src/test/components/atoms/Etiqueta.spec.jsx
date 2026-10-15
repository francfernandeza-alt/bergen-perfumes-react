import { render, screen } from '@testing-library/react';
import Etiqueta from '../../../components/atoms/Etiqueta';

describe('Etiqueta Component', () => {

    it('renderiza el texto correctamente', () => {
        render(
            <Etiqueta
                texto="Correo electrónico"
                htmlFor="correo"
            />
        );

        const etiqueta = screen.getByText('Correo electrónico');

        expect(etiqueta).toBeTruthy();
    });


    it('aplica correctamente el htmlFor', () => {
        render(
            <Etiqueta
                texto="Correo electrónico"
                htmlFor="correo"
            />
        );

        const etiqueta = screen.getByText('Correo electrónico');

        expect(etiqueta.getAttribute('for')).toBe('correo');
    });


    it('aplica la clase base y la clase personalizada', () => {
        render(
            <Etiqueta
                texto="Contraseña"
                htmlFor="password"
                className="etiqueta-login"
            />
        );

        const etiqueta = screen.getByText('Contraseña');

        expect(etiqueta).toHaveClass('form-label');
        expect(etiqueta).toHaveClass('etiqueta-login');
    });

});