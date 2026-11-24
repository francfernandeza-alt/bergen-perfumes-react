import {
    obtenerCarritoPendiente,
    eliminarProductoPendiente
} from "../scripts/storage/carritoStorage.js";

import {
    agregarAlCarritoAPI
} from "./carritoService.js";

import {
    obtenerProductoPorIdAPI
} from "./productoService.js";

// Sincronizar los productos pendientes del cliente
export async function sincronizarCarritoInvitado(
    carritoCliente,
    idUsuario,
    sesionVigente
) {

    const carritoPendiente =
        obtenerCarritoPendiente(idUsuario);

    let carritoActual = carritoCliente;

    const ajustesStock = [];

    let errorSincronizacion = false;

    for (const item of carritoPendiente) {

        if (!sesionVigente()) {
            break;
        }

        // Identificar operaciones cuyo resultado no fue confirmado
        const claveOperacion =
            `bergen_sync_${idUsuario}_${item.id}`;

        if (localStorage.getItem(claveOperacion)) {

            errorSincronizacion = true;

            continue;
        }

        try {

            // Buscar el producto en el carrito del cliente
            const existente = carritoActual.productos.find(
                (producto) =>
                    Number(producto.id) === Number(item.id)
            );

            // Obtener la información del producto
            const producto = existente ||
                await obtenerProductoPorIdAPI(item.id);

            if (!sesionVigente()) {
                break;
            }

            if (!producto) {

                errorSincronizacion = true;

                break;
            }

            const cantidadActual = existente
                ? existente.cantidad
                : 0;

            const stock = Number(producto.stock);

            if (
                producto.stock == null ||
                !Number.isInteger(stock) ||
                stock < 0
            ) {
                throw new Error(
                    "No se pudo verificar el stock del producto."
                );
            }

            // Calcular las unidades disponibles
            const stockDisponible = Math.max(
                0,
                stock - cantidadActual
            );

            const cantidadAgregar = Math.min(
                item.cantidad,
                stockDisponible
            );

            // Incorporar las unidades disponibles
            if (cantidadAgregar > 0) {

                if (!sesionVigente()) {
                    break;
                }

                // Registrar la operación antes de enviarla
                localStorage.setItem(
                    claveOperacion,
                    "en_proceso"
                );

                carritoActual = await agregarAlCarritoAPI(
                    item.id,
                    cantidadAgregar,
                    idUsuario
                );
            }

            // Registrar los ajustes por falta de stock
            if (cantidadAgregar < item.cantidad) {

                ajustesStock.push({
                    id: item.id,
                    nombre: producto.nombre,
                    cantidadSolicitada: item.cantidad,
                    cantidadAgregada: cantidadAgregar,
                    cantidadDescartada:
                        item.cantidad - cantidadAgregar
                });
            }

            // Eliminar el pendiente confirmado
            eliminarProductoPendiente(
                idUsuario,
                item.id
            );

            // Eliminar el registro temporal
            localStorage.removeItem(claveOperacion);

            if (!sesionVigente()) {
                break;
            }

        } catch (error) {

            console.error(
                `Error al sincronizar el producto ${item.id}:`,
                error
            );

            errorSincronizacion = true;

            break;
        }
    }

    return {
        carrito: carritoActual,
        ajustesStock,
        errorSincronizacion,
        pendientes: obtenerCarritoPendiente(idUsuario)
    };
}