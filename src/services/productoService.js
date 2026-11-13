
const API_URL = "http://localhost:8080/api/productos";

// Adaptar los datos del backend al formato del frontend
function adaptarProducto(producto) {

    const tieneOferta = producto.precioOferta != null;

    return {
        id: producto.idProducto,
        nombre: producto.nombre,
        categoria: producto.nombreCategoria,
        marca: producto.nombreMarca,
        descripcion: producto.descripcion,

        precio: tieneOferta
            ? Number(producto.precioOferta)
            : Number(producto.precio),

        precioAnterior: tieneOferta
            ? Number(producto.precio)
            : null,

        stock: producto.stock,
        destacado: producto.destacado,
        activo: producto.activo,

        imagen: producto.imagenPrincipal ?? null
    };
}

// Obtener todos los productos activos desde Spring Boot
export async function obtenerProductosAPI() {

    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error(
            `Error al obtener productos: ${respuesta.status}`
        );
    }

    const productos = await respuesta.json();

    return productos.map(adaptarProducto);
}
