
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TablaProductosAdmin from "../../components/organisms/TablaProductosAdmin";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";

import "../../styles/pages/ProductosAdmin.css";

// Productos temporales para probar la página.
// Luego se conectarán con el CRUD real.

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

function ProductosAdmin() {

    const navigate = useNavigate();

    const [productos, setProductos] = useState(productosEjemplo);

    const agregarProducto = () => {
        navigate("/admin/productos/nuevo");
    };

    const editarProducto = (producto) => {
        navigate(`/admin/productos/editar/${producto.id}`);
    };

    const eliminarProducto = (id) => {
        setProductos((anteriores) =>
            anteriores.filter((producto) => producto.id !== id)
        );
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

            {/* TABLA */}

            <div className="productos-admin-contenido">

                <TablaProductosAdmin
                    productos={productos}
                    onEditar={editarProducto}
                    onEliminar={eliminarProducto}
                />

            </div>

        </div>
    );
}

export default ProductosAdmin;
