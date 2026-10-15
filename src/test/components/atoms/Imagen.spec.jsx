import { render, screen } from '@testing-library/react';
import Imagen from '../../../components/atoms/Imagen';

describe('Imagen Component', () => {

    it('renderiza una imagen correctamente', () => {
        render(
            <Imagen
                src="perfume.jpg"
                alt="Perfume Bergen"
            />
        );

        const imagen = screen.getByRole('img', {
            name: 'Perfume Bergen'
        });

        expect(imagen).toBeTruthy();
    });


    it('aplica correctamente src y alt', () => {
        render(
            <Imagen
                src="perfume.jpg"
                alt="Perfume Bergen"
            />
        );

        const imagen = screen.getByRole('img', {
            name: 'Perfume Bergen'
        });

        expect(imagen.getAttribute('src')).toBe('perfume.jpg');
        expect(imagen.getAttribute('alt')).toBe('Perfume Bergen');
    });


    it('aplica correctamente ancho y alto', () => {
        render(
            <Imagen
                src="perfume.jpg"
                alt="Perfume Bergen"
                ancho="300"
                alto="400"
            />
        );

        const imagen = screen.getByRole('img', {
            name: 'Perfume Bergen'
        });

        expect(imagen.getAttribute('width')).toBe('300');
        expect(imagen.getAttribute('height')).toBe('400');
    });

});