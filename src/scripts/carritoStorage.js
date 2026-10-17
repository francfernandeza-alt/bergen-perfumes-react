
import {
    obtenerProductoPorId
} from "./storage";

const CLAVE_CARRITO = "bergen_carrito";

// Obtener los productos guardados en el carrito.
export function obtenerCarrito() {
    try {
        const guardados = localStorage.getItem(CLAVE_CARRITO);

        if (!guardados) {
            return [];
        }

        const carrito = JSON.parse(guardados);

        if (!Array.isArray(carrito)) {
            return [];
        }

        // Obtener los datos actuales de cada producto.
        return carrito.flatMap((item) => {
            const producto = obtenerProductoPorId(item.id);

            if (!producto) {
                return [];
            }

            const cantidad = Math.min(
                item.cantidad,
                producto.stock
            );

            if (
                !Number.isInteger(cantidad) ||
                cantidad < 1
            ) {
                return [];
            }

            return [{
                ...producto,
                cantidad
            }];
        });
    } catch (error) {
        console.error("Error al leer el carrito:", error);
        return [];
    }
}

// Guardar únicamente ID y cantidad.
function guardarCarrito(productos) {
    const datos = productos.map((producto) => ({
        id: producto.id,
        cantidad: producto.cantidad
    }));

    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(datos)
    );
}

// Agregar un producto al carrito.
export function agregarAlCarrito(id, cantidad = 1) {
    const producto = obtenerProductoPorId(id);

    if (!producto || producto.stock < 1) {
        return false;
    }

    if (
        !Number.isInteger(cantidad) ||
        cantidad < 1
    ) {
        return false;
    }

    const carrito = obtenerCarrito();

    const existente = carrito.find(
        (item) => item.id === producto.id
    );

    const cantidadActual = existente
        ? existente.cantidad
        : 0;

    if (cantidadActual + cantidad > producto.stock) {
        return false;
    }

    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            ...producto,
            cantidad
        });
    }

    guardarCarrito(carrito);

    return true;
}

// Cambiar la cantidad de un producto.
export function cambiarCantidadCarrito(
    id,
    nuevaCantidad
) {
    const producto = obtenerProductoPorId(id);

    if (
        !producto ||
        !Number.isInteger(nuevaCantidad) ||
        nuevaCantidad < 1 ||
        nuevaCantidad > producto.stock
    ) {
        return false;
    }

    const carrito = obtenerCarrito();

    const existente = carrito.find(
        (item) => item.id === Number(id)
    );

    if (!existente) {
        return false;
    }

    existente.cantidad = nuevaCantidad;

    guardarCarrito(carrito);

    return true;
}

// Eliminar un producto del carrito.
export function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito();

    const productosActualizados = carrito.filter(
        (producto) => producto.id !== Number(id)
    );

    if (productosActualizados.length === carrito.length) {
        return false;
    }

    guardarCarrito(productosActualizados);

    return true;
}
