
import { useNavigate, useParams } from "react-router-dom";

import FormularioProducto from "../../components/organisms/FormularioProducto";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";

import {
    obtenerProductoPorId,
    agregarProducto,
    actualizarProducto
} from "../../scripts/storage/storage";

import "../../styles/pages/FormularioProductoAdmin.css";

function FormularioProductoAdmin() {

    const navigate = useNavigate();
    const { id } = useParams();

    // Si existe un ID, estamos editando.
    // Si no existe, estamos agregando.

    const esEdicion = id !== undefined;

    // Consultar el producto desde localStorage

    const productoSeleccionado = esEdicion
        ? obtenerProductoPorId(id)
        : null;

    // GUARDAR PRODUCTO

    const guardarProducto = (datosProducto) => {

        if (esEdicion) {

            // Actualizar producto existente

            const actualizado = actualizarProducto(datosProducto);

            if (!actualizado) {
                alert("No se pudo actualizar el producto.");
                return;
            }

        } else {

            // Agregar producto nuevo

            agregarProducto(datosProducto);
        }

        // Regresar a la tabla de productos

        navigate("/admin/productos");
    };

    // CANCELAR

    const cancelar = () => {
        navigate("/admin/productos");
    };

    // PRODUCTO NO ENCONTRADO

    if (esEdicion && !productoSeleccionado) {
        return (
            <div className="formulario-producto-admin">

                <Texto
                    etiqueta="h1"
                    contenido="Producto no encontrado"
                    className="formulario-producto-admin-titulo"
                />

                <Texto
                    contenido="El producto que intentas editar no existe."
                    className="formulario-producto-admin-descripcion"
                />

                <Boton
                    texto="Volver a productos"
                    variante="outline-secondary"
                    onClick={cancelar}
                />

            </div>
        );
    }

    return (
        <div className="formulario-producto-admin">

            {/* ENCABEZADO */}

            <div className="formulario-producto-admin-encabezado">

                <Texto
                    etiqueta="h1"
                    contenido={
                        esEdicion
                            ? "Editar perfume"
                            : "Agregar nuevo perfume"
                    }
                    className="formulario-producto-admin-titulo"
                />

                <Texto
                    contenido={
                        esEdicion
                            ? "Modifica la información del perfume seleccionado."
                            : "Completa los datos para agregar un nuevo perfume al catálogo."
                    }
                    className="formulario-producto-admin-descripcion"
                />

            </div>

            {/* FORMULARIO */}

            <div className="formulario-producto-admin-contenido">

                <FormularioProducto
                    producto={productoSeleccionado}
                    onGuardar={guardarProducto}
                    onCancelar={cancelar}
                />

            </div>

        </div>
    );
}

export default FormularioProductoAdmin;
