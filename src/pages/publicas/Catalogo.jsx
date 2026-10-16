
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ListaProductos from "../../components/organisms/ListaProductos";
import Buscador from "../../components/molecules/Buscador";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import "../../styles/pages/Catalogo.css";

// Datos temporales para probar la página.
// Luego conectaremos los productos reales de src/scripts/.

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

function Catalogo() {

    const navigate = useNavigate();

    const [busqueda, setBusqueda] = useState("");

    const manejarBusqueda = (texto) => {
    setBusqueda(texto);
    };

    const productosFiltrados = productosEjemplo.filter(
        (producto) =>
            producto.nombre
                .toLowerCase()
                .includes(busqueda.toLowerCase().trim())
    );

    const verDetalle = (producto) => {
        navigate(`/producto/${producto.id}`);
    };

    const agregarAlCarrito = (producto) => {
        // Pendiente: conectar lógica real del carrito.
        console.log("Agregar al carrito:", producto);
    };

    return (
        <div className="catalogo">

            {/* ENCABEZADO */}

            <section className="catalogo-encabezado">

                <div className="container">

                    <div className="catalogo-encabezado-contenido">

                        <Texto
                            etiqueta="p"
                            contenido="BERGEN PERFUMES"
                            className="catalogo-etiqueta"
                        />

                        <Texto
                            etiqueta="h1"
                            contenido="Nuestro catálogo"
                            className="catalogo-titulo"
                        />

                        <Texto
                            contenido="Explora nuestra colección de fragancias y encuentra el perfume ideal para ti."
                            className="catalogo-descripcion"
                        />

                    </div>

                </div>

            </section>

            {/* BUSCADOR Y PRODUCTOS */}

            <section className="catalogo-productos">

                <div className="container">

                    <div className="catalogo-herramientas">

                        <div className="catalogo-buscador">

                            <Buscador onBuscar={manejarBusqueda} />

                        </div>

                        <Texto
                            contenido={`${productosFiltrados.length} productos encontrados`}
                            className="catalogo-contador"
                        />

                    </div>

                    <ListaProductos
                        productos={productosFiltrados}
                        onDetalle={verDetalle}
                        onAgregar={agregarAlCarrito}
                    />

                </div>

            </section>

            {/* PIE INFORMATIVO */}

            <section className="catalogo-informacion">

                <div className="container">

                    <Icono nombre="stars" />

                    <Texto
                        contenido="Encuentra tu esencia en Bergen Perfumes."
                    />

                </div>

            </section>

        </div>
    );
}

export default Catalogo;
