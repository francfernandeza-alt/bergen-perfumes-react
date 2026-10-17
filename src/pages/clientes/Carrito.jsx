
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ListaCarrito from "../../components/organisms/ListaCarrito";
import ResumenCompra from "../../components/organisms/ResumenCompra";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import {
    obtenerCarrito,
    cambiarCantidadCarrito,
    eliminarDelCarrito
} from "../../scripts/storage/carritoStorage";

import "../../styles/pages/Carrito.css";

function Carrito() {

    const navigate = useNavigate();

    const [productos, setProductos] = useState(
        () => obtenerCarrito()
    );

    const cambiarCantidad = (id, nuevaCantidad) => {

        const actualizado = cambiarCantidadCarrito(
            id,
            nuevaCantidad
        );

        if (actualizado) {
            setProductos(obtenerCarrito());
        }
    };

    const eliminarProducto = (id) => {

        const eliminado = eliminarDelCarrito(id);

        if (eliminado) {
            setProductos(obtenerCarrito());
        }
    };

    const procederAlPago = () => {

        if (productos.length === 0) {
            return;
        }

        navigate("/envio");
    };

    return (
        <div className="carrito">

            <div className="container">

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
