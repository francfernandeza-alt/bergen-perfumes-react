
import { Link } from "react-router-dom";

import FormularioLogin from "../../components/organisms/FormularioLogin";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import "../../styles/pages/Login.css";

function Login() {

    const manejarIngreso = (correo, contrasena) => {
        // Pendiente: integrar autenticación real.
        // No mostrar contraseñas en consola.
        console.log("Intento de inicio de sesión:", correo);
    };

    return (
        <div className="login">

            <div className="container">

                <div className="login-contenedor">

                    {/* NAVEGACIÓN */}

                    <Link
                        to="/"
                        className="login-volver"
                    >
                        <Icono nombre="arrow-left" />
                        Volver al inicio
                    </Link>

                    {/* FORMULARIO */}

                    <FormularioLogin
                        onIngresar={manejarIngreso}
                    />

                    {/* INFORMACIÓN ADICIONAL */}

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
