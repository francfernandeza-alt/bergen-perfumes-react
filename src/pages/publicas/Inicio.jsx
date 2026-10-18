
import { Link, useNavigate } from "react-router-dom";

import ListaProductos from "../../components/organisms/ListaProductos";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import { obtenerProductos } from "../../scripts/storage/storage";
import { agregarAlCarrito } from "../../scripts/storage/carritoStorage";

import "../../styles/pages/Inicio.css";

function Inicio() {

    const navigate = useNavigate();

    const productos = obtenerProductos();
    const productosDestacados = productos.slice(0, 4);

    const verDetalle = (id) => {
        navigate(`/producto/${id}`);
    };

    const manejarAgregarAlCarrito = (id) => {

    const agregado = agregarAlCarrito(id);

    if (agregado) {
        alert("Producto agregado al carrito correctamente.");
    } else {
        alert("No se pudo agregar el producto. Revisa el stock disponible.");
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

                    <ListaProductos
                        productos={productosDestacados}
                        onDetalle={verDetalle}
                        onAgregar={manejarAgregarAlCarrito}
                    />

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
