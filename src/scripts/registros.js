export function validarCorreo(correo) {
    if (correo.length == 0 || correo.length > 100) {
        return false;
    }
    if (correo.includes("@") && (correo.endsWith(".com") || correo.endsWith(".cl"))) {
        return true;
    } else {
        return false;
    }
}

export function validarContrasena(clave) {
    if (clave.length !== 8 || clave == clave.toLowerCase() || clave == clave.toUpperCase()) {
        return false;
    }
    return true;
}

export function validarConfirmacionContrasena(clave, clave2) {
    if (clave !== clave2) {
        return false;
    }
    return true;
}

export function validarNombre(nombre) {
    if (nombre.length < 2 || nombre.length > 50) {
        return false;
    }
    return true;
}

export function validarApellidos(apellidos) {
    if (apellidos.length < 2 || apellidos.length > 100) {
        return false;
    }
    return true;
}


export function validarRut(rut) {
    rut = rut.trim();
    if (rut.length < 7 || rut.length > 9) {
        return false;
    }
    if (rut.indexOf(".") !== -1 || rut.indexOf("-") !== -1) {
        return false;
    }
    return true;
}


export function validarDireccion(direccion) {
    if (direccion.length == 0 || direccion.length > 100) {
        return false;
    }
    return true;
}
