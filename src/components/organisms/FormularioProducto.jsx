
import { useState, useEffect } from "react";

import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import Texto from "../atoms/Texto";
import Icono from "../atoms/Icono";
import Imagen from "../atoms/Imagen";

import "../../styles/organisms/FormularioProducto.css";
import {
    validarNombreProducto,
    validarPrecio,
    validarStock,
    validarMarca
} from "../../scripts/validaciones/productos";
const productoVacio = {
    nombre: "",
    categoria: "",
    marca: "",
    descripcion: "",
    precio: "",
    precioAnterior: "",
    imagen: "",
    stock: ""
};

function FormularioProducto({
    producto = null,
    onGuardar,
    onCancelar
}) {

    const [datos, setDatos] = useState(productoVacio);

    const esEdicion = producto !== null;

    useEffect(() => {
        if (producto) {
            setDatos({
                nombre: producto.nombre ?? "",
                categoria: producto.categoria ?? "",
                marca: producto.marca ?? "",
                descripcion: producto.descripcion ?? "",
                precio: producto.precio ?? "",
                precioAnterior: producto.precioAnterior ?? "",
                imagen: producto.imagen ?? "",
                stock: producto.stock ?? ""
            });
        } else {
            setDatos({ ...productoVacio });
        }
    }, [producto]);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;

        setDatos((anteriores) => ({
            ...anteriores,
            [name]: value
        }));
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        if (validarNombreProducto(datos.nombre) == false) {
            alert("El nombre del perfume debe tener entre 1 y 100 caracteres.");
            return;
        }
        if (!["Masculino", "Femenino", "Unisex"].includes(datos.categoria)) {
            alert("Debes seleccionar una categoría válida para el perfume.");
            return;
        }
        if (validarMarca(datos.marca) == false) {
            alert("Debes seleccionar una marca para el perfume.");
            return;
        }
        if (validarPrecio(Number(datos.precio)) == false) {
            alert("El precio debe ser mayor a 0 y no puede tener decimales.");
            return;
        }
        if (validarStock(Number(datos.stock)) == false) {
            alert("El stock no puede ser negativo ni tener decimales.");
            return;
        }
        const productoGuardar = {
            ...datos,
            ...(esEdicion ? { id: producto.id } : {}),
            precio: Number(datos.precio),
            precioAnterior: datos.precioAnterior === ""
                ? null
                : Number(datos.precioAnterior),
            stock: Number(datos.stock)
        };

        if (
            !Number.isFinite(productoGuardar.precio) ||
            productoGuardar.precio <= 0 ||
            !Number.isInteger(productoGuardar.stock) ||
            productoGuardar.stock < 0 ||
            (
                productoGuardar.precioAnterior !== null &&
                (
                    !Number.isFinite(productoGuardar.precioAnterior) ||
                    productoGuardar.precioAnterior < 0
                )
            )
        ) {
            alert("Revisa el precio y el stock ingresados.");
            return;
        }

        onGuardar?.(productoGuardar);
    };

    return (
        <section className="formulario-producto">

            <div className="formulario-producto-encabezado">
                <Icono nombre="box-seam" />

                <Texto
                    etiqueta="h2"
                    contenido={
                        esEdicion
                            ? "Editar producto"
                            : "Agregar producto"
                    }
                    className="formulario-producto-titulo"
                />
            </div>

            <div className="formulario-producto-linea"></div>

            <form onSubmit={manejarEnvio}>

                <div className="row g-3">

                    <div className="col-12">
                        <CampoFormulario
                            etiqueta="Nombre del perfume"
                            nombre="nombre"
                            placeholder="Ej: Polo Blue"
                            valor={datos.nombre}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="categoria" className="form-label">
                            Categoría del perfume
                        </label>
                        
                        <select
                            id="categoria"
                            name="categoria"
                            className="form-select"
                            value={datos.categoria}
                            onChange={manejarCambio}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label htmlFor="marca" className="form-label">
                            Marca del perfume
                        </label>

                        <select
                            id="marca"
                            name="marca"
                            className="form-select"
                            value={datos.marca}
                            onChange={manejarCambio}
                            required
                        >
                            <option value="">Selecciona una marca</option>
                            <option value="Ralph Lauren">Ralph Lauren</option>
                            <option value="Carolina Herrera">Carolina Herrera</option>
                            <option value="Yves Saint Laurent">Yves Saint Laurent</option>
                            <option value="Dior">Dior</option>
                            <option value="Versace">Versace</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <CampoFormulario
                            etiqueta="Descripción"
                            nombre="descripcion"
                            placeholder="Descripción del perfume"
                            valor={datos.descripcion}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Precio"
                            tipo="number"
                            nombre="precio"
                            placeholder="Ej: 64"
                            valor={datos.precio}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Precio anterior (opcional)"
                            tipo="number"
                            nombre="precioAnterior"
                            placeholder="Ej: 80"
                            valor={datos.precioAnterior}
                            onChange={manejarCambio}
                        />
                    </div>

                    <div className="col-12">
                        <CampoFormulario
                            etiqueta="Ruta de imagen"
                            nombre="imagen"
                            placeholder="/imagenes/263-Polo-Blue.webp"
                            valor={datos.imagen}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12">
                        <CampoFormulario
                            etiqueta="Stock disponible"
                            tipo="number"
                            nombre="stock"
                            placeholder="Ej: 20"
                            valor={datos.stock}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                </div>

                {datos.imagen.trim() !== "" && (
                    <div className="formulario-producto-vista">

                        <Texto
                            etiqueta="h3"
                            contenido="Vista previa"
                        />

                        <Imagen
                            src={datos.imagen}
                            alt="Vista previa del perfume"
                            className="formulario-producto-imagen"
                        />

                    </div>
                )}

                <div className="formulario-producto-acciones">

                    <Boton
                        texto={
                            esEdicion
                                ? "Guardar cambios"
                                : "Agregar producto"
                        }
                        tipo="submit"
                        variante="marca"
                        className="formulario-producto-guardar"
                    />

                    <Boton
                        texto="Cancelar"
                        tipo="button"
                        variante="outline-secondary"
                        onClick={onCancelar}
                    />

                </div>

            </form>

        </section>
    );
}

export default FormularioProducto;
