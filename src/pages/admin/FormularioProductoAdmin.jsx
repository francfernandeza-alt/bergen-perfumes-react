
import { useNavigate, useParams } from "react-router-dom";

import FormularioProducto from "../../components/organisms/FormularioProducto";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import "../../styles/pages/FormularioProductoAdmin.css";

// Productos temporales para probar la edición.
// Posteriormente se conectarán al CRUD real.

const productosEjemplo = [
    {
        id: 1,
        nombre: "Polo Blue",
        descripcion: "Fragancia masculina fresca y elegante.",
        precio: 64,
        precioAnterior: 80,
        stock: 15,
        imagen: "/imagenes/263-Polo-Blue.webp"
    },
    {
        id: 2,
        nombre: "Big Pony",
        descripcion: "Una fragancia moderna y dinámica.",
        precio: 85,
        precioAnterior: null,
        stock: 8,
        imagen: "/imagenes/274-Big-Pony.webp"
    }
];

function FormularioProductoAdmin() {

    const navigate = useNavigate();
    const { id } = useParams();

    const esEdicion = id !== undefined;

    const productoSeleccionado = esEdicion
        ? productosEjemplo.find(
            (producto) => producto.id === Number(id)
        )
        : null;

    const guardarProducto = (datosProducto) => {

        // Simulación temporal.
        // Aquí se conectará el CRUD real.

        if (esEdicion) {
            console.log("Edición simulada de producto");
        } else {
            console.log("Creación simulada de producto");
        }

        navigate("/admin/productos");
    };

    const cancelar = () => {
        navigate("/admin/productos");
    };

    if (esEdicion && !productoSeleccionado) {
        return (
            <div className="formulario-producto-admin">

                <Texto
                    etiqueta="h1"
                    contenido="Producto no encontrado"
                />

                <Texto
                    contenido="El producto que intentas editar no existe."
                />

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={cancelar}
                >
                    Volver a productos
                </button>

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
