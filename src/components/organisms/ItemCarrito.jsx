
import Imagen from "../atoms/Imagen";
import Texto from "../atoms/Texto";
import Boton from "../atoms/Boton";
import Icono from "../atoms/Icono";
import ControlCantidad from "../molecules/ControlCantidad";

import "../../styles/organisms/ItemCarrito.css";

function ItemCarrito({
    producto,
    onCambiarCantidad,
    onEliminar
}) {
    const subtotal = producto.precio * producto.cantidad;

    const aumentarCantidad = () => {
        onCambiarCantidad?.(
            producto.id,
            producto.cantidad + 1
        );
    };

    const disminuirCantidad = () => {
        if (producto.cantidad > 1) {
            onCambiarCantidad?.(
                producto.id,
                producto.cantidad - 1
            );
        }
    };

    return (
        <article className="item-carrito">

            {/* IMAGEN */}
            <div className="item-carrito-imagen">

                <Imagen
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="img-fluid"
                />

            </div>

            {/* INFORMACIÓN */}
            <div className="item-carrito-contenido">

                <div className="item-carrito-encabezado">

                    <Texto
                        etiqueta="h3"
                        contenido={producto.nombre}
                        className="item-carrito-nombre"
                    />

                    <Boton
                        texto="Eliminar"
                        variante="outline-danger"
                        className="item-carrito-eliminar"
                        onClick={() => onEliminar?.(producto.id)}
                    />

                </div>

                <div className="item-carrito-precio">

                    <Texto
                        contenido="Precio unitario"
                        className="item-carrito-etiqueta"
                    />

                    <Texto
                        contenido={`${producto.precio} Esmeraldas`}
                        className="item-carrito-valor"
                    />

                </div>

                {/* CONTROL DE CANTIDAD */}
                <div className="item-carrito-cantidad">

                    <Texto
                        contenido="Cantidad"
                        className="item-carrito-etiqueta"
                    />

                    <ControlCantidad
                        cantidad={producto.cantidad}
                        onAumentar={aumentarCantidad}
                        onDisminuir={disminuirCantidad}
                    />

                </div>

                {/* SUBTOTAL */}
                <div className="item-carrito-subtotal">

                    <Texto
                        contenido="Subtotal"
                        className="item-carrito-etiqueta"
                    />

                    <Texto
                        contenido={`${subtotal} Esmeraldas`}
                        className="item-carrito-total"
                    />

                </div>

            </div>

        </article>
    );
}

export default ItemCarrito;
