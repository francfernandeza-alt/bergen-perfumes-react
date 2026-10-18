
const CLAVE_SESION = "bergen_sesion";

export function guardarSesion(usuario) {
    if (!usuario) {
        return false;
    }

    const sesion = {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
    };

    localStorage.setItem(
        CLAVE_SESION,
        JSON.stringify(sesion)
    );

    return true;
}

export function obtenerSesion() {
    const guardada = localStorage.getItem(CLAVE_SESION);

    if (guardada === null) {
        return null;
    }

    try {
        const sesion = JSON.parse(guardada);

        if (
            !sesion ||
            !Number.isInteger(sesion.id) ||
            (sesion.rol !== "admin" && sesion.rol !== "cliente")
        ) {
            return null;
        }

        return sesion;
    } catch (error) {
        return null;
    }
}

export function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}
