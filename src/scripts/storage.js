
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

// CONSULTAR TODOS LOS PRODUCTOS

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

// CONSULTAR PRODUCTO POR ID

export function obtenerProductoPorId(id) {
    const productos = obtenerProductos();

    return productos.find(
        (producto) => producto.id === Number(id)
    ) ?? null;
}

// AGREGAR PRODUCTO

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

// ACTUALIZAR PRODUCTO

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

// ELIMINAR PRODUCTO

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
