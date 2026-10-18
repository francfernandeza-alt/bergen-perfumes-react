
import { render, screen } from '@testing-library/react';
import ItemResumen from '../../../components/molecules/ItemResumen';

describe('ItemResumen Component', () => {

    it('renderiza correctamente el nombre del producto', () => {
        render(
            <ItemResumen
                nombre="Dior Sauvage"
                cantidad={2}
                precio={500}
            />
        );

        const nombre = screen.getByText('Dior Sauvage');

        expect(nombre).toBeTruthy();
    });


    it('muestra correctamente la cantidad y el precio unitario', () => {
        render(
            <ItemResumen
                nombre="Dior Sauvage"
                cantidad={2}
                precio={500}
            />
        );

        const cantidad = screen.getByText('Cantidad: 2');
        const precio = screen.getByText('Precio unitario: $500');

        expect(cantidad).toBeTruthy();
        expect(precio).toBeTruthy();
    });


    it('calcula correctamente el subtotal', () => {
        render(
            <ItemResumen
                nombre="Dior Sauvage"
                cantidad={3}
                precio={500}
            />
        );

        const subtotal = screen.getByText('$1.500');

        expect(subtotal).toBeTruthy();
    });

});
