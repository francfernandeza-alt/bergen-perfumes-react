
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function RutaAdmin() {

    const { usuario, cargando } = useAuth();

    // Esperar la verificación de sesión con Spring Boot
    if (cargando) {
        return (
            <div className="container py-5 text-center">
                <p>Verificando sesión...</p>
            </div>
        );
    }

    // Usuario sin sesión autenticada
    if (usuario === null) {
        return <Navigate to="/login" replace />;
    }

    // Solo administradores pueden ingresar
    if (usuario.rol !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default RutaAdmin;
