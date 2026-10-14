import Boton from "../atoms/Boton";
import "../../styles/molecules/AccionesProducto.css";

function AccionesProducto({
    onDetalle,
    onAgregar,
}) {
    return (
        <div className="acciones-producto">

            <Boton
                texto="Detalle producto"
                variante="blanco"
                onClick={onDetalle}
                className="accion-detalle"
            />

            <Boton
                texto="Agregar al carro"
                variante="marca"
                onClick={onAgregar}
                className="accion-agregar"
            />

        </div>
    );
}

export default AccionesProducto;