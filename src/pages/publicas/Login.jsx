
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormularioLogin from "../../components/organisms/FormularioLogin";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";
import Mensaje from "../../components/atoms/Mensaje";

import { iniciarSesion } from "../../scripts/storage/usuariosStorage.js";
import { guardarSesion } from "../../scripts/storage/sesionStorage.js";

import "../../styles/pages/Login.css";

function Login() {

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const manejarIngreso = (correo, contrasena) => {

        setError("");

        const usuario = iniciarSesion(correo, contrasena);

        if (usuario === null) {
            setError("Correo o contraseña incorrectos.");
            return;
        }

        guardarSesion(usuario);

        if (usuario.rol === "admin") {
            navigate("/admin");
        } else {
            navigate("/");
        }
    };


    return (
        <div className="login">

            <div className="container">

                <div className="login-contenedor">

                    <Link
                        to="/"
                        className="login-volver"
                    >
                        <Icono nombre="arrow-left" />
                        Volver al inicio
                    </Link>

                    <FormularioLogin
                        onIngresar={manejarIngreso}
                    />

                    {error && (
                        <Mensaje
                            texto={error}
                            variante="danger"
                        />
                    )}

                    <div className="login-informacion">

                        <Icono nombre="shield-check" />

                        <Texto
                            contenido="Tu información está protegida."
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
