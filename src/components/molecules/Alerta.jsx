
import Texto from "../atoms/Texto";
import Icono from "../atoms/Icono";

import "../../styles/molecules/Alerta.css";

const iconos = {
    advertencia: "alert-triangle",
    error: "alert-circle",
    exito: "check-circle",
    informacion: "info"
};

function Alerta({
    mensaje,
    tipo = "informacion",
    titulo = ""
}) {

    if (!mensaje) {
        return null;
    }

    return (
        <div
            className={`alerta alerta--${tipo}`}
            role={tipo === "error" ? "alert" : "status"}
        >

            <div className="alerta-icono" aria-hidden="true">
                <Icono
                    nombre={iconos[tipo] || iconos.informacion}
                />
            </div>

            <div className="alerta-contenido">

                {titulo && (
                    <Texto
                        contenido={titulo}
                        className="alerta-titulo"
                    />
                )}

                <Texto
                    contenido={mensaje}
                    className="alerta-mensaje"
                />

            </div>

        </div>
    );
}

export default Alerta;
