
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ListaCarrito from "../../components/organisms/ListaCarrito";
import ResumenCompra from "../../components/organisms/ResumenCompra";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import "../../styles/pages/Carrito.css";

// Productos temporales para probar la página.
// Luego se conectarán con la lógica real del carrito.

const productosEjemplo = [
    {
        id: 1,
        nombre: "Polo Blue",
        descripcion: "Fragancia masculina fresca y elegante.",
        precio: 64,
        precioAnterior: 80,
        imagen: "/imagenes/263-Polo-Blue.webp",
        cantidad: 2
    },
    {
        id: 2,
        nombre: "Big Pony",
        descripcion: "Una fragancia moderna y dinámica.",
        precio: 85,
        precioAnterior: null,
        imagen: "/imagenes/274-Big-Pony.webp",
        cantidad: 1
    }
];

function Carrito() {

    const navigate = useNavigate();

    const [productos, setProductos] = useState(productosEjemplo);

    const cambiarCantidad = (id, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;

        setProductos((anteriores) =>
            anteriores.map((producto) =>
                producto.id === id
                    ? { ...producto, cantidad: nuevaCantidad }
                    : producto
            )
        );
    };

    const eliminarProducto = (id) => {
        setProductos((anteriores) =>
            anteriores.filter((producto) => producto.id !== id)
        );
    };

    const procederAlPago = () => {
        if (productos.length === 0) return;

        navigate("/envio");
    };

    return (
        <div className="carrito">

            <div className="container">

                {/* ENCABEZADO */}

                <div className="carrito-encabezado">

                    <Texto
                        etiqueta="h1"
                        contenido="Mi carrito"
                        className="carrito-titulo"
                    />

                    <Texto
                        contenido="Revisa los productos de tu compra."
                        className="carrito-descripcion"
                    />

                </div>

                {/* NAVEGACIÓN */}

                <Link
                    to="/catalogo"
                    className="carrito-volver"
                >
                    <Icono nombre="arrow-left" />
                    Continuar comprando
                </Link>

                {/* CONTENIDO */}

                <div className="carrito-contenido">

                    <div className="carrito-listado">

                        <ListaCarrito
                            productos={productos}
                            onCambiarCantidad={cambiarCantidad}
                            onEliminar={eliminarProducto}
                        />

                    </div>

                    <div className="carrito-resumen">

                        <ResumenCompra
                            productos={productos}
                            onPagar={procederAlPago}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Carrito;
