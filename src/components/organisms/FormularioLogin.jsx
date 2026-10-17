
import { useState } from "react";

import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import Texto from "../atoms/Texto";
import Icono from "../atoms/Icono";
import Enlace from "../atoms/Enlace";
import "../../styles/organisms/FormularioLogin.css";
import Mensaje from "../atoms/Mensaje";
import {
    validarCorreoLogin,
    validarContrasenaLogin
} from "../../scripts/validaciones/login";
function FormularioLogin({ onIngresar }) {

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const manejarEnvio = (evento) => {
    evento.preventDefault();
        setError("");
        if (validarCorreoLogin(correo) == false) {
            setError("El correo electrónico no es válido.");
            return;
        }
        if (validarContrasenaLogin(contrasena) == false) {
            setError("Debes ingresar una contraseña.");
            return;
        }
        onIngresar?.(correo, contrasena);
    };

    return (
        <section className="formulario-login">

            <div className="formulario-login-encabezado">

                <div className="formulario-login-icono">
                    <Icono nombre="person-circle" />
                </div>

                <Texto
                    etiqueta="h2"
                    contenido="Bienvenido nuevamente"
                    className="formulario-login-titulo"
                />

                <Texto
                    contenido="Ingresa a tu cuenta de Bergen Perfumes"
                    className="formulario-login-descripcion"
                />

            </div>

            <form onSubmit={manejarEnvio}>

                <CampoFormulario
                    etiqueta="Correo electrónico"
                    tipo="email"
                    nombre="login-correo"
                    placeholder="ejemplo@correo.cl"
                    valor={correo}
                    onChange={(evento) =>
                        setCorreo(evento.target.value)
                    }
                    requerido={true}
                />

                <CampoFormulario
                    etiqueta="Contraseña"
                    tipo="password"
                    nombre="login-contrasena"
                    placeholder="Ingresa tu contraseña"
                    valor={contrasena}
                    onChange={(evento) =>
                        setContrasena(evento.target.value)
                    }
                    requerido={true}
                />
                {error && (
                    <Mensaje
                        texto={error}
                        variante="danger"
                    />
                )}
                <Boton
                    texto="Ingresar"
                    tipo="submit"
                    variante="marca"
                    className="formulario-login-boton"
                />

            </form>

            <div className="formulario-login-registro">

                <Texto contenido="¿No tienes cuenta?" />

                <Enlace
                    texto="Regístrate aquí"
                    href="/registro"
                />

            </div>

        </section>
    );
}

export default FormularioLogin;
