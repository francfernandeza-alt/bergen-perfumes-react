
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Imagen from "../../components/atoms/Imagen";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import Icono from "../../components/atoms/Icono";

import PrecioProducto from "../../components/molecules/PrecioProducto";
import ControlCantidad from "../../components/molecules/ControlCantidad";

import { obtenerProductoPorIdAPI } from "../../services/productoService";
import { agregarAlCarrito } from "../../scripts/storage/carritoStorage";

import "../../styles/pages/DetalleProducto.css";

function DetalleProducto() {

    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // Obtener producto desde Spring Boot
    useEffect(() => {
        let activo = true;

        async function cargarProducto() {
            setCargando(true);
            setError("");
            setProducto(null);
            setCantidad(1);

            try {
                const datos = await obtenerProductoPorIdAPI(id);

                if (activo) {
                    setProducto(datos);
                }

            } catch (error) {
                console.error("Error al cargar producto:", error);

                if (activo) {
                    setError("No fue posible cargar el producto.");
                }

            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargarProducto();

        return () => {
            activo = false;
        };

    }, [id]);

    const aumentarCantidad = () => {
        setCantidad((anterior) => {
            if (!producto || producto.stock <= 0) {
                return anterior;
            }

            return Math.min(anterior + 1, producto.stock);
        });
    };

    const disminuirCantidad = () => {
        setCantidad((anterior) => Math.max(1, anterior - 1));
    };

    const manejarAgregarAlCarrito = () => {

        if (!producto || producto.stock <= 0) {
            return;
        }

        const agregado = agregarAlCarrito(
            producto.id,
            cantidad
        );

        if (agregado) {
            alert(
                `${cantidad} unidad(es) de ${producto.nombre} agregada(s) al carrito.`
            );
        } else {
            alert(
                "No se pudo agregar el producto. Revisa el stock disponible."
            );
        }
    };

    // Estado de carga
    if (cargando) {
        return (
            <section className="detalle-no-encontrado">
                <div className="container">
                    <Texto contenido="Cargando producto..." />
                </div>
            </section>
        );
    }

    // Error de conexión
    if (error) {
        return (
            <section className="detalle-no-encontrado">
                <div className="container">
                    <Texto etiqueta="h1" contenido="Error al cargar producto" />
                    <Texto contenido={error} />

                    <Link to="/catalogo" className="detalle-volver">
                        Volver al catálogo
                    </Link>
                </div>
            </section>
        );
    }

    // Producto inexistente
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

                    <Link to="/catalogo" className="detalle-volver">
                        Volver al catálogo
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <div className="detalle-producto">

            <div className="container">

                <div className="detalle-navegacion">
                    <Link
                        to="/catalogo"
                        className="detalle-volver"
                    >
                        <Icono nombre="arrow-left" />
                        Volver al catálogo
                    </Link>
                </div>

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

                        <div className="detalle-atributos">

                            {producto.marca && (
                                <div className="detalle-atributo">
                                    <span className="detalle-atributo-label">
                                        Marca
                                    </span>
                                    <span className="detalle-atributo-valor">
                                        {producto.marca}
                                    </span>
                                </div>
                            )}

                            {producto.categoria && (
                                <div className="detalle-atributo">
                                    <span className="detalle-atributo-label">
                                        Categoría
                                    </span>
                                    <span className="detalle-atributo-valor">
                                        {producto.categoria}
                                    </span>
                                </div>
                            )}

                        </div>

                        <Texto
                            contenido={producto.descripcion}
                            className="detalle-descripcion"
                        />

                        <PrecioProducto
                            precio={producto.precio}
                            precioAnterior={producto.precioAnterior}
                        />

                        <Texto
                            contenido={
                                producto.stock > 0
                                    ? `Stock disponible: ${producto.stock}`
                                    : "Producto sin stock"
                            }
                            className="detalle-stock"
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
                                    onClick={manejarAgregarAlCarrito}
                                    deshabilitado={producto.stock <= 0}
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
