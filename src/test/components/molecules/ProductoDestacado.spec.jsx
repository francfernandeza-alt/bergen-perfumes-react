import { render, screen } from '@testing-library/react';
import ProductoDestacado from '../../../components/molecules/ProductoDestacado';

describe('ProductoDestacado Component', () => {

    it('muestra correctamente el nombre del producto', () => {
        render(
            <ProductoDestacado
                nombre="Dior Sauvage"
                imagen="dior.jpg"
                enlace="/producto/1"
            />
        );

        const nombre = screen.getByText('Dior Sauvage');

        expect(nombre).toBeTruthy();
    });


    it('renderiza correctamente la imagen del producto', () => {
        render(
            <ProductoDestacado
                nombre="Dior Sauvage"
                imagen="dior.jpg"
                enlace="/producto/1"
            />
        );

        const imagen = screen.getByRole('img', {
            name: 'Dior Sauvage'
        });

        expect(imagen.getAttribute('src')).toBe('dior.jpg');
        expect(imagen.getAttribute('alt')).toBe('Dior Sauvage');
    });


    it('aplica correctamente el enlace del producto', () => {
        render(
            <ProductoDestacado
                nombre="Dior Sauvage"
                imagen="dior.jpg"
                enlace="/producto/1"
            />
        );

        const enlace = screen.getByText('Dior Sauvage').closest('a');

        expect(enlace.getAttribute('href')).toBe('/producto/1');
    });

});