import { validarNombre, validarCorreo } from "./registros";

export function validarNombreContacto(nombre) {
    return validarNombre(nombre);
}

export function validarCorreoContacto(correo) {
    return validarCorreo(correo);
}

export function validarMensajeContacto(mensaje) {
    if (mensaje.trim().length == 0 || mensaje.length > 500) {
        return false;
    }

    return true;
}
