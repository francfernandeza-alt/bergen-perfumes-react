
export function validarNombreProducto(nombre) {
    if (nombre.trim().length == 0 || nombre.length > 100) {
        return false;
    }

    return true;
}

export function validarPrecio(precio) {
    if (precio <= 0 || precio % 1 !== 0) {
        return false;
    }

    return true;
}

export function validarStock(stock) {
    if (stock < 0 || stock % 1 !== 0) {
        return false;
    }

    return true;
}

export function validarBusqueda(texto) {
    if (texto.trim().length == 0) {
        return false;
    }

    return true;
}

export function validarMarca(marca) {
    if (marca.trim().length == 0) {
        return false;
    }
    return true;
}