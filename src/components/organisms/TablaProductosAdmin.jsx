
import Imagen from "../atoms/Imagen";
import Boton from "../atoms/Boton";
import Icono from "../atoms/Icono";
import Texto from "../atoms/Texto";
import Mensaje from "../atoms/Mensaje";

import "../../styles/organisms/TablaProductosAdmin.css";

function TablaProductosAdmin({
    productos = [],
    onEditar,
    onEliminar
}) {

    const confirmarEliminacion = (producto) => {

        const confirmado = window.confirm(
            `¿Estás seguro de eliminar "${producto.nombre}"?`
        );

        if (confirmado) {
            onEliminar?.(producto.id);
        }
    };

    return (
        <section className="tabla-productos-admin">

            <div className="tabla-productos-admin-encabezado">

                <div className="tabla-productos-admin-titulo">

                    <Icono nombre="boxes" />

                    <Texto
                        etiqueta="h2"
                        contenido="Administración de productos"
                    />

                </div>

                <Texto
                    contenido={`Total de productos: ${productos.length}`}
                    className="tabla-productos-admin-total"
                />

            </div>

            {productos.length === 0 ? (

                <Mensaje
                    texto="No hay productos registrados."
                    variante="info"
                />

            ) : (

                <div className="table-responsive">

                    <table className="table align-middle tabla-productos-admin-tabla">

                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {productos.map((producto) => (

                                <tr key={producto.id}>

                                    <td>
                                        <Imagen
                                            src={producto.imagen}
                                            alt={producto.nombre}
                                            className="tabla-productos-admin-imagen"
                                        />
                                    </td>

                                    <td>
                                        <Texto
                                            contenido={producto.nombre}
                                            className="tabla-productos-admin-nombre"
                                        />
                                    </td>

                                    <td>
                                        <Texto
                                            contenido={`${producto.precio} Esmeraldas`}
                                            className="tabla-productos-admin-precio"
                                        />
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                producto.stock > 0
                                                    ? "badge bg-success"
                                                    : "badge bg-danger"
                                            }
                                        >
                                            {producto.stock > 0
                                                ? `${producto.stock} disponibles`
                                                : "Sin stock"}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="tabla-productos-admin-acciones">

                                            <Boton
                                                texto="Editar"
                                                variante="outline-primary"
                                                onClick={() =>
                                                    onEditar?.(producto)
                                                }
                                            />

                                            <Boton
                                                texto="Eliminar"
                                                variante="outline-danger"
                                                onClick={() =>
                                                    confirmarEliminacion(producto)
                                                }
                                            />

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </section>
    );
}

export default TablaProductosAdmin;
