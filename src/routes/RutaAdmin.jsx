
import { Navigate, Outlet } from "react-router-dom";
import { obtenerSesion } from "../scripts/storage/sesionStorage.js";

function RutaAdmin() {

    const sesion = obtenerSesion();

    if (sesion === null) {
        return <Navigate to="/login" replace />;
    }

    if (sesion.rol !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default RutaAdmin;
