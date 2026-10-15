
import Imagen from "../atoms/Imagen";
import Texto from "../atoms/Texto";
import PrecioProducto from "../molecules/PrecioProducto";
import AccionesProducto from "../molecules/AccionesProducto";

import "../../styles/organisms/TarjetaProducto.css";

function TarjetaProducto({ producto, onDetalle, onAgregar }) {

    const tieneOferta =
        producto.precioAnterior != null &&
        producto.precioAnterior > producto.precio;

    return (
        <article className="tarjeta-producto">

            {/* IMAGEN DEL PERFUME */}
            <div className="tarjeta-producto-imagen">

                {tieneOferta && (
                    <span className="tarjeta-producto-oferta">
                        Oferta
                    </span>
                )}

                <Imagen
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="img-fluid"
                />

            </div>

            {/* INFORMACIÓN DEL PERFUME */}
            <div className="tarjeta-producto-contenido">

                <Texto
                    etiqueta="h3"
                    contenido={producto.nombre}
                    className="tarjeta-producto-nombre"
                />

                <PrecioProducto
                    precio={producto.precio}
                    precioAnterior={producto.precioAnterior}
                />

                <Texto
                    contenido={producto.descripcion}
                    className="tarjeta-producto-descripcion"
                />

                <div className="tarjeta-producto-separador"></div>

                <AccionesProducto
                    onDetalle={() => onDetalle?.(producto.id)}
                    onAgregar={() => onAgregar?.(producto.id)}
                />

            </div>

        </article>
    );
}

export default TarjetaProducto;
