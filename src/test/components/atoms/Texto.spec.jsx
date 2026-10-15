import { render, screen } from '@testing-library/react';
import Texto from '../../../components/atoms/Texto';

describe('Texto Component', () => {

    it('renderiza el contenido correctamente', () => {
        render(
            <Texto contenido="Bergen Perfumes" />
        );

        const texto = screen.getByText('Bergen Perfumes');

        expect(texto).toBeTruthy();
    });


    it('renderiza la etiqueta indicada', () => {
        render(
            <Texto
                etiqueta="h2"
                contenido="Perfumes destacados"
            />
        );

        const texto = screen.getByText('Perfumes destacados');

        expect(texto.tagName).toBe('H2');
    });


    it('aplica la clase recibida por className', () => {
        render(
            <Texto
                contenido="Fragancias exclusivas"
                className="texto-destacado"
            />
        );

        const texto = screen.getByText('Fragancias exclusivas');

        expect(texto).toHaveClass('texto-destacado');
    });

});