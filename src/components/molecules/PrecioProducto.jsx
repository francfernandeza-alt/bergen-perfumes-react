import Texto from "../atoms/Texto";
import "../../styles/molecules/PrecioProducto.css";

function PrecioProducto({
    precio,
    precioAnterior,
}) {
    return (
        <div className="precio-producto">

            {precioAnterior != null && precioAnterior > precio && (
                <Texto
                    etiqueta="span"
                    contenido={`$${precioAnterior.toLocaleString("es-CL")}`}
                    className="precio-anterior"
                />
            )}

            <Texto
                etiqueta="span"
                contenido={`$${precio.toLocaleString("es-CL")}`}
                className="precio-actual"
            />

        </div>
    );
}

export default PrecioProducto;