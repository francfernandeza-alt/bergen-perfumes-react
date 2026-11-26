
import { useState, useEffect } from "react";

import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import Texto from "../atoms/Texto";
import Icono from "../atoms/Icono";
import Imagen from "../atoms/Imagen";
import Mensaje from "../atoms/Mensaje";

import "../../styles/organisms/FormularioProducto.css";

import {
    validarPrecio,
    validarStock
} from "../../scripts/validaciones/productos";

import { validarImagen } from "../../services/imagenService.js";

const productoVacio = {
    nombre: "",
    idCategoria: "",
    idMarca: "",
    descripcion: "",
    precio: "",
    precioOferta: "",
    stock: "",
    volumenMl: "",
    destacado: false
};

// Datos iniciales del formulario: vacíos al crear, los del producto al editar
function datosIniciales(producto) {

    if (!producto) {
        return { ...productoVacio };
    }

    return {
        nombre: producto.nombre ?? "",
        idCategoria: producto.idCategoria != null ? String(producto.idCategoria) : "",
        idMarca: producto.idMarca != null ? String(producto.idMarca) : "",
        descripcion: producto.descripcion ?? "",
        precio: producto.precio ?? "",
        precioOferta: producto.precioOferta ?? "",
        stock: producto.stock ?? "",
        volumenMl: producto.volumenMl ?? "",
        destacado: Boolean(producto.destacado)
    };
}

function esEnteroPositivo(valor) {
    const numero = Number(valor);
    return Number.isInteger(numero) && numero > 0;
}

// Validaciones alineadas con ProductoDTO y ProductoService del backend
function validarDatosProducto(datos, archivo, esEdicion) {

    const nombre = datos.nombre.trim();

    if (nombre.length === 0 || nombre.length > 150) {
        return "El nombre del perfume es obligatorio y puede tener hasta 150 caracteres.";
    }

    if (datos.idCategoria === "") {
        return "Selecciona una categoría.";
    }

    if (datos.idMarca === "") {
        return "Selecciona una marca.";
    }

    if (datos.precio === "" || !validarPrecio(Number(datos.precio))) {
        return "El precio debe ser un número entero mayor a 0.";
    }

    if (
        datos.precioOferta !== "" &&
        (!esEnteroPositivo(datos.precioOferta) ||
            Number(datos.precioOferta) >= Number(datos.precio))
    ) {
        return "El precio de oferta debe ser un número entero mayor a 0 y menor que el precio.";
    }

    if (datos.stock === "" || !validarStock(Number(datos.stock))) {
        return "El stock debe ser un número entero mayor o igual a 0.";
    }

    if (datos.volumenMl !== "" && !esEnteroPositivo(datos.volumenMl)) {
        return "El volumen debe ser un número entero mayor a 0.";
    }

    if (!esEdicion && !archivo) {
        return "Debes seleccionar una imagen del perfume.";
    }

    return null;
}

function FormularioProducto({
    producto = null,
    marcas = [],
    categorias = [],
    onGuardar,
    onCancelar,
    guardando = false,
    error = ""
}) {

    // Se inicializa directamente (sin useEffect) para no sobrescribir
    // lo que el usuario escriba justo después de que el formulario aparece.
    // La página monta el formulario recién cuando el producto ya está cargado.
    const [datos, setDatos] = useState(() => datosIniciales(producto));
    const [archivo, setArchivo] = useState(null);
    const [vistaPrevia, setVistaPrevia] = useState("");
    const [errorFormulario, setErrorFormulario] = useState("");

    const esEdicion = producto !== null;

    // Liberar la URL temporal de la vista previa
    useEffect(() => {
        return () => {
            if (vistaPrevia) {
                URL.revokeObjectURL(vistaPrevia);
            }
        };
    }, [vistaPrevia]);

    const manejarCambio = (evento) => {
        const { name, value, type, checked } = evento.target;

        setDatos((anteriores) => ({
            ...anteriores,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // La imagen solo se muestra localmente; se sube a ImgBB al guardar
    const manejarImagen = (evento) => {
        const seleccionado = evento.target.files?.[0] ?? null;

        setErrorFormulario("");

        if (!seleccionado) {
            setArchivo(null);
            setVistaPrevia("");
            return;
        }

        const errorImagen = validarImagen(seleccionado);

        if (errorImagen) {
            setArchivo(null);
            setVistaPrevia("");
            setErrorFormulario(errorImagen);
            evento.target.value = "";
            return;
        }

        setArchivo(seleccionado);
        setVistaPrevia(URL.createObjectURL(seleccionado));
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault();

        const errorValidacion = validarDatosProducto(datos, archivo, esEdicion);

        if (errorValidacion) {
            setErrorFormulario(errorValidacion);
            return;
        }

        setErrorFormulario("");

        onGuardar?.(
            {
                ...datos,
                activo: producto?.activo ?? true
            },
            archivo
        );
    };

    const imagenMostrada = vistaPrevia || producto?.imagen || "";
    const mensajeError = errorFormulario || error;

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

            <form onSubmit={manejarEnvio} noValidate>

                <div className="row g-3">

                    <div className="col-12">
                        <CampoFormulario
                            etiqueta="Nombre del perfume"
                            nombre="nombre"
                            placeholder="Ej: Polo Blue"
                            valor={datos.nombre}
                            onChange={manejarCambio}
                            requerido={true}
                            deshabilitado={guardando}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="idCategoria" className="form-label">
                            Categoría del perfume
                        </label>

                        <select
                            id="idCategoria"
                            name="idCategoria"
                            className="form-select"
                            value={datos.idCategoria}
                            onChange={manejarCambio}
                            disabled={guardando}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="idMarca" className="form-label">
                            Marca del perfume
                        </label>

                        <select
                            id="idMarca"
                            name="idMarca"
                            className="form-select"
                            value={datos.idMarca}
                            onChange={manejarCambio}
                            disabled={guardando}
                            required
                        >
                            <option value="">Selecciona una marca</option>
                            {marcas.map((marca) => (
                                <option key={marca.id} value={marca.id}>
                                    {marca.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <CampoFormulario
                            etiqueta="Descripción"
                            nombre="descripcion"
                            placeholder="Descripción del perfume"
                            valor={datos.descripcion}
                            onChange={manejarCambio}
                            deshabilitado={guardando}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Precio"
                            tipo="number"
                            nombre="precio"
                            placeholder="Ej: 64000"
                            valor={datos.precio}
                            onChange={manejarCambio}
                            requerido={true}
                            deshabilitado={guardando}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Precio de oferta (opcional)"
                            tipo="number"
                            nombre="precioOferta"
                            placeholder="Ej: 55000"
                            valor={datos.precioOferta}
                            onChange={manejarCambio}
                            deshabilitado={guardando}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Stock disponible"
                            tipo="number"
                            nombre="stock"
                            placeholder="Ej: 20"
                            valor={datos.stock}
                            onChange={manejarCambio}
                            requerido={true}
                            deshabilitado={guardando}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Volumen en ml (opcional)"
                            tipo="number"
                            nombre="volumenMl"
                            placeholder="Ej: 100"
                            valor={datos.volumenMl}
                            onChange={manejarCambio}
                            deshabilitado={guardando}
                        />
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input
                                id="destacado"
                                name="destacado"
                                type="checkbox"
                                className="form-check-input"
                                checked={datos.destacado}
                                onChange={manejarCambio}
                                disabled={guardando}
                            />
                            <label htmlFor="destacado" className="form-check-label">
                                Mostrar como producto destacado
                            </label>
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="imagen" className="form-label">
                            {esEdicion
                                ? "Nueva imagen (opcional)"
                                : "Imagen del perfume"}
                        </label>

                        <input
                            id="imagen"
                            name="imagen"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="form-control"
                            onChange={manejarImagen}
                            disabled={guardando}
                        />

                        <div className="form-text">
                            JPG, PNG o WEBP de hasta 1 MB. Se publica en ImgBB al guardar.
                        </div>
                    </div>

                </div>

                {imagenMostrada !== "" && (
                    <div className="formulario-producto-vista">

                        <Texto
                            etiqueta="h3"
                            contenido={vistaPrevia ? "Vista previa" : "Imagen actual"}
                        />

                        <Imagen
                            src={imagenMostrada}
                            alt="Vista previa del perfume"
                            className="formulario-producto-imagen"
                        />

                    </div>
                )}

                {mensajeError && (
                    <Mensaje
                        texto={mensajeError}
                        variante="danger"
                        className="formulario-producto-error"
                    />
                )}

                <div className="formulario-producto-acciones">

                    <Boton
                        texto={
                            guardando
                                ? "Guardando..."
                                : esEdicion
                                    ? "Guardar cambios"
                                    : "Agregar producto"
                        }
                        tipo="submit"
                        variante="marca"
                        className="formulario-producto-guardar"
                        deshabilitado={guardando}
                    />

                    <Boton
                        texto="Cancelar"
                        tipo="button"
                        variante="outline-secondary"
                        onClick={onCancelar}
                        deshabilitado={guardando}
                    />

                </div>

            </form>

        </section>
    );
}

export default FormularioProducto;
