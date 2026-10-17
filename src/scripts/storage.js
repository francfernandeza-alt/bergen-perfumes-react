
const CLAVE_PRODUCTOS = "bergen_productos";

const productosIniciales = [
    {
        id: 1,
        nombre: "Polo Blue",
        descripcion: "Fragancia masculina fresca y elegante.",
        precio: 64,
        precioAnterior: 80,
        stock: 15,
        imagen: "/imagenes/263-Polo-Blue.webp"
    },
    {
        id: 2,
        nombre: "Big Pony",
        descripcion: "Una fragancia moderna y dinámica.",
        precio: 85,
        precioAnterior: null,
        stock: 8,
        imagen: "/imagenes/274-Big-Pony.webp"
    }
];

export function obtenerProductos() {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS);

    if (guardados === null) {
        localStorage.setItem(
            CLAVE_PRODUCTOS,
            JSON.stringify(productosIniciales)
        );

        return [...productosIniciales];
    }

    return JSON.parse(guardados);
}

export function obtenerProductoPorId(id) {
    const productos = obtenerProductos();

    return productos.find(
        (producto) => producto.id === Number(id)
    ) ?? null;
}

export function agregarProducto(producto) {
    const productos = obtenerProductos();

    const nuevoId = productos.reduce(
        (mayor, actual) => Math.max(mayor, actual.id),
        0
    ) + 1;

    const nuevoProducto = {
        ...producto,
        id: nuevoId
    };

    productos.push(nuevoProducto);

    localStorage.setItem(
        CLAVE_PRODUCTOS,
        JSON.stringify(productos)
    );

    return nuevoProducto;
}

export function actualizarProducto(productoActualizado) {
    const productos = obtenerProductos();

    const indice = productos.findIndex(
        (producto) => producto.id === Number(productoActualizado.id)
    );

    if (indice === -1) {
        return false;
    }

    productos[indice] = {
        ...productos[indice],
        ...productoActualizado,
        id: productos[indice].id
    };

    localStorage.setItem(
        CLAVE_PRODUCTOS,
        JSON.stringify(productos)
    );

    return true;
}

export function eliminarProducto(id) {
    const productos = obtenerProductos();

    const productosActualizados = productos.filter(
        (producto) => producto.id !== Number(id)
    );

    if (productosActualizados.length === productos.length) {
        return false;
    }

    localStorage.setItem(
        CLAVE_PRODUCTOS,
        JSON.stringify(productosActualizados)
    );

    return true;
}


export function descontarStock(productosComprados) {

    if (
        !Array.isArray(productosComprados) ||
        productosComprados.length === 0
    ) {
        return false;
    }

    const productos = obtenerProductos();

    const cantidades = new Map();

    for (const item of productosComprados) {

        const id = Number(item.id);
        const cantidad = Number(item.cantidad);

        if (
            !Number.isInteger(id) ||
            !Number.isInteger(cantidad) ||
            cantidad < 1
        ) {
            return false;
        }

        cantidades.set(
            id,
            (cantidades.get(id) || 0) + cantidad
        );
    }

    for (const [id, cantidad] of cantidades) {

        const producto = productos.find(
            (item) => item.id === id
        );

        if (
            !producto ||
            !Number.isInteger(producto.stock) ||
            producto.stock < cantidad
        ) {
            return false;
        }
    }

    const productosActualizados = productos.map((producto) => {

        const cantidadComprada = cantidades.get(producto.id) || 0;

        return {
            ...producto,
            stock: producto.stock - cantidadComprada
        };
    });

    // Guardar todos los cambios juntos.
    localStorage.setItem(
        "bergen_productos",
        JSON.stringify(productosActualizados)
    );

    return true;
}

