
const CLAVE_PRODUCTOS = "bergen_productos";

const productosIniciales = [
    {
        
        id: 1,
        nombre: "Polo Blue",
        categoria: "Masculino",
        marca: "Ralph Lauren",
        descripcion: "Fragancia masculina fresca y elegante.",
        precio: 64000,
        precioAnterior: null,
        stock: 15,
        imagen: "/imagenes/263-Polo-Blue.webp"
    },
    {
        id: 2,
        nombre: "Big Pony",
        categoria: "Masculino",
        marca: "Ralph Lauren",
        descripcion: "Una fragancia moderna y dinámica.",
        precio: 85000,
        precioAnterior: null,
        stock: 8,
        imagen: "/imagenes/274-Big-Pony.webp"
    },
    {
        id: 3,
        nombre: "Very Good Girl - Carolina Herrera",
        categoria: "Femenino",
        marca: "Carolina Herrera",
        descripcion: "Fragancia femenina elegante y sofisticada.",
        precio: 55000,
        precioAnterior: 65000,
        stock: 24,
        imagen: "/imagenes/Carolina Herrera Very Good Girl EDP 80 ml – Mujer.webp"
    },
    {
        id: 4,
        nombre: "Polo Green",
        categoria: "Masculino",
        marca: "Ralph Lauren",
        descripcion: "Fragancia masculina clásica.",
        precio: 40000,
        precioAnterior: null,
        stock: 8,
        imagen: "/imagenes/267-Polo-Green.webp"
    },
    {
        id: 5,
        nombre: "Polo Black",
        categoria: "Masculino",
        marca: "Ralph Lauren",
        descripcion: "Fragancia masculina elegante.",
        precio: 20000,
        precioAnterior: null,
        stock: 7,
        imagen: "/imagenes/269-Polo-Black.webp"
    },
    {
        id: 6,
        nombre: "Polo Red",
        categoria: "Masculino",
        marca: "Ralph Lauren",
        descripcion: "Fragancia masculina intensa.",
        precio: 29000,
        precioAnterior: null,
        stock: 5,
        imagen: "/imagenes/272-Polo-Red.webp"
    },
    {
        id: 7,
        nombre: "Libre",
        categoria: "Masculino",
        marca: "Yves Saint Laurent",
        descripcion: "Fragancia femenina elegante.",
        precio: 39000,
        precioAnterior: null,
        stock: 4,
        imagen: "/imagenes/275-Libre.webp"
    },
    {
        id: 8,
        nombre: "Good Girl - Carolina Herrera",
        categoria: "Femenino",
        marca: "Carolina Herrera",
        descripcion: "Fragancia femenina elegante.",
        precio: 88000,
        precioAnterior: null,
        stock: 4,
        imagen: "/imagenes/Good Girl de Carolina Herrera.webp"
    },
    {
        id: 9,
        nombre: "Miss Dior Blooming Bouquet",
        categoria: "Femenino",
        marca: "Dior",
        descripcion: "Fragancia femenina floral.",
        precio: 56000,
        precioAnterior: null,
        stock: 3,
        imagen: "/imagenes/Miss Dior Blooming Bouquet EDT 100 ml – Mujer.webp"
    },
    {
        id: 10,
        nombre: "Versace Bright Crystal",
        categoria: "Femenino",
        marca: "Versace",
        descripcion: "Fragancia femenina fresca.",
        precio: 67000,
        precioAnterior: null,
        stock: 5,
        imagen: "/imagenes/Versace Bright Crystal EDT 90 ml – Mujer.webp"
    },
    {
        id: 11,
        nombre: "Versace Yellow Diamond",
        categoria: "Femenino",
        marca: "Versace",
        descripcion: "Fragancia femenina floral.",
        precio: 88000,
        precioAnterior: null,
        stock: 6,
        imagen: "/imagenes/Versace Yellow Diamond EDT 90 ml – Mujer.webp"
    }
];


export function obtenerProductos() {
    const guardados = localStorage.getItem("bergen_productos");

    if (guardados === null) {
        localStorage.setItem(
            "bergen_productos",
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

