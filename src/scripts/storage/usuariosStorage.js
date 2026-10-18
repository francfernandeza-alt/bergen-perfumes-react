
const CLAVE_USUARIOS = "bergen_usuarios";

export function obtenerUsuarios() {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);

    if (guardados === null) {
        return [];
    }

    try {
        const usuarios = JSON.parse(guardados);

        if (!Array.isArray(usuarios)) {
            return [];
        }

        return usuarios;
    } catch (error) {
        return [];
    }
}


export function crearUsuario(datos) {
    const usuarios = obtenerUsuarios();

    const {
        rut,
        nombre,
        apellidos,
        correo,
        contrasena,
        direccion
    } = datos;

    if (
        !rut ||
        !nombre ||
        !apellidos ||
        !correo ||
        !contrasena ||
        !direccion
    ) {
        return false;
    }

    const correoNormalizado = correo.trim().toLowerCase();

    if (
        nombre.trim() === "" ||
        !correoNormalizado.includes("@") ||
        contrasena.length < 8
    ) {
        return false;
    }

    const existe = usuarios.find(
        (usuario) => usuario.correo === correoNormalizado
    );

    if (existe) {
        return false;
    }

    const nuevoId = usuarios.reduce(
        (mayor, usuario) => Math.max(mayor, usuario.id),
        0
    ) + 1;

    const nuevoUsuario = {
        id: nuevoId,
        rut: rut.trim(),
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        correo: correoNormalizado,
        contrasena: contrasena,
        direccion: direccion.trim(),
        rol: "cliente"
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify(usuarios)
    );

    return true;
}

export function iniciarSesion(correo, contrasena) {
    if (
        typeof correo !== "string" ||
        typeof contrasena !== "string"
    ) {
        return null;
    }

    const usuarios = obtenerUsuarios();

    const correoNormalizado = correo.trim().toLowerCase();

    const usuario = usuarios.find(
        (usuario) =>
            usuario.correo === correoNormalizado &&
            usuario.contrasena === contrasena
    );

    if (!usuario) {
        return null;
    }

    return {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
    };
}

export function crearAdministradorDemo(nombre, correo, contrasena) {
    const usuarios = obtenerUsuarios();

    if (
        typeof nombre !== "string" ||
        typeof correo !== "string" ||
        typeof contrasena !== "string"
    ) {
        return false;
    }

    const correoNormalizado = correo.trim().toLowerCase();

    if (
        nombre.trim() === "" ||
        !correoNormalizado.includes("@") ||
        !correoNormalizado.endsWith(".com") ||
        contrasena.length < 8
    ) {
        return false;
    }

    const existe = usuarios.find(
        (usuario) => usuario.correo === correoNormalizado
    );

    if (existe) {
        return false;
    }

    const nuevoId = usuarios.reduce(
        (mayor, usuario) => Math.max(mayor, usuario.id),
        0
    ) + 1;

    const administrador = {
        id: nuevoId,
        nombre: nombre.trim(),
        correo: correoNormalizado,
        contrasena: contrasena,
        rol: "admin"
    };

    usuarios.push(administrador);

    localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify(usuarios)
    );

    return true;
}


