
import ItemCarrito from "./ItemCarrito";
import Texto from "../atoms/Texto";
import Icono from "../atoms/Icono";

import "../../styles/organisms/ListaCarrito.css";

function ListaCarrito({
    productos = [],
    onCambiarCantidad,
    onEliminar
}) {
    return (
        <section className="lista-carrito">

            {productos.length === 0 ? (

                <div className="lista-carrito-vacio">

                    <Icono nombre="cart-x" />

                    <Texto
                        etiqueta="h3"
                        contenido="Tu carrito está vacío"
                    />

                    <Texto
                        contenido="Agrega tus perfumes favoritos para comenzar tu compra."
                    />

                </div>

            ) : (

                <div className="lista-carrito-productos">

                    {productos.map((producto) => (

                        <ItemCarrito
                            key={producto.id}
                            producto={producto}
                            onCambiarCantidad={onCambiarCantidad}
                            onEliminar={onEliminar}
                        />

                    ))}

                </div>

            )}

        </section>
    );
}

export default ListaCarrito;
