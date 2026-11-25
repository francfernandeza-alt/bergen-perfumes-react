
const API_URL = import.meta.env.VITE_API_URL
    || "http://localhost:8081/api/v2";

export async function obtenerTokenCsrf() {
    const respuesta = await fetch(
        `${API_URL}/autenticacion/csrf`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    if (!respuesta.ok) {
        throw new Error(
            "No se pudo obtener el token de seguridad."
        );
    }

    const datos = await respuesta.json();

    return datos.token;
}

export async function registrarUsuario(datosUsuario) {
    const tokenCsrf = await obtenerTokenCsrf();

    const respuesta = await fetch(
        `${API_URL}/autenticacion/registro`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": tokenCsrf
            },
            body: JSON.stringify({
                rut: datosUsuario.rut,
                nombre: datosUsuario.nombre,
                apellidos: datosUsuario.apellidos,
                correo: datosUsuario.correo,
                contrasena: datosUsuario.contrasena
            })
        }
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            resultado.mensaje
            || "No se pudo crear la cuenta."
        );
    }

    return resultado;
}

export async function iniciarSesion(correo, contrasena) {
    const tokenCsrf = await obtenerTokenCsrf();

    const respuesta = await fetch(
        `${API_URL}/autenticacion/login`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": tokenCsrf
            },
            body: JSON.stringify({
                correo,
                contrasena
            })
        }
    );

    if (!respuesta.ok) {
        if (respuesta.status === 401) {
            throw new Error(
                "Correo o contraseña incorrectos."
            );
        }

        throw new Error(
            "No se pudo iniciar sesión. Inténtalo nuevamente."
        );
    }

    return await respuesta.json();
}


export async function obtenerSesionActual() {
    const respuesta = await fetch(
        `${API_URL}/autenticacion/sesion`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    if (respuesta.status === 401 ||
        respuesta.status === 403) {
        return null;
    }

    if (!respuesta.ok) {
        throw new Error(
            "No se pudo comprobar la sesión."
        );
    }

    return await respuesta.json();
}

export async function cerrarSesionActual() {
    const tokenCsrf = await obtenerTokenCsrf();

    const respuesta = await fetch(
        `${API_URL}/autenticacion/logout`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "X-XSRF-TOKEN": tokenCsrf
            }
        }
    );

    if (!respuesta.ok) {
        throw new Error(
            "No se pudo cerrar la sesión."
        );
    }
}

