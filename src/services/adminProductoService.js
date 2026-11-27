
import { obtenerTokenCsrf } from "./autenticacionService.js";

// Servicio del panel administrativo de productos.
// Usa los datos tal como los define ProductoDTO en Spring Boot
// (idMarca, idCategoria, precio, precioOferta), a diferencia de
// productoService.js, que los adapta para el catálogo público.

export const API_URL =
    import.meta.env?.VITE_API_URL || "http://localhost:8081/api/v2";

const URL_PRODUCTOS = `${API_URL}/productos`;

// Convertir un ProductoDTO del backend al formato del panel
export function adaptarProductoAdmin(producto) {
    return {
        id: producto.idProducto,
        nombre: producto.nombre,
        descripcion: producto.descripcion ?? "",

        idMarca: producto.idMarca,
        marca: producto.nombreMarca,

        idCategoria: producto.idCategoria,
        categoria: producto.nombreCategoria,

        precio: Number(producto.precio),
        precioOferta: producto.precioOferta != null
            ? Number(producto.precioOferta)
            : null,

        stock: producto.stock,
        volumenMl: producto.volumenMl ?? null,
        destacado: Boolean(producto.destacado),
        activo: producto.activo !== false,

        imagen: producto.imagenPrincipal ?? null
    };
}

// Convertir los datos del formulario al JSON que espera ProductoDTO
export function convertirAProductoDTO(datos) {
    return {
        idCategoria: Number(datos.idCategoria),
        idMarca: Number(datos.idMarca),
        nombre: datos.nombre.trim(),
        descripcion: datos.descripcion?.trim() || null,
        precio: Number(datos.precio),
        precioOferta: datos.precioOferta === "" || datos.precioOferta == null
            ? null
            : Number(datos.precioOferta),
        stock: Number(datos.stock),
        volumenMl: datos.volumenMl === "" || datos.volumenMl == null
            ? null
            : Number(datos.volumenMl),
        destacado: Boolean(datos.destacado),
        activo: datos.activo !== false
    };
}

// Revisar la respuesta y lanzar un error con un mensaje legible
export async function procesarRespuesta(respuesta, mensajePorDefecto) {

    if (respuesta.status === 401) {
        throw new Error(
            "Tu sesión expiró. Inicia sesión nuevamente."
        );
    }

    if (respuesta.status === 403) {
        throw new Error(
            "No tienes permisos para realizar esta acción."
        );
    }

    if (!respuesta.ok) {
        let mensaje = mensajePorDefecto;

        try {
            const datos = await respuesta.json();
            mensaje = datos.mensaje || mensaje;
        } catch {
            // Mantener el mensaje por defecto
        }

        throw new Error(mensaje);
    }

    if (respuesta.status === 204) {
        return null;
    }

    return respuesta.json();
}

// Solicitud que modifica datos: incluye sesión y token CSRF
async function enviarConCsrf(url, metodo, cuerpo) {

    const tokenCsrf = await obtenerTokenCsrf();

    const headers = { "X-XSRF-TOKEN": tokenCsrf };

    if (cuerpo !== undefined) {
        headers["Content-Type"] = "application/json";
    }

    return fetch(url, {
        method: metodo,
        credentials: "include",
        headers,
        body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined
    });
}

// GET - Productos activos
export async function listarProductosAdmin() {

    const respuesta = await fetch(URL_PRODUCTOS, {
        credentials: "include"
    });

    const productos = await procesarRespuesta(
        respuesta,
        "No se pudieron cargar los productos."
    );

    return productos.map(adaptarProductoAdmin);
}

// GET - Un producto (devuelve null si no existe)
export async function obtenerProductoAdmin(id) {

    const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`, {
        credentials: "include"
    });

    if (respuesta.status === 404) {
        return null;
    }

    const producto = await procesarRespuesta(
        respuesta,
        "No se pudo cargar el producto."
    );

    return adaptarProductoAdmin(producto);
}

// POST - Crear producto
export async function crearProducto(datos) {

    const respuesta = await enviarConCsrf(
        URL_PRODUCTOS,
        "POST",
        convertirAProductoDTO(datos)
    );

    const producto = await procesarRespuesta(
        respuesta,
        "No se pudo crear el producto."
    );

    return adaptarProductoAdmin(producto);
}

// PUT - Actualizar producto (el backend reemplaza todos los campos)
export async function actualizarProducto(id, datos) {

    const respuesta = await enviarConCsrf(
        `${URL_PRODUCTOS}/${id}`,
        "PUT",
        convertirAProductoDTO(datos)
    );

    const producto = await procesarRespuesta(
        respuesta,
        "No se pudo actualizar el producto."
    );

    return adaptarProductoAdmin(producto);
}

// DELETE - Desactivar producto (el backend realiza eliminación lógica)
export async function desactivarProducto(id) {

    const respuesta = await enviarConCsrf(
        `${URL_PRODUCTOS}/${id}`,
        "DELETE"
    );

    await procesarRespuesta(
        respuesta,
        "No se pudo desactivar el producto."
    );
}

// Marcas y categorías disponibles, obtenidas de los productos cargados.
// Pendiente: reemplazar por endpoints propios cuando el backend los tenga.
export function obtenerOpcionesCatalogo(productos) {

    const marcas = new Map();
    const categorias = new Map();

    productos.forEach((producto) => {
        if (producto.idMarca != null) {
            marcas.set(producto.idMarca, producto.marca);
        }

        if (producto.idCategoria != null) {
            categorias.set(producto.idCategoria, producto.categoria);
        }
    });

    const ordenar = (mapa) => Array.from(mapa, ([id, nombre]) => ({ id, nombre }))
        .sort((a, b) => String(a.nombre).localeCompare(String(b.nombre), "es"));

    return {
        marcas: ordenar(marcas),
        categorias: ordenar(categorias)
    };
}
