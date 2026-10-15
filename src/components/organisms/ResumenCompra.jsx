
import Texto from "../atoms/Texto";
import Boton from "../atoms/Boton";
import Icono from "../atoms/Icono";
import Mensaje from "../atoms/Mensaje";
import ItemResumen from "../molecules/ItemResumen";

import "../../styles/organisms/ResumenCompra.css";

function ResumenCompra({
    productos = [],
    onPagar,
    mostrarBoton = true
}) {
    const totalProductos = productos.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    const totalCompra = productos.reduce(
        (total, producto) =>
            total + producto.precio * producto.cantidad,
        0
    );

    return (
        <section className="resumen-compra">

            <div className="resumen-compra-encabezado">

                <Texto
                    etiqueta="h2"
                    contenido="Resumen de compra"
                    className="resumen-compra-titulo"
                />

                <Icono nombre="bag-check" />

            </div>

            <div className="resumen-compra-linea"></div>

            {productos.length === 0 ? (

                <Mensaje
                    texto="Tu carrito está vacío."
                    variante="info"
                />

            ) : (

                <>
                    <div className="resumen-compra-lista">

                        {productos.map((producto) => (

                            <ItemResumen
                                key={producto.id}
                                nombre={producto.nombre}
                                precio={producto.precio}
                                cantidad={producto.cantidad}
                            />

                        ))}

                    </div>

                    <div className="resumen-compra-totales">

                        <div className="resumen-compra-fila">

                            <Texto
                                contenido="Total de productos"
                            />

                            <Texto
                                contenido={totalProductos}
                            />

                        </div>

                        <div className="resumen-compra-fila resumen-compra-total">

                            <Texto
                                contenido="Total a pagar"
                            />

                            <Texto
                                contenido={`${totalCompra} Esmeraldas`}
                            />

                        </div>

                    </div>

                    {mostrarBoton && (

                        <Boton
                            texto="Proceder al pago"
                            variante="marca"
                            className="resumen-compra-boton"
                            onClick={onPagar}
                        />

                    )}

                </>

            )}

        </section>
    );
}

export default ResumenCompra;
