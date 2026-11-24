
import {
    obtenerTokenCsrf
} from "./autenticacionService.js";

const API_URL = `${import.meta.env.VITE_API_URL}/carrito`;

// Adaptar un artículo del backend al formato de React
function adaptarItemCarrito(item) {
    return {
        id: item.idProducto,
        nombre: item.nombre,
        marca: item.marca,
        imagen: item.imagen,
        precio: Number(item.precio),
        precioAnterior: item.precioAnterior != null
            ? Number(item.precioAnterior)
            : null,
        stock: item.stock,
        cantidad: item.cantidad,
        subtotal: Number(item.subtotal)
    };
}

// Adaptar la respuesta completa del carrito
function adaptarCarrito(carrito) {
    return {
        idCarrito: carrito.idCarrito,
        productos: carrito.items.map(adaptarItemCarrito),
        cantidadTotal: carrito.cantidadTotal,
        subtotal: Number(carrito.subtotal),
        total: Number(carrito.total)
    };
}

// Procesar respuestas de error del backend
async function verificarRespuesta(respuesta) {

    if (respuesta.status === 401 ||
        respuesta.status === 403) {
        throw new Error(
            "Debes iniciar sesión para utilizar tu carrito."
        );
    }

    if (!respuesta.ok) {
        let mensaje = "No se pudo completar la operación.";

        try {
            const datos = await respuesta.json();

            mensaje = datos.mensaje ||
                datos.message ||
                mensaje;
        } catch {
            // Mantener el mensaje general
        }

        throw new Error(mensaje);
    }

    return respuesta.json();
}

// Obtener el carrito del cliente autenticado
export async function obtenerCarritoAPI() {

    const respuesta = await fetch(API_URL, {
        method: "GET",
        credentials: "include"
    });

    return adaptarCarrito(
        await verificarRespuesta(respuesta)
    );
}

// Agregar un producto al carrito
export async function agregarAlCarritoAPI(
    idProducto,
    cantidad = 1,
    idUsuarioEsperado = null
) {

    const tokenCsrf = await obtenerTokenCsrf();

    const headers = {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": tokenCsrf
    };

    if (idUsuarioEsperado !== null) {
        headers["X-Usuario-Esperado"] =
            String(idUsuarioEsperado);
    }

    const respuesta = await fetch(
        `${API_URL}/productos/${idProducto}`,
        {
            method: "POST",
            credentials: "include",
            headers,
            body: JSON.stringify({
                cantidad
            })
        }
    );

    return adaptarCarrito(
        await verificarRespuesta(respuesta)
    );
}

// Cambiar la cantidad de un producto
export async function cambiarCantidadCarritoAPI(
    idProducto,
    nuevaCantidad
) {

    const tokenCsrf = await obtenerTokenCsrf();

    const respuesta = await fetch(
        `${API_URL}/productos/${idProducto}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": tokenCsrf
            },
            body: JSON.stringify({
                cantidad: nuevaCantidad
            })
        }
    );

    return adaptarCarrito(
        await verificarRespuesta(respuesta)
    );
}

// Eliminar un producto del carrito
export async function eliminarDelCarritoAPI(idProducto) {

    const tokenCsrf = await obtenerTokenCsrf();

    const respuesta = await fetch(
        `${API_URL}/productos/${idProducto}`,
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-XSRF-TOKEN": tokenCsrf
            }
        }
    );

    return adaptarCarrito(
        await verificarRespuesta(respuesta)
    );
}

// Vaciar el carrito completo
export async function vaciarCarritoAPI() {

    const tokenCsrf = await obtenerTokenCsrf();

    const respuesta = await fetch(API_URL, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "X-XSRF-TOKEN": tokenCsrf
        }
    });

    if (respuesta.status === 204) {
        return null;
    }

    return adaptarCarrito(
        await verificarRespuesta(respuesta)
    );
}
