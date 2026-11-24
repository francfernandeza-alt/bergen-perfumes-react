
import { Link } from "react-router-dom";

import FormularioEnvio from "../../components/organisms/FormularioEnvio";
import ResumenCompra from "../../components/organisms/ResumenCompra";

import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import { useCarrito } from "../../context/CarritoContext.jsx";

import "../../styles/pages/Envio.css";

function Envio() {

    const {
        productos,
        cargando,
        error
    } = useCarrito();

    const confirmarCompra = (datosEnvio) => {

        if (productos.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        console.log(
            "Datos de envío validados:",
            datosEnvio
        );

        alert(
            "Los datos de envío se validaron correctamente. " +
            "La confirmación del pedido estará disponible " +
            "cuando integremos el backend de pedidos."
        );
    };

    if (cargando) {
        return (
            <div className="envio-confirmacion">

                <div className="container">

                    <div className="envio-confirmacion-contenido">

                        <Texto
                            etiqueta="h1"
                            contenido="Cargando tu carrito..."
                        />

                        <Texto
                            contenido="Estamos preparando el resumen de tu compra."
                        />

                    </div>

                </div>

            </div>
        );
    }

    if (error) {
        return (
            <div className="envio-confirmacion">

                <div className="container">

                    <div className="envio-confirmacion-contenido">

                        <Icono nombre="exclamation-triangle" />

                        <Texto
                            etiqueta="h1"
                            contenido="No pudimos cargar tu carrito"
                        />

                        <Texto
                            contenido={error}
                        />

                        <Link
                            to="/carrito"
                            className="envio-boton-volver"
                        >
                            Volver al carrito
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
