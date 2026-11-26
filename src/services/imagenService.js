
import { obtenerTokenCsrf } from "./autenticacionService.js";
import { API_URL, procesarRespuesta } from "./adminProductoService.js";

// Imágenes de productos.
// React nunca habla con ImgBB: envía el archivo a Spring Boot,
// que guarda la clave privada y realiza la carga.

export const TIPOS_IMAGEN_PERMITIDOS = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

// Debe coincidir con el límite del backend (ImgBBService)
export const TAMANO_MAXIMO_IMAGEN = 1024 * 1024;

// Devuelve un mensaje de error o null si el archivo es válido
export function validarImagen(archivo) {

    if (!archivo) {
        return "Debes seleccionar una imagen.";
    }

    if (!TIPOS_IMAGEN_PERMITIDOS.includes(archivo.type)) {
        return "Formato no permitido. Usa JPG, PNG o WEBP.";
    }

    if (archivo.size > TAMANO_MAXIMO_IMAGEN) {
        return "La imagen no puede superar 1 MB.";
    }

    return null;
}

// POST multipart - Sube la imagen y devuelve la URL de ImgBB
export async function subirImagen(archivo) {

    const error = validarImagen(archivo);

    if (error) {
        throw new Error(error);
    }

    const tokenCsrf = await obtenerTokenCsrf();

    const formulario = new FormData();
    formulario.append("imagen", archivo);

    // No se define Content-Type: el navegador agrega el boundary del multipart
    const respuesta = await fetch(
        `${API_URL}/productos/imagenes/upload`,
        {
            method: "POST",
            credentials: "include",
            headers: { "X-XSRF-TOKEN": tokenCsrf },
            body: formulario
        }
    );

    const datos = await procesarRespuesta(
        respuesta,
        "No se pudo subir la imagen."
    );

    return datos.url;
}

// POST - Asocia la URL como imagen principal del producto
export async function asignarImagenPrincipal(
    idProducto,
    url,
    textoAlternativo = ""
) {

    const tokenCsrf = await obtenerTokenCsrf();

    const respuesta = await fetch(
        `${API_URL}/productos/${idProducto}/imagen-principal`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": tokenCsrf
            },
            body: JSON.stringify({
                url,
                textoAlternativo: textoAlternativo || null
            })
        }
    );

    return procesarRespuesta(
        respuesta,
        "No se pudo asociar la imagen al producto."
    );
}
