
import { Link, useNavigate } from "react-router-dom";

import ListaProductos from "../../components/organisms/ListaProductos";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import "../../styles/pages/Inicio.css";

const productosDestacados = [
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

function Inicio() {

    const navigate = useNavigate();

    const verDetalle = (id) => {
        navigate(`/producto/${id}`);
    };

    const agregarAlCarrito = (id) => {
        console.log("Agregar al carrito, ID:", id);
    };

    return (
        <div className="inicio">

            {/* SECCIÓN DE BIENVENIDA */}

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

            {/* PRODUCTOS DESTACADOS */}

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

                    <ListaProductos
                        productos={productosDestacados}
                        onDetalle={verDetalle}
                        onAgregar={agregarAlCarrito}
                    />

                </div>

            </section>

            {/* ACCESO AL CATÁLOGO */}

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
