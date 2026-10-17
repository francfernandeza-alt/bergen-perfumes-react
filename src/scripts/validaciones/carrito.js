
export function validarCantidad(cantidad) {
    if (cantidad < 1) {
        return false;
    }

    if (cantidad % 1 !== 0) {
        return false;
    }

    return true;
}