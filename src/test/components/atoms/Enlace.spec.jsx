import { render, screen } from '@testing-library/react';
import Enlace from '../../../components/atoms/Enlace';

describe('Enlace Component', () => {

    it('renderiza el texto correctamente', () => {
        render(
            <Enlace
                texto="Ver catálogo"
                href="/catalogo"
            />
        );

        const enlace = screen.getByText('Ver catálogo');

        expect(enlace).toBeTruthy();
    });


    it('aplica correctamente el href', () => {
        render(
            <Enlace
                texto="Ver catálogo"
                href="/catalogo"
            />
        );

        const enlace = screen.getByText('Ver catálogo');

        expect(enlace.getAttribute('href')).toBe('/catalogo');
    });


    it('aplica target blank y rel de seguridad correctamente', () => {
        render(
            <Enlace
                texto="Instagram"
                href="https://instagram.com"
                target="_blank"
            />
        );

        const enlace = screen.getByText('Instagram');

        expect(enlace.getAttribute('target')).toBe('_blank');
        expect(enlace.getAttribute('rel')).toBe('noopener noreferrer');
    });

});