
import { render, screen, fireEvent, within } from '@testing-library/react';
import TablaProductosAdmin from '../../../components/organisms/TablaProductosAdmin';

describe('TablaProductosAdmin Component', () => {

    const productosEjemplo = [
        {
            id: 1,
            nombre: 'Polo Blue',
            marca: 'Ralph Lauren',
            categoria: 'Masculino',
            imagen: 'https://i.ibb.co/abc/polo-blue.webp',
            precio: 64000,
            precioOferta: null,
            stock: 10,
            activo: true,
            destacado: true
        },
        {
            id: 2,
            nombre: 'Versace Eros',
            marca: 'Versace',
            categoria: 'Masculino',
            imagen: null,
            precio: 70000,
            precioOferta: 50000,
            stock: 0,
            activo: true,
            destacado: false
        }
    ];


    it('muestra un mensaje cuando no hay productos registrados', () => {
        render(<TablaProductosAdmin productos={[]} />);

        expect(screen.getByText('No hay productos registrados.')).toBeTruthy();
        expect(screen.getByText('Total de productos: 0')).toBeTruthy();
    });


    it('muestra nombre, marca, categoría, precio, stock y estado', () => {
        render(
            <TablaProductosAdmin productos={productosEjemplo} />
        );

        const fila = screen.getByText('Polo Blue').closest('tr');

        expect(within(fila).getByText('Ralph Lauren')).toBeTruthy();
        expect(within(fila).getByText('Masculino')).toBeTruthy();
        expect(within(fila).getByText('10 disponibles')).toBeTruthy();
        expect(within(fila).getByText('Activo')).toBeTruthy();
        expect(within(fila).getByText('Destacado')).toBeTruthy();

        expect(screen.getByText('Sin stock')).toBeTruthy();
        expect(screen.getByText('Total de productos: 2')).toBeTruthy();
    });


    it('muestra la imagen alojada externamente o un marcador si no tiene', () => {
        render(
            <TablaProductosAdmin productos={productosEjemplo} />
        );

        const imagen = screen.getByAltText('Polo Blue');

        expect(imagen.getAttribute('src'))
            .toBe('https://i.ibb.co/abc/polo-blue.webp');

        const filaSinImagen = screen.getByText('Versace Eros').closest('tr');

        expect(within(filaSinImagen).getByTitle('Sin imagen')).toBeTruthy();
    });


    it('muestra el precio de oferta y el precio normal tachado', () => {
        render(
            <TablaProductosAdmin productos={productosEjemplo} />
        );

        const fila = screen.getByText('Versace Eros').closest('tr');

        expect(within(fila).getByText('$50.000')).toBeTruthy();
        expect(within(fila).getByText('$70.000').tagName).toBe('DEL');
    });


    it('permite editar y pide confirmación antes de desactivar', () => {
        const mockEditar = jasmine.createSpy('onEditar');
        const mockDesactivar = jasmine.createSpy('onDesactivar');

        const mockConfirmar = spyOn(window, 'confirm')
            .and.returnValue(false);

        render(
            <TablaProductosAdmin
                productos={productosEjemplo}
                onEditar={mockEditar}
                onDesactivar={mockDesactivar}
            />
        );

        const fila = screen.getByText('Polo Blue').closest('tr');

        fireEvent.click(
            within(fila).getByRole('button', { name: 'Editar' })
        );

        expect(mockEditar).toHaveBeenCalledWith(productosEjemplo[0]);

        const botonDesactivar = within(fila).getByRole('button', {
            name: 'Desactivar'
        });

        fireEvent.click(botonDesactivar);

        expect(mockDesactivar).not.toHaveBeenCalled();

        mockConfirmar.and.returnValue(true);

        fireEvent.click(botonDesactivar);

        expect(mockConfirmar).toHaveBeenCalledWith(
            '¿Desactivar "Polo Blue"? Dejará de mostrarse en el catálogo.'
        );

        expect(mockDesactivar).toHaveBeenCalledOnceWith(productosEjemplo[0]);
    });


    it('oculta las acciones cuando el usuario no puede administrar', () => {
        render(
            <TablaProductosAdmin
                productos={productosEjemplo}
                puedeAdministrar={false}
            />
        );

        expect(screen.queryByText('Acciones')).toBeNull();
        expect(screen.queryByRole('button', { name: 'Editar' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Desactivar' })).toBeNull();

        // El listado sigue visible para consulta
        expect(screen.getByText('Polo Blue')).toBeTruthy();
    });


    it('deshabilita las acciones del producto que se está procesando', () => {
        render(
            <TablaProductosAdmin
                productos={productosEjemplo}
                procesandoId={1}
            />
        );

        const fila = screen.getByText('Polo Blue').closest('tr');

        expect(
            within(fila).getByRole('button', { name: 'Desactivando...' }).disabled
        ).toBeTrue();

        expect(
            within(fila).getByRole('button', { name: 'Editar' }).disabled
        ).toBeTrue();
    });

});
