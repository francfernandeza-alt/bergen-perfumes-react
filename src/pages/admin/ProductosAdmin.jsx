
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TablaProductosAdmin from "../../components/organisms/TablaProductosAdmin";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";

import {
    obtenerProductos,
    eliminarProducto
} from "../../scripts/storage";

import "../../styles/pages/ProductosAdmin.css";

function ProductosAdmin() {

    const navigate = useNavigate();

    // Cargar los productos desde localStorage
    const [productos, setProductos] = useState(() =>
        obtenerProductos()
    );

    const agregarProducto = () => {
        navigate("/admin/productos/nuevo");
    };

    const editarProducto = (producto) => {
        navigate(`/admin/productos/editar/${producto.id}`);
    };

    const manejarEliminar = (id) => {

        const eliminado = eliminarProducto(id);

        if (eliminado) {
            setProductos(obtenerProductos());
        }
    };

    return (
        <div className="productos-admin">

            {/* ENCABEZADO */}

            <div className="productos-admin-encabezado">

                <div className="productos-admin-informacion">

                    <Texto
                        etiqueta="h1"
                        contenido="Gestión de productos"
                        className="productos-admin-titulo"
                    />

                    <Texto
                        contenido="Administra los perfumes disponibles en Bergen Perfumes."
                        className="productos-admin-descripcion"
                    />

                </div>

                <Boton
                    texto="Agregar producto"
                    variante="marca"
                    className="productos-admin-agregar"
                    onClick={agregarProducto}
                />

            </div>

            {/* TABLA DE PRODUCTOS */}

            <div className="productos-admin-contenido">

                <TablaProductosAdmin
                    productos={productos}
                    onEditar={editarProducto}
                    onEliminar={manejarEliminar}
                />

            </div>

        </div>
    );
}

export default ProductosAdmin;
