
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioProducto from '../../../components/organisms/FormularioProducto';

describe('FormularioProducto Component', () => {

    const marcas = [
        { id: 3, nombre: 'Ralph Lauren' },
        { id: 5, nombre: 'Dior' }
    ];

    const categorias = [
        { id: 1, nombre: 'Masculino' },
        { id: 2, nombre: 'Femenino' }
    ];

    const productoEjemplo = {
        id: 1,
        nombre: 'Polo Blue',
        idCategoria: 1,
        idMarca: 3,
        descripcion: 'Fragancia fresca',
        precio: 64000,
        precioOferta: null,
        stock: 15,
        volumenMl: 125,
        destacado: false,
        activo: true,
        imagen: 'https://i.ibb.co/abc/polo-blue.webp'
    };

    const crearArchivo = (tipo = 'image/png', nombre = 'perfume.png') =>
        new File([new Uint8Array(100)], nombre, { type: tipo });

    const renderFormulario = (props = {}) => render(
        <FormularioProducto
            marcas={marcas}
            categorias={categorias}
            {...props}
        />
    );

    const cambiar = (etiqueta, valor) => {
        fireEvent.change(screen.getByLabelText(etiqueta), {
            target: { value: valor }
        });
    };

    const completarFormulario = () => {
        cambiar('Nombre del perfume', 'Polo Blue');
        cambiar('Categoría del perfume', '1');
        cambiar('Marca del perfume', '3');
        cambiar('Precio', '64000');
        cambiar('Stock disponible', '15');
    };

    const seleccionarImagen = (archivo) => {
        fireEvent.change(screen.getByLabelText(/imagen/i), {
            target: { files: [archivo] }
        });
    };

    const enviar = () => {
        fireEvent.submit(screen.getByRole('button', {
            name: /Agregar producto|Guardar cambios/
        }).closest('form'));
    };


    it('carga correctamente los datos al editar un producto', () => {
        renderFormulario({ producto: productoEjemplo });

        expect(screen.getByText('Editar producto')).toBeTruthy();
        expect(screen.getByLabelText('Nombre del perfume').value).toBe('Polo Blue');
        expect(screen.getByLabelText('Categoría del perfume').value).toBe('1');
        expect(screen.getByLabelText('Marca del perfume').value).toBe('3');
        expect(screen.getByLabelText('Precio').value).toBe('64000');
        expect(screen.getByLabelText('Volumen en ml (opcional)').value).toBe('125');

        expect(screen.getByText('Imagen actual')).toBeTruthy();
        expect(screen.getByAltText('Vista previa del perfume').getAttribute('src'))
            .toBe('https://i.ibb.co/abc/polo-blue.webp');
    });


    it('muestra las marcas y categorías recibidas', () => {
        renderFormulario();

        expect(screen.getByRole('option', { name: 'Dior' })).toBeTruthy();
        expect(screen.getByRole('option', { name: 'Femenino' })).toBeTruthy();
    });


    it('entrega los datos y el archivo seleccionado al guardar', () => {
        const mockGuardar = jasmine.createSpy('onGuardar');

        renderFormulario({ onGuardar: mockGuardar });

        completarFormulario();
        cambiar('Precio de oferta (opcional)', '55000');
        fireEvent.click(screen.getByLabelText('Mostrar como producto destacado'));

        const archivo = crearArchivo();
        seleccionarImagen(archivo);

        expect(screen.getByText('Vista previa')).toBeTruthy();

        enviar();

        expect(mockGuardar).toHaveBeenCalledTimes(1);

        const [datos, archivoEnviado] = mockGuardar.calls.mostRecent().args;

        expect(datos).toEqual(jasmine.objectContaining({
            nombre: 'Polo Blue',
            idCategoria: '1',
            idMarca: '3',
            precio: '64000',
            precioOferta: '55000',
            stock: '15',
            destacado: true,
            activo: true
        }));

        expect(archivoEnviado).toBe(archivo);
    });


    it('no permite guardar un producto con stock negativo', () => {
        const mockGuardar = jasmine.createSpy('onGuardar');

        renderFormulario({ onGuardar: mockGuardar });

        completarFormulario();
        cambiar('Stock disponible', '-5');
        seleccionarImagen(crearArchivo());

        enviar();

        expect(mockGuardar).not.toHaveBeenCalled();
        expect(
            screen.getByText('El stock debe ser un número entero mayor o igual a 0.')
        ).toBeTruthy();
    });


    it('no permite un precio de oferta mayor o igual al precio', () => {
        const mockGuardar = jasmine.createSpy('onGuardar');

        renderFormulario({ onGuardar: mockGuardar });

        completarFormulario();
        cambiar('Precio de oferta (opcional)', '64000');
        seleccionarImagen(crearArchivo());

        enviar();

        expect(mockGuardar).not.toHaveBeenCalled();
        expect(screen.getByText(/El precio de oferta debe ser/)).toBeTruthy();
    });


    it('exige una imagen al crear un producto', () => {
        const mockGuardar = jasmine.createSpy('onGuardar');

        renderFormulario({ onGuardar: mockGuardar });

        completarFormulario();
        enviar();

        expect(mockGuardar).not.toHaveBeenCalled();
        expect(screen.getByText('Debes seleccionar una imagen del perfume.')).toBeTruthy();
    });


    it('rechaza imágenes con formato no permitido al seleccionarlas', () => {
        renderFormulario();

        seleccionarImagen(crearArchivo('image/gif', 'animacion.gif'));

        expect(screen.getByText('Formato no permitido. Usa JPG, PNG o WEBP.')).toBeTruthy();
        expect(screen.queryByText('Vista previa')).toBeNull();
    });


    it('permite editar sin cambiar la imagen', () => {
        const mockGuardar = jasmine.createSpy('onGuardar');

        renderFormulario({ producto: productoEjemplo, onGuardar: mockGuardar });

        cambiar('Stock disponible', '20');
        enviar();

        const [datos, archivo] = mockGuardar.calls.mostRecent().args;

        expect(datos.stock).toBe('20');
        expect(archivo).toBeNull();
    });


    it('muestra el error recibido y bloquea el formulario mientras guarda', () => {
        renderFormulario({
            guardando: true,
            error: 'No se pudo subir la imagen: ImgBB no pudo procesar la imagen'
        });

        expect(
            screen.getByText('No se pudo subir la imagen: ImgBB no pudo procesar la imagen')
        ).toBeTruthy();

        expect(screen.getByRole('button', { name: 'Guardando...' }).disabled).toBeTrue();
        expect(screen.getByLabelText('Nombre del perfume').disabled).toBeTrue();
    });

});
