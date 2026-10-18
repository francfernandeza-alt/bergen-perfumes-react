import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer';

describe('Footer Component', () => {

    it('renderiza correctamente las secciones del Footer', () => {
        render(<Footer />);

        expect(screen.getByText('SOBRE NOSOTROS')).toBeTruthy();
        expect(screen.getByText('CATEGORÍAS')).toBeTruthy();
        expect(screen.getByText('CONTACTO E INFORMACIÓN')).toBeTruthy();
        expect(screen.getByText('SUBSCRÍBETE')).toBeTruthy();
    });


    it('renderiza correctamente los enlaces de navegación', () => {
        render(<Footer />);

        const catalogo = screen.getByRole('link', {
            name: 'Catálogo'
        });

        const ofertas = screen.getByRole('link', {
            name: 'Ofertas'
        });

        const contacto = screen.getByRole('link', {
            name: 'contacto@bergenperfumes.cl'
        });

        expect(catalogo.getAttribute('href')).toBe('/catalogo');
        expect(ofertas.getAttribute('href')).toBe('/ofertas');
        expect(contacto.getAttribute('href')).toBe('mailto:contacto@bergenperfumes.cl');
    });


    it('permite suscribirse desde el Footer', () => {
        const mockAlert = spyOn(window, 'alert');

        render(<Footer />);

        const input = screen.getByPlaceholderText(
            'Ingresa tu correo electrónico'
        );

        fireEvent.change(input, {
            target: { value: 'cliente@bergen.com' }
        });

        const formulario = input.closest('form');

        fireEvent.submit(formulario);

        expect(mockAlert).toHaveBeenCalledWith(
            'Gracias por subscribirte: cliente@bergen.com'
        );
    });

});