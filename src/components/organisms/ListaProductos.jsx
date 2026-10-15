
import TarjetaProducto from "./TarjetaProducto";
import Mensaje from "../atoms/Mensaje";

import "../../styles/organisms/ListaProductos.css";

function ListaProductos({
    productos = [],
    onDetalle,
    onAgregar
}) {
    return (
        <section className="lista-productos">

            {productos.length === 0 ? (

                <Mensaje
                    texto="No se encontraron productos disponibles."
                    variante="info"
                />

            ) : (

                <div className="row g-4">

                    {productos.map((producto) => (

                        <div
                            className="col-12 col-xl-6"
                            key={producto.id}
                        >
                            <TarjetaProducto
                                producto={producto}
                                onDetalle={onDetalle}
                                onAgregar={onAgregar}
                            />
                        </div>

                    ))}

                </div>

            )}

        </section>
    );
}

export default ListaProductos;
