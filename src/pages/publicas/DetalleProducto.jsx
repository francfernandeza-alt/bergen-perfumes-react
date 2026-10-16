
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Imagen from "../../components/atoms/Imagen";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import Icono from "../../components/atoms/Icono";

import PrecioProducto from "../../components/molecules/PrecioProducto";
import ControlCantidad from "../../components/molecules/ControlCantidad";

import "../../styles/pages/DetalleProducto.css";

// Datos temporales.
// Más adelante se conectarán con los productos reales.

const productosEjemplo = [
    {
        id: 1,
        nombre: "Polo Blue",
        descripcion: "Fragancia masculina fresca y elegante.",
        precio: 64,
        precioAnterior: 80,
        imagen: "/imagenes/263-Polo-Blue.webp"
    },
    {
        id: 2,
        nombre: "Big Pony",
        descripcion: "Una fragancia moderna y dinámica.",
        precio: 85,
        precioAnterior: null,
        imagen: "/imagenes/274-Big-Pony.webp"
    }
];

function DetalleProducto() {

    const { id } = useParams();

    const [cantidad, setCantidad] = useState(1);

    const producto = productosEjemplo.find(
        (item) => item.id === Number(id)
    );

    const aumentarCantidad = () => {
        setCantidad((anterior) => anterior + 1);
    };

    const disminuirCantidad = () => {
        setCantidad((anterior) => Math.max(1, anterior - 1));
    };

    const agregarAlCarrito = () => {
        // Pendiente: integrar lógica real del carrito.
        console.log("Agregar al carrito:", {
            ...producto,
            cantidad
        });
    };

    if (!producto) {
        return (
            <section className="detalle-no-encontrado">
                <div className="container">

                    <Texto
                        etiqueta="h1"
                        contenido="Producto no encontrado"
                    />

                    <Texto
                        contenido="El perfume que buscas no está disponible."
                    />

                    <Link
                        to="/catalogo"
                        className="detalle-volver"
                    >
                        Volver al catálogo
                    </Link>

                </div>
            </section>
        );
    }

    return (
        <div className="detalle-producto">

            <div className="container">

                {/* NAVEGACIÓN */}

                <div className="detalle-navegacion">

                    <Link
                        to="/catalogo"
                        className="detalle-volver"
                    >
                        <Icono nombre="arrow-left" />
                        Volver al catálogo
                    </Link>

                </div>

                {/* INFORMACIÓN DEL PRODUCTO */}

                <section className="detalle-contenido">

                    <div className="detalle-imagen">

                        <Imagen
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="detalle-imagen-producto"
                        />

                    </div>

                    <div className="detalle-informacion">

                        <Texto
                            etiqueta="p"
                            contenido="BERGEN PERFUMES"
                            className="detalle-etiqueta"
                        />

                        <Texto
                            etiqueta="h1"
                            contenido={producto.nombre}
                            className="detalle-titulo"
                        />

                        <Texto
                            contenido={producto.descripcion}
                            className="detalle-descripcion"
                        />

                        <PrecioProducto
                            precio={producto.precio}
                            precioAnterior={producto.precioAnterior}
                        />

                        <div className="detalle-compra">

                            <Texto
                                etiqueta="h2"
                                contenido="Cantidad"
                                className="detalle-subtitulo"
                            />

                            <div className="detalle-acciones">

                                <ControlCantidad
                                    cantidad={cantidad}
                                    onAumentar={aumentarCantidad}
                                    onDisminuir={disminuirCantidad}
                                />

                                <Boton
                                    texto={
                                        <>
                                            <Icono nombre="cart-plus" />
                                            <span>Agregar al carrito</span>
                                        </>
                                    }
                                    variante="marca"
                                    onClick={agregarAlCarrito}
                                    className="detalle-boton-carrito"
                                />

                            </div>

                        </div>

                    </div>

                </section>

            </div>

        </div>
    );
}

export default DetalleProducto;
