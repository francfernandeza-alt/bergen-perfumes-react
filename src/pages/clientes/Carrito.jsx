
import { Link, useNavigate } from "react-router-dom";

import ListaCarrito from "../../components/organisms/ListaCarrito";
import ResumenCompra from "../../components/organisms/ResumenCompra";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";
import Alerta from "../../components/molecules/Alerta";

import { useCarrito } from "../../context/CarritoContext.jsx";

import "../../styles/pages/Carrito.css";

function Carrito() {

    const navigate = useNavigate();

    const {
        productos,
        cargando,
        error,
        avisoSincronizacion,
        cambiarCantidad: cambiarCantidadContexto,
        eliminarProducto: eliminarProductoContexto
    } = useCarrito();

    const cambiarCantidad = async (id, nuevaCantidad) => {

        try {
            const actualizado = await cambiarCantidadContexto(
                id,
                nuevaCantidad
            );

            if (!actualizado) {
                alert(
                    "No se pudo cambiar la cantidad. Revisa el stock disponible."
                );
            }

        } catch (error) {
            console.error(
                "Error al cambiar cantidad:",
                error
            );

            alert(error.message);
        }
    };

    const eliminarProducto = async (id) => {

        try {
            const eliminado = await eliminarProductoContexto(id);

            if (!eliminado) {
                alert("No se pudo eliminar el producto.");
            }

        } catch (error) {
            console.error(
                "Error al eliminar producto:",
                error
            );

            alert(error.message);
        }
    };

    const procederAlPago = () => {

        if (productos.length === 0) {
            return;
        }

        navigate("/envio");
    };

    return (
        <div className="carrito">

            <div className="container">

                <div className="carrito-encabezado">

                    <Texto
                        etiqueta="h1"
                        contenido="Mi carrito"
                        className="carrito-titulo"
                    />

                    <Texto
                        contenido="Revisa los productos de tu compra."
                        className="carrito-descripcion"
                    />

                </div>

                <Link
                    to="/catalogo"
                    className="carrito-volver"
                >
                    <Icono nombre="arrow-left" />
                    Continuar comprando
                </Link>

                {!cargando && !error && avisoSincronizacion && (

                    <Alerta
                        tipo="advertencia"
                        titulo="Aviso de sincronización del carrito"
                        mensaje={avisoSincronizacion}
                    />

                )}

                {cargando ? (

                    <Texto contenido="Cargando carrito..." />

                ) : error ? (

                    <Texto contenido={error} />

                ) : (

                    <div className="carrito-contenido">

                        <div className="carrito-listado">

                            <ListaCarrito
                                productos={productos}
                                onCambiarCantidad={cambiarCantidad}
                                onEliminar={eliminarProducto}
                            />

                        </div>

                        <div className="carrito-resumen">

                            <ResumenCompra
                                productos={productos}
                                onPagar={procederAlPago}
                            />

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Carrito;
