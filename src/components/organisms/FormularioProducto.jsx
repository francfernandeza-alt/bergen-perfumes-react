
import { useState, useEffect } from "react";

import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import Texto from "../atoms/Texto";
import Icono from "../atoms/Icono";
import Imagen from "../atoms/Imagen";

import "../../styles/organisms/FormularioProducto.css";

const productoVacio = {
    nombre: "",
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
