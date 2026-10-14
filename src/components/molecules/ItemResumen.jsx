import Texto from "../atoms/Texto";
import "../../styles/molecules/ItemResumen.css";

function ItemResumen({
    nombre,
    cantidad,
    precio,
}) {
    const subtotal = cantidad * precio;

    return (
        <div className="item-resumen">

            <div className="item-resumen-informacion">
                <Texto
                    etiqueta="span"
                    contenido={nombre}
                    className="item-resumen-nombre"
                />

                <Texto
                    etiqueta="span"
                    contenido={`Precio unitario: ${precio} esmeraldas`}
                    className="item-resumen-precio"
                />
            </div>

            <Texto
                etiqueta="span"
                contenido={`Cantidad: ${cantidad}`}
                className="item-resumen-cantidad"
            />

            <Texto
                etiqueta="span"
                contenido={`${subtotal} esmeraldas`}
                className="item-resumen-subtotal"
            />

        </div>
    );
}

export default ItemResumen;