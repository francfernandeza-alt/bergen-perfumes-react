import Boton from "../atoms/Boton";
import Texto from "../atoms/Texto";
import "../../styles/molecules/ControlCantidad.css";

function ControlCantidad({
    cantidad,
    onAumentar,
    onDisminuir,
}) {
    return (
        <div className="control-cantidad">

            <Boton
                texto="-"
                variante="blanco"
                onClick={onDisminuir}
                deshabilitado={cantidad <= 1}
            />

            <Texto
                etiqueta="span"
                contenido={cantidad}
                className="control-cantidad-valor"
            />

            <Boton
                texto="+"
                variante="blanco"
                onClick={onAumentar}
            />

        </div>
    );
}

export default ControlCantidad;