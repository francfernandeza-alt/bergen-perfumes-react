import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ListaProductos from "../../components/organisms/ListaProductos";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import { obtenerProductosAPI } from "../../services/productoService";
import { useCarrito } from "../../context/CarritoContext";

import "../../styles/pages/Inicio.css";

function Inicio() {

    const navigate = useNavigate();

    const { agregarAlCarrito } = useCarrito();

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [agregando, setAgregando] = useState(false);

    // Obtener productos desde el backend
    useEffect(() => {

        async function cargarProductos() {

            try {

                setCargando(true);
                setError("");

                const datos = await obtenerProductosAPI();

                setProductos(datos);

            } catch (error) {

                console.error(
                    "Error al cargar productos destacados:",
                    error
                );

                setError(
                    "No se pudieron cargar los productos destacados."
                );

            } finally {

                setCargando(false);
            }
        }

        cargarProductos();

    }, []);

    // Seleccionar los productos destacados
    const destacados = productos.filter(
        (producto) => producto.destacado
    );

    const productosDestacados = (
        destacados.length > 0 ? destacados : productos
    ).slice(0, 4);
    
    // Navegar al detalle del producto
    const verDetalle = (id) => {

        navigate(`/producto/${id}`);
    };

    // Agregar producto mediante el contexto del carrito
    const manejarAgregarAlCarrito = async (producto) => {

        if (agregando) {
            return;
        }

        setAgregando(true);

        try {

            const agregado = await agregarAlCarrito(
                producto.id,
                1,
                producto
            );

            if (agregado) {

                alert(
                    "Producto agregado al carrito correctamente."
                );

            } else {

                alert(
                    "No se pudo agregar el producto. Revisa el stock disponible."
                );
            }

        } catch (error) {

            alert(
                error.message ||
                "No se pudo agregar el producto al carrito."
            );

        } finally {

            setAgregando(false);
        }
    };

    return (
        <div className="inicio">

            <section className="inicio-hero">

                <div className="container">

                    <div className="inicio-hero-contenido">

                        <Texto
                            etiqueta="p"
                            contenido="BIENVENIDO A BERGEN PERFUMES"
                            className="inicio-etiqueta"
                        />

                        <Texto
                            etiqueta="h1"
                            contenido="Encuentra tu próxima fragancia"
                            className="inicio-titulo"
                        />

                        <Texto
                            contenido="Descubre nuestra selección de perfumes y encuentra el aroma ideal para cada ocasión."
                            className="inicio-descripcion"
                        />

                        <Link
                            to="/catalogo"
                            className="inicio-boton"
                        >
                            Explorar catálogo
                            <Icono nombre="arrow-right" />
                        </Link>

                    </div>

                </div>

            </section>

            <section className="inicio-destacados">

                <div className="container">

                    <div className="inicio-seccion-titulo">

                        <Texto
                            etiqueta="h2"
                            contenido="Perfumes destacados"
                        />

                        <Texto
                            contenido="Conoce algunas de nuestras fragancias."
                        />

                    </div>

                    {cargando ? (

                        <Texto
                            contenido="Cargando productos destacados..."
                        />

                    ) : error ? (

                        <Texto contenido={error} />

                    ) : productosDestacados.length === 0 ? (

                        <Texto
                            contenido="No hay productos destacados disponibles."
                        />

                    ) : (

                        <ListaProductos
                            productos={productosDestacados}
                            onDetalle={verDetalle}
                            onAgregar={manejarAgregarAlCarrito}
                        />

                    )}

                </div>

            </section>

            <section className="inicio-catalogo">

                <div className="container">

                    <Texto
                        etiqueta="h2"
                        contenido="Descubre toda nuestra colección"
                    />

                    <Texto
                        contenido="Explora nuestro catálogo y encuentra tu perfume favorito."
                    />

                    <Link
                        to="/catalogo"
                        className="inicio-boton inicio-boton-secundario"
                    >
                        Ver todos los perfumes
                        <Icono nombre="arrow-right" />
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Inicio;