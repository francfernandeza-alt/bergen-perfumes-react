export function validarCampoObligatorio(valor) {
    if (typeof valor !== "string" || valor.trim().length == 0) {
        return false;
    }

    return true;
}

export function validarTelefono(telefono) {
    const numero = telefono.replaceAll(" ", "").replaceAll("-", "");

    if (!/^(\+56)?9[0-9]{8}$/.test(numero)) {
        return false;
    }

    return true;
}