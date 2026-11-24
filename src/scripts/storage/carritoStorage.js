
const CLAVE_CARRITOS = "bergen_carritos";

// Claves anteriores utilizadas para la migración
const CLAVE_CARRITO_ANTERIOR = "bergen_carrito";

const PREFIJO_PENDIENTE_ANTERIOR =
    "bergen_carrito_pendiente_";


// ==================================================
// FUNCIONES PRIVADAS DE ALMACENAMIENTO
// ==================================================

// Crear la estructura inicial
function crearAlmacenamiento() {

    return {
        invitado: [],
        pendientes: {}
    };
}

// Validar el identificador del usuario
function validarIdUsuario(idUsuario) {

    const id = Number(idUsuario);

    if (!Number.isSafeInteger(id) || id < 1) {

        throw new Error(
            "Identificador de usuario inválido."
        );
    }

    return String(id);
}

// Validar los productos almacenados
function validarProductos(productos) {

    if (
        !Array.isArray(productos) ||
        !productos.every((item) =>
            item &&
            Number.isSafeInteger(item.id) &&
            item.id > 0 &&
            Number.isSafeInteger(item.cantidad) &&
            item.cantidad > 0
        )
    ) {

        throw new Error(
            "El carrito contiene productos inválidos."
        );
    }

    return productos.map((producto) => ({
        id: producto.id,
        cantidad: producto.cantidad
    }));
}

// Validar la estructura completa
function validarAlmacenamiento(datos) {

    if (
        !datos ||
        !datos.pendientes ||
        typeof datos.pendientes !== "object" ||
        Array.isArray(datos.pendientes)
    ) {

        throw new Error(
            "La estructura del almacenamiento es inválida."
        );
    }

    const almacenamiento = crearAlmacenamiento();

    almacenamiento.invitado = validarProductos(
        datos.invitado
    );

    for (const [idUsuario, productos] of Object.entries(
        datos.pendientes
    )) {

        const id = validarIdUsuario(idUsuario);

        almacenamiento.pendientes[id] =
            validarProductos(productos);
    }

    return almacenamiento;
}

// Guardar toda la estructura en una sola escritura
function guardarAlmacenamiento(almacenamiento) {

    const datos = validarAlmacenamiento(
        almacenamiento
    );

    localStorage.setItem(
        CLAVE_CARRITOS,
        JSON.stringify(datos)
    );
}

// Migrar los datos de las claves anteriores
function migrarAlmacenamiento() {

    const almacenamiento = crearAlmacenamiento();

    const clavesAnteriores = [];

    // Recuperar el carrito anterior del invitado
    const carritoAnterior = localStorage.getItem(
        CLAVE_CARRITO_ANTERIOR
    );

    if (carritoAnterior !== null) {

        almacenamiento.invitado = validarProductos(
            JSON.parse(carritoAnterior)
        );

        clavesAnteriores.push(
            CLAVE_CARRITO_ANTERIOR
        );
    }

    // Recuperar los pendientes de cada cliente
    for (let i = 0; i < localStorage.length; i++) {

        const clave = localStorage.key(i);

        if (
            !clave ||
            !clave.startsWith(
                PREFIJO_PENDIENTE_ANTERIOR
            )
        ) {
            continue;
        }

        const idUsuario = validarIdUsuario(
            clave.slice(
                PREFIJO_PENDIENTE_ANTERIOR.length
            )
        );

        const productos = validarProductos(
            JSON.parse(localStorage.getItem(clave))
        );

        almacenamiento.pendientes[idUsuario] =
            productos;

        clavesAnteriores.push(clave);
    }

    // Guardar primero la nueva estructura
    guardarAlmacenamiento(almacenamiento);

    // Eliminar las claves anteriores después de guardar
    for (const clave of clavesAnteriores) {

        localStorage.removeItem(clave);
    }

    return almacenamiento;
}

// Obtener el almacenamiento unificado
function obtenerAlmacenamiento() {

    const guardados = localStorage.getItem(
        CLAVE_CARRITOS
    );

    // Migrar solamente si la nueva clave no existe
    if (guardados === null) {

        return migrarAlmacenamiento();
    }

    return validarAlmacenamiento(
        JSON.parse(guardados)
    );
}

// Combinar productos sin duplicar identificadores
function combinarProductos(...carritos) {

    const productosCombinados = new Map();

    for (const carrito of carritos) {

        for (const producto of carrito) {

            const existente = productosCombinados.get(
                producto.id
            );

            if (existente) {

                existente.cantidad += producto.cantidad;

            } else {

                productosCombinados.set(producto.id, {
                    id: producto.id,
                    cantidad: producto.cantidad
                });
            }
        }
    }

    return validarProductos(
        Array.from(productosCombinados.values())
    );
}


// ==================================================
// GESTIÓN DEL CARRITO DE INVITADO
// ==================================================

// Obtener los productos guardados temporalmente
export function obtenerCarrito() {

    return obtenerAlmacenamiento().invitado;
}

// Agregar un producto al carrito temporal
export function agregarAlCarrito(id, cantidad = 1) {

    const idProducto = Number(id);

    if (
        !Number.isSafeInteger(idProducto) ||
        idProducto < 1 ||
        !Number.isSafeInteger(cantidad) ||
        cantidad < 1
    ) {

        return false;
    }

    const almacenamiento = obtenerAlmacenamiento();

    almacenamiento.invitado = combinarProductos(
        almacenamiento.invitado,
        [{
            id: idProducto,
            cantidad
        }]
    );

    guardarAlmacenamiento(almacenamiento);

    return true;
}

// Cambiar la cantidad de un producto
export function cambiarCantidadCarrito(
    id,
    nuevaCantidad
) {

    const idProducto = Number(id);

    if (
        !Number.isSafeInteger(idProducto) ||
        idProducto < 1 ||
        !Number.isSafeInteger(nuevaCantidad) ||
        nuevaCantidad < 1
    ) {

        return false;
    }

    const almacenamiento = obtenerAlmacenamiento();

    const existente = almacenamiento.invitado.find(
        (item) => item.id === idProducto
    );

    if (!existente) {

        return false;
    }

    existente.cantidad = nuevaCantidad;

    guardarAlmacenamiento(almacenamiento);

    return true;
}

// Eliminar un producto del carrito temporal
export function eliminarDelCarrito(id) {

    const idProducto = Number(id);

    const almacenamiento = obtenerAlmacenamiento();

    const productosActualizados =
        almacenamiento.invitado.filter(
            (producto) => producto.id !== idProducto
        );

    if (
        productosActualizados.length ===
        almacenamiento.invitado.length
    ) {

        return false;
    }

    almacenamiento.invitado = productosActualizados;

    guardarAlmacenamiento(almacenamiento);

    return true;
}

// Vaciar solamente el carrito del invitado
export function vaciarCarrito() {

    const almacenamiento = obtenerAlmacenamiento();

    almacenamiento.invitado = [];

    guardarAlmacenamiento(almacenamiento);
}


// ==================================================
// GESTIÓN DEL CARRITO PENDIENTE POR CLIENTE
// ==================================================

// Obtener los productos pendientes del cliente
export function obtenerCarritoPendiente(idUsuario) {

    const id = validarIdUsuario(idUsuario);

    const almacenamiento = obtenerAlmacenamiento();

    return almacenamiento.pendientes[id] || [];
}

// Guardar los productos pendientes del cliente
export function guardarCarritoPendiente(
    idUsuario,
    productos
) {

    const id = validarIdUsuario(idUsuario);

    const almacenamiento = obtenerAlmacenamiento();

    const datos = validarProductos(productos);

    if (datos.length === 0) {

        delete almacenamiento.pendientes[id];

    } else {

        almacenamiento.pendientes[id] = datos;
    }

    guardarAlmacenamiento(almacenamiento);
}

// Eliminar un producto pendiente del cliente
export function eliminarProductoPendiente(
    idUsuario,
    idProducto
) {

    const id = validarIdUsuario(idUsuario);

    const almacenamiento = obtenerAlmacenamiento();

    const carrito = almacenamiento.pendientes[id] || [];

    const productosActualizados = carrito.filter(
        (producto) => producto.id !== Number(idProducto)
    );

    if (productosActualizados.length === carrito.length) {

        return false;
    }

    if (productosActualizados.length === 0) {

        delete almacenamiento.pendientes[id];

    } else {

        almacenamiento.pendientes[id] =
            productosActualizados;
    }

    guardarAlmacenamiento(almacenamiento);

    return true;
}

// Vaciar los productos pendientes de un cliente
export function vaciarCarritoPendiente(idUsuario) {

    const id = validarIdUsuario(idUsuario);

    const almacenamiento = obtenerAlmacenamiento();

    delete almacenamiento.pendientes[id];

    guardarAlmacenamiento(almacenamiento);
}

// Asociar el carrito del invitado al cliente
export function asociarCarritoInvitado(idUsuario) {

    const id = validarIdUsuario(idUsuario);

    const almacenamiento = obtenerAlmacenamiento();

    const carritoPendiente =
        almacenamiento.pendientes[id] || [];

    const carritoInvitado = almacenamiento.invitado;

    if (carritoInvitado.length === 0) {

        return carritoPendiente;
    }

    const carritoAsociado = combinarProductos(
        carritoPendiente,
        carritoInvitado
    );

    // Asociar los productos al cliente
    almacenamiento.pendientes[id] = carritoAsociado;

    // Vaciar el carrito del invitado
    almacenamiento.invitado = [];

    // Persistir ambos cambios en una sola escritura
    guardarAlmacenamiento(almacenamiento);

    return carritoAsociado;
}
