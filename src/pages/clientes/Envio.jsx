
import { useState } from "react";
import { Link } from "react-router-dom";

import FormularioEnvio from "../../components/organisms/FormularioEnvio";
import ResumenCompra from "../../components/organisms/ResumenCompra";

import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import {
    obtenerCarrito,
    vaciarCarrito
} from "../../scripts/storage/carritoStorage";
import { descontarStock } from "../../scripts/storage/storage";

import "../../styles/pages/Envio.css";

function Envio() {

    const [productos] = useState(() => obtenerCarrito());

    const [compraConfirmada, setCompraConfirmada] = useState(false);

    
    const confirmarCompra = (datosEnvio) => {

        const carritoActual = obtenerCarrito();

        if (carritoActual.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        const descuentoRealizado = descontarStock(carritoActual);

        if (!descuentoRealizado) {
            alert(
                "No se pudo confirmar la compra. " +
                "Uno o más productos no tienen stock suficiente."
            );
            return;
        }

        vaciarCarrito();

        setCompraConfirmada(true);
    };


    if (compraConfirmada) {
        return (
            <div className="envio-confirmacion">

                <div className="container">

                    <div className="envio-confirmacion-contenido">

                        <Icono nombre="check-circle-fill" />

                        <Texto
                            etiqueta="h1"
                            contenido="¡Compra confirmada!"
                        />

                        <Texto
                            contenido="Tu pedido se ha registrado correctamente en esta simulación."
                        />

                        <Texto
                            contenido="Gracias por comprar en Bergen Perfumes."
                        />

                        <Link
                            to="/"
                            className="envio-boton-volver"
                        >
                            Volver al inicio
                        </Link>

                    </div>

                </div>

            </div>
        );
    }

    if (productos.length === 0) {
        return (
            <div className="envio-confirmacion">

                <div className="container">

                    <div className="envio-confirmacion-contenido">

                        <Icono nombre="cart-x" />

                        <Texto
                            etiqueta="h1"
                            contenido="Tu carrito está vacío"
                        />

                        <Texto
                            contenido="Agrega productos antes de finalizar tu compra."
                        />

                        <Link
                            to="/catalogo"
                            className="envio-boton-volver"
                        >
                            Explorar catálogo
                        </Link>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="envio">

            <div className="container">

                <div className="envio-encabezado">

                    <Texto
                        etiqueta="h1"
                        contenido="Finalizar compra"
                        className="envio-titulo"
                    />

                    <Texto
                        contenido="Completa tus datos para confirmar tu pedido."
                        className="envio-descripcion"
                    />

                </div>

                <Link
                    to="/carrito"
                    className="envio-volver"
                >
                    <Icono nombre="arrow-left" />
                    Volver al carrito
                </Link>

                <div className="envio-contenido">

                    <div className="envio-formulario">

                        <FormularioEnvio
                            onConfirmar={confirmarCompra}
                        />

                    </div>

                    <div className="envio-resumen">

                        <ResumenCompra
                            productos={productos}
                            mostrarBoton={false}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Envio;
