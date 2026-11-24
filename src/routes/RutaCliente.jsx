
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function RutaCliente() {

    const { usuario, cargando } = useAuth();
    const location = useLocation();

    // Esperar mientras Spring Boot verifica la sesión
    if (cargando) {
        return (
            <div className="container py-5 text-center">
                <p>Verificando sesión...</p>
            </div>
        );
    }

    // Un invitado debe iniciar sesión para comprar
    if (usuario === null) {
        return (
            <Navigate
                to="/login"
                state={{ desde: location }}
                replace
            />
        );
    }

    // Solo los clientes pueden continuar la compra
    if (usuario.rol !== "CLIENTE") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default RutaCliente;
