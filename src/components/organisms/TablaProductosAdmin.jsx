
import Imagen from "../atoms/Imagen";
import Boton from "../atoms/Boton";
import Icono from "../atoms/Icono";
import Texto from "../atoms/Texto";
import Mensaje from "../atoms/Mensaje";

import "../../styles/organisms/TablaProductosAdmin.css";

function formatearPrecio(valor) {
    return `$${Number(valor).toLocaleString("es-CL")}`;
}

function TablaProductosAdmin({
    productos = [],
    onEditar,
    onDesactivar,
    puedeAdministrar = true,
    procesandoId = null
}) {

    const confirmarDesactivacion = (producto) => {

        const confirmado = window.confirm(
            `¿Desactivar "${producto.nombre}"? Dejará de mostrarse en el catálogo.`
        );

        if (confirmado) {
            onDesactivar?.(producto);
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
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                {puedeAdministrar && <th>Acciones</th>}
                            </tr>
                        </thead>

                        <tbody>

                            {productos.map((producto) => (

                                <tr key={producto.id}>

                                    <td>
                                        {producto.imagen ? (
                                            <Imagen
                                                src={producto.imagen}
                                                alt={producto.nombre}
                                                className="tabla-productos-admin-imagen"
                                            />
                                        ) : (
                                            <span
                                                className="tabla-productos-admin-sin-imagen"
                                                title="Sin imagen"
                                            >
                                                <Icono nombre="image" />
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        <Texto
                                            contenido={producto.nombre}
                                            className="tabla-productos-admin-nombre"
                                        />

                                        {producto.marca && (
                                            <Texto
                                                contenido={producto.marca}
                                                className="tabla-productos-admin-marca"
                                            />
                                        )}
                                    </td>

                                    <td>
                                        {producto.categoria ?? "—"}
                                    </td>

                                    <td>
                                        {producto.precioOferta != null ? (
                                            <>
                                                <Texto
                                                    contenido={formatearPrecio(producto.precioOferta)}
                                                    className="tabla-productos-admin-precio"
                                                />
                                                <del className="tabla-productos-admin-precio-normal">
                                                    {formatearPrecio(producto.precio)}
                                                </del>
                                            </>
                                        ) : (
                                            <Texto
                                                contenido={formatearPrecio(producto.precio)}
                                                className="tabla-productos-admin-precio"
                                            />
                                        )}
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
                                        <div className="tabla-productos-admin-estado">
                                            <span
                                                className={
                                                    producto.activo
                                                        ? "badge bg-secondary"
                                                        : "badge bg-light text-dark"
                                                }
                                            >
                                                {producto.activo ? "Activo" : "Inactivo"}
                                            </span>

                                            {producto.destacado && (
                                                <span className="badge bg-warning text-dark">
                                                    Destacado
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {puedeAdministrar && (
                                        <td>

                                            <div className="tabla-productos-admin-acciones">

                                                <Boton
                                                    texto="Editar"
                                                    variante="outline-primary"
                                                    deshabilitado={procesandoId === producto.id}
                                                    onClick={() =>
                                                        onEditar?.(producto)
                                                    }
                                                />

                                                <Boton
                                                    texto={
                                                        procesandoId === producto.id
                                                            ? "Desactivando..."
                                                            : "Desactivar"
                                                    }
                                                    variante="outline-danger"
                                                    deshabilitado={procesandoId === producto.id}
                                                    onClick={() =>
                                                        confirmarDesactivacion(producto)
                                                    }
                                                />

                                            </div>

                                        </td>
                                    )}

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
