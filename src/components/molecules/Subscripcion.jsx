import { useState } from "react";
import Input from "../atoms/Input";
import Boton from "../atoms/Boton";
import "../../styles/molecules/Subscripcion.css";
import { validarCorreo } from "../../scripts/validaciones/registros";
function Subscripcion({ onSuscribir }) {
    const [correo, setCorreo] = useState("");

    const manejarEnvio = (evento) => {
        evento.preventDefault();

        if (validarCorreo(correo.trim()) == false) {
            return;
        }

        onSuscribir(correo);
        setCorreo("");
    };

    return (
        <form
            className="subscripcion"
            onSubmit={manejarEnvio}
        >
            <Input
                tipo="email"
                nombre="correo-subscripcion"
                id="correo-subscripcion"
                placeholder="Ingresa tu correo electrónico"
                valor={correo}
                onChange={(evento) => setCorreo(evento.target.value)}
                requerido={true}
            />

            <Boton
                texto="Subscribirme"
                tipo="submit"
                variante="marca"
            />
        </form>
    );
}

export default Subscripcion;