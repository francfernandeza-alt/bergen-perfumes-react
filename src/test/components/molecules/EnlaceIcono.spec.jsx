import { render, screen } from '@testing-library/react';
import EnlaceIcono from '../../../components/molecules/EnlaceIcono';

describe('EnlaceIcono Component', () => {

    it('renderiza correctamente el texto del enlace', () => {
        render(
            <EnlaceIcono
                texto="Instagram"
                icono="instagram"
                href="https://instagram.com"
            />
        );

        const enlace = screen.getByText('Instagram');

        expect(enlace).toBeTruthy();
    });


    it('aplica correctamente el href', () => {
        render(
            <EnlaceIcono
                texto="Instagram"
                icono="instagram"
                href="https://instagram.com"
            />
        );

        const enlace = screen.getByText('Instagram').closest('a');

        expect(enlace.getAttribute('href')).toBe('https://instagram.com');
    });


    it('aplica el icono y target correctamente', () => {
        const { container } = render(
            <EnlaceIcono
                texto="Instagram"
                icono="instagram"
                href="https://instagram.com"
                target="_blank"
            />
        );

        const icono = container.querySelector('i');
        const enlace = screen.getByText('Instagram').closest('a');

        expect(icono).toHaveClass('bi-instagram');
        expect(enlace.getAttribute('target')).toBe('_blank');
    });

});