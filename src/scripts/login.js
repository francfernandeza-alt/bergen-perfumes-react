import { validarCorreo } from "./registros";

export function validarCorreoLogin(correo) {
    return validarCorreo(correo);
}

export function validarContrasenaLogin(contrasena) {
    if (contrasena.length == 0) {
        return false;
    }
    return true;
}
