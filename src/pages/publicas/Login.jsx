
import { useState } from "react";
import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";

import FormularioLogin from "../../components/organisms/FormularioLogin";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";
import Mensaje from "../../components/atoms/Mensaje";

import { useAuth } from "../../context/AuthContext.jsx";

import "../../styles/pages/Login.css";

function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    const { ingresar } = useAuth();

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    // Página que el visitante intentaba abrir
    const desde = location.state?.desde;

    const manejarIngreso = async (correo, contrasena) => {

        setError("");
        setCargando(true);

        try {
            const usuario = await ingresar(correo, contrasena);

            if (usuario.rol === "ADMIN") {
                navigate("/admin", { replace: true });

            } else if (usuario.rol === "CLIENTE") {

                const destino = desde
                    ? `${desde.pathname}${desde.search || ""}${desde.hash || ""}`
                    : "/";

                navigate(destino, { replace: true });

            } else {
                navigate("/", { replace: true });
            }

        } catch (error) {
            setError(
                error.message ||
                "No se pudo iniciar sesión."
            );
        } finally {
            setCargando(false);
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
                        cargando={cargando}
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
