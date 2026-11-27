
// Utilidades para simular el backend de Spring Boot en las pruebas.
// Cada ruta se define como "MÉTODO /ruta" y devuelve un cuerpo JSON
// o el resultado de conEstado(status, cuerpo).

export const TOKEN_PRUEBA = 'token-prueba';

export const RUTA_CSRF = {
    'GET /api/v2/autenticacion/csrf': { token: TOKEN_PRUEBA }
};

export function conEstado(status, cuerpo = null) {
    return { __simulado: true, status, cuerpo };
}

function crearRespuesta(status, cuerpo) {
    return new Response(
        cuerpo == null ? null : JSON.stringify(cuerpo),
        {
            status,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

export function simularFetch(rutas) {
    return spyOn(window, 'fetch').and.callFake(async (url, opciones = {}) => {

        const metodo = (opciones.method || 'GET').toUpperCase();
        const ruta = new URL(url, 'http://localhost').pathname;
        const clave = `${metodo} ${ruta}`;

        if (!(clave in rutas)) {
            throw new Error(`Solicitud no simulada: ${clave}`);
        }

        const manejador = rutas[clave];

        const resultado = typeof manejador === 'function'
            ? await manejador(opciones, url)
            : manejador;

        if (resultado && resultado.__simulado) {
            return crearRespuesta(resultado.status, resultado.cuerpo);
        }

        return crearRespuesta(200, resultado);
    });
}

// Solicitudes registradas por el espía, sin las de CSRF
export function solicitudes(espia) {
    return espia.calls.allArgs()
        .map(([url, opciones = {}]) => ({
            metodo: (opciones.method || 'GET').toUpperCase(),
            ruta: new URL(url, 'http://localhost').pathname,
            opciones
        }))
        .filter((s) => s.ruta !== '/api/v2/autenticacion/csrf');
}

// ProductoDTO de ejemplo tal como lo devuelve el backend
export function productoDTO(datos = {}) {
    return {
        idProducto: 1,
        idCategoria: 1,
        nombreCategoria: 'Masculino',
        idMarca: 3,
        nombreMarca: 'Ralph Lauren',
        nombre: 'Polo Blue',
        descripcion: 'Fragancia fresca',
        precio: 64000,
        precioOferta: null,
        stock: 15,
        volumenMl: 125,
        destacado: false,
        activo: true,
        imagenPrincipal: 'https://i.ibb.co/abc/polo-blue.webp',
        ...datos
    };
}
