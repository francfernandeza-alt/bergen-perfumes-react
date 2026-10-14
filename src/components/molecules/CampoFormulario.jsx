import Etiqueta from "../atoms/Etiqueta";
import Input from "../atoms/Input";
import "../../styles/molecules/CampoFormulario.css";

function CampoFormulario({
    etiqueta,
    tipo = "text",
    nombre,
    placeholder = "",
    valor,
    onChange,
    requerido = false,
    deshabilitado = false,
}) {
    return (
        <div className="campo-formulario">
            <Etiqueta
                texto={etiqueta}
                htmlFor={nombre}
            />

            <Input
                tipo={tipo}
                nombre={nombre}
                id={nombre}
                placeholder={placeholder}
                valor={valor}
                onChange={onChange}
                requerido={requerido}
                deshabilitado={deshabilitado}
            />
        </div>
    );
}

export default CampoFormulario;