
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioProducto from '../../../components/organisms/FormularioProducto';

describe('FormularioProducto Component', () => {

    const productoEjemplo = {
        id: 1,
        nombre: 'Polo Blue',
        descripcion: 'Perfume para hombre',
        precio: 64,
        precioAnterior: 80,
        imagen: '/imagenes/263-Polo-Blue.webp',
        stock: 10
    };


    it('carga correctamente los datos al editar un producto', () => {
        render(
            <FormularioProducto producto={productoEjemplo} />
        );

        const titulo = screen.getByText('Editar producto');
        const nombre = screen.getByLabelText('Nombre del perfume');
        const precio = screen.getByLabelText('Precio');
        const stock = screen.getByLabelText('Stock disponible');

        expect(titulo).toBeTruthy();
        expect(nombre.value).toBe('Polo Blue');
        expect(precio.value).toBe('64');
        expect(stock.value).toBe('10');
    });


    it('ejecuta onGuardar con los datos correctos', () => {
        const mockGuardar = jasmine.createSpy('onGuardar');

        render(
            <FormularioProducto onGuardar={mockGuardar} />
        );

        fireEvent.change(screen.getByLabelText('Nombre del perfume'), {
            target: { value: 'Polo Blue' }
        });

        fireEvent.change(screen.getByLabelText('Descripción'), {
            target: { value: 'Perfume para hombre' }
        });

        fireEvent.change(screen.getByLabelText('Precio'), {
            target: { value: '64' }
        });

        fireEvent.change(screen.getByLabelText('Ruta de imagen'), {
            target: { value: '/imagenes/263-Polo-Blue.webp' }
        });

        fireEvent.change(screen.getByLabelText('Stock disponible'), {
            target: { value: '10' }
        });

        const boton = screen.getByRole('button', {
            name: 'Agregar producto'
        });

        fireEvent.submit(boton.closest('form'));

        expect(mockGuardar).toHaveBeenCalledTimes(1);

        expect(mockGuardar).toHaveBeenCalledWith({
            nombre: 'Polo Blue',
            descripcion: 'Perfume para hombre',
            precio: 64,
            precioAnterior: null,
            imagen: '/imagenes/263-Polo-Blue.webp',
            stock: 10
        });
    });


    it('no permite guardar un producto con stock negativo', () => {
        const mockGuardar = jasmine.createSpy('onGuardar');
        const mockAlert = spyOn(window, 'alert');

        render(
            <FormularioProducto
                producto={productoEjemplo}
                onGuardar={mockGuardar}
            />
        );

        const stock = screen.getByLabelText('Stock disponible');

        fireEvent.change(stock, {
            target: { value: '-1' }
        });

        const boton = screen.getByRole('button', {
            name: 'Guardar cambios'
        });

        fireEvent.submit(boton.closest('form'));

        expect(mockGuardar).not.toHaveBeenCalled();

        expect(mockAlert).toHaveBeenCalledWith(
            'Revisa el precio y el stock ingresados.'
        );
    });

});
