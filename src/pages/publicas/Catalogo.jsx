
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ListaProductos from "../../components/organisms/ListaProductos";
import Buscador from "../../components/molecules/Buscador";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import { obtenerProductos } from "../../scripts/storage/storage";
import { agregarAlCarrito } from "../../scripts/storage/carritoStorage";

import "../../styles/pages/Catalogo.css";

function Catalogo() {

    const navigate = useNavigate();

    const [productos] = useState(() => obtenerProductos());

    const [busqueda, setBusqueda] = useState("");

    const [marcaSeleccionada, setMarcaSeleccionada] = useState("");

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

    const marcasDisponibles = [
        ...new Set(
            productos
                .map((producto) => producto.marca)
                .filter(Boolean)
        )
    ].sort();

    const categoriasDisponibles = [
        ...new Set(
            productos
                .map((producto) => producto.categoria)
                .filter(Boolean)
        )
    ].sort();

    const manejarBusqueda = (texto) => {
        setBusqueda(texto);
    };

    const productosFiltrados = productos.filter((producto) => {
        const coincideNombre = producto.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase().trim());

        const coincideMarca =
            marcaSeleccionada === "" ||
            producto.marca === marcaSeleccionada;

        const coincideCategoria =
            categoriaSeleccionada === "" ||
            producto.categoria === categoriaSeleccionada;

        return coincideNombre && coincideMarca && coincideCategoria;

    });

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
        <div className="catalogo">

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

            <section className="catalogo-productos">

                <div className="container">

                    <div className="catalogo-herramientas">

                        <div className="catalogo-buscador">

                            <Buscador onBuscar={manejarBusqueda} />

                        </div>
                        
                        <div className="catalogo-marcas">
                            <select
                                className="form-select"
                                value={marcaSeleccionada}
                                onChange={(evento) =>
                                    setMarcaSeleccionada(evento.target.value)
                                }
                            >
                                <option value="">Todas las marcas</option>

                                {marcasDisponibles.map((marca) => (
                                    <option key={marca} value={marca}>
                                        {marca}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="catalogo-categorias">
                            <select
                                className="form-select"
                                value={categoriaSeleccionada}
                                onChange={(evento) =>
                                    setCategoriaSeleccionada(evento.target.value)
                                }
                            >
                                <option value="">Todas las categorías</option>

                                {categoriasDisponibles.map((categoria) => (
                                    <option key={categoria} value={categoria}>
                                        {categoria}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Texto
                            contenido={`${productosFiltrados.length} productos encontrados`}
                            className="catalogo-contador"
                        />

                    </div>

                    <ListaProductos
                        productos={productosFiltrados}
                        onDetalle={verDetalle}
                        onAgregar={manejarAgregarAlCarrito}
                    />

                </div>

            </section>

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
