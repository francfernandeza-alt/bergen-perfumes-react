
import { useState } from "react";
import { Link } from "react-router-dom";

import FormularioEnvio from "../../components/organisms/FormularioEnvio";
import ResumenCompra from "../../components/organisms/ResumenCompra";

import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import "../../styles/pages/Envio.css";

// Productos temporales.
// Luego se conectarán con el carrito real.

const productosEjemplo = [
    {
        id: 1,
        nombre: "Polo Blue",
        precio: 64,
        cantidad: 2
    },
    {
        id: 2,
        nombre: "Big Pony",
        precio: 85,
        cantidad: 1
    }
];

function Envio() {

    const [productos] = useState(productosEjemplo);
    const [compraConfirmada, setCompraConfirmada] = useState(false);

    const confirmarCompra = (datosEnvio) => {

        // Pendiente: integrar la lógica real de compras.
        // No mostrar datos personales en consola.

        console.log("Compra simulada confirmada");

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

    return (
        <div className="envio">

            <div className="container">

                {/* ENCABEZADO */}

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

                {/* VOLVER AL CARRITO */}

                <Link
                    to="/carrito"
                    className="envio-volver"
                >
                    <Icono nombre="arrow-left" />
                    Volver al carrito
                </Link>

                {/* CONTENIDO */}

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
