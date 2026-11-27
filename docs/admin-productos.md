# Panel administrativo de productos e imágenes (ImgBB)

**Rama:** `feat/admin-productos` · **Responsable:** Integrante 2 · **Contrato N.º 2**

El panel `/admin/productos` deja de usar `localStorage` y trabaja contra la API REST de Spring Boot. Las imágenes se suben a ImgBB **a través del backend**: React nunca conoce la clave de ImgBB.

## Funcionalidades

| Pantalla | Qué hace |
|---|---|
| **Listado** (`ProductosAdmin`) | Carga los productos desde la API, con indicador de carga, mensaje de error y botón *Reintentar*. Muestra imagen, nombre, marca, categoría, precio (con oferta), stock y estado. |
| **Desactivar** | Pide confirmación, llama a `DELETE /api/v2/productos/{id}` (eliminación lógica: el backend marca `activo = false`, por lo que los pedidos existentes no se ven afectados) y refresca el listado. |
| **Crear / editar** (`FormularioProductoAdmin`) | Carga marcas, categorías y, al editar, el producto. Valida los datos, sube la imagen, guarda el producto y asocia la imagen. |
| **Roles** | Si el usuario de la sesión no es `ADMIN` (por ejemplo, un futuro `VENDEDOR`), se ocultan *Agregar*, *Editar* y *Desactivar*; el listado sigue visible. |

## Flujo al guardar un producto

```
Formulario (React)
  1. El admin elige la foto → vista previa local (no se sube todavía)
  2. Presiona Guardar → validación de datos y de imagen
  3. POST /api/v2/productos/imagenes/upload  (multipart, campo "imagen")
         └─ Spring Boot valida y sube a ImgBB → { url: "https://i.ibb.co/..." }
  4. POST /api/v2/productos  o  PUT /api/v2/productos/{id}
  5. POST /api/v2/productos/{id}/imagen-principal  { url, textoAlternativo }
         └─ Spring Boot guarda la URL en la tabla imagen (Neon)
  6. Vuelve al listado con un mensaje de resultado
```

- Si falla el paso 3, **no se guarda nada** y el formulario conserva lo escrito para reintentar.
- Si falla el paso 5, el producto queda guardado y el listado avisa: *"se guardó, pero no se pudo asociar la imagen. Edítalo para intentarlo de nuevo"*.
- Al editar, la imagen es opcional: si no se elige una nueva, se conserva la actual.

## Archivos

| Archivo | Cambio |
|---|---|
| `src/services/adminProductoService.js` | **Nuevo.** Listar, obtener, crear, actualizar y desactivar. Reutiliza `obtenerTokenCsrf()` de `autenticacionService.js` (sin modificarlo). |
| `src/services/imagenService.js` | **Nuevo.** `validarImagen`, `subirImagen`, `asignarImagenPrincipal`. |
| `src/pages/admin/ProductosAdmin.jsx` | Conectado a la API; carga, errores, desactivación y permisos por rol. |
| `src/pages/admin/FormularioProductoAdmin.jsx` | Conectado a la API; flujo completo de guardado con imagen. |
| `src/components/organisms/TablaProductosAdmin.jsx` | Columnas de marca, categoría y estado; *Desactivar*; acciones según permisos. |
| `src/components/organisms/FormularioProducto.jsx` | Selects por ID, precio de oferta, volumen, destacado, selector de imagen con vista previa y mensajes de error en pantalla (sin `alert`). |
| CSS de la tabla y el formulario | Estilos para los elementos nuevos. |
| `src/test/...` | Pruebas actualizadas y nuevas (ver abajo). |

No se modificaron `App.jsx`, `main.jsx`, `RutaAdmin.jsx`, `AuthContext.jsx`, el carrito, `productoService.js` ni la configuración global.

## Endpoints utilizados

| Método | Ruta | Uso |
|---|---|---|
| GET | `/api/v2/productos` | Listado y opciones de marca/categoría |
| GET | `/api/v2/productos/{id}` | Cargar producto al editar |
| POST | `/api/v2/productos` | Crear |
| PUT | `/api/v2/productos/{id}` | Actualizar (se envía el objeto completo) |
| DELETE | `/api/v2/productos/{id}` | Desactivar |
| POST | `/api/v2/productos/imagenes/upload` | Subir imagen a ImgBB |
| POST | `/api/v2/productos/{id}/imagen-principal` | Asociar la URL al producto |
| GET | `/api/v2/autenticacion/csrf` | Token para POST/PUT/DELETE |

Todas las solicitudes usan `credentials: "include"`; las que modifican datos envían `X-XSRF-TOKEN`. Los errores muestran el campo `mensaje` del backend; 401 y 403 tienen mensajes propios.

Ejemplo de cuerpo enviado al crear:

```json
{
  "idCategoria": 1, "idMarca": 3, "nombre": "Polo Blue",
  "descripcion": "Fragancia fresca", "precio": 64000, "precioOferta": null,
  "stock": 15, "volumenMl": 125, "destacado": false, "activo": true
}
```

## Validaciones del formulario

Alineadas con `ProductoDTO` y `ProductoService`:

- Nombre obligatorio, hasta 150 caracteres.
- Categoría y marca obligatorias.
- Precio entero mayor a 0. Precio de oferta opcional, entero, mayor a 0 y menor que el precio.
- Stock entero mayor o igual a 0. Volumen opcional, entero mayor a 0.
- Imagen obligatoria al crear: JPG, PNG o WEBP de hasta 1 MB (el backend vuelve a validar el contenido real del archivo).

## Configuración

| Variable | Valor |
|---|---|
| `VITE_API_URL` (producción) | `/api/v2` — ya definido en `.env.production`; nginx lo reenvía al backend |
| `VITE_API_URL` (desarrollo) | Crear `.env.local` con `VITE_API_URL=http://localhost:8081/api/v2` (ignorado por git) |

La clave de ImgBB **no** se configura en el frontend: vive solo en el backend (`IMGBB_API_KEY`).

## Pruebas

```powershell
npm install
npm test
```

| Archivo | Casos |
|---|---|
| `test/services/adminProductoService.spec.jsx` | Adaptación del DTO, 404 → null, POST/PUT/DELETE con sesión y CSRF, mensajes del backend, 403, campos opcionales, marcas y categorías sin repetir |
| `test/services/imagenService.spec.jsx` | Formatos y tamaño permitidos y rechazados, subida multipart con CSRF, ninguna llamada directa a ImgBB, error 502, asociación |
| `test/components/organisms/TablaProductosAdmin.spec.jsx` | Vacío, columnas, imagen externa o marcador, oferta, confirmación al desactivar, acciones ocultas sin permisos, estado procesando |
| `test/components/organisms/FormularioProducto.spec.jsx` | Carga al editar, opciones, datos y archivo entregados, stock negativo, oferta inválida, imagen obligatoria, formato rechazado, edición sin imagen, bloqueo mientras guarda |
| `test/pages/admin/ProductosAdmin.spec.jsx` | Carga, error y reintento, desactivación y refresco, error al desactivar, navegación, aviso tras guardar, usuario sin rol ADMIN |
| `test/pages/admin/FormularioProductoAdmin.spec.jsx` | Opciones, flujo completo (orden de solicitudes), falla de ImgBB sin crear producto, falla de asociación, error de validación del backend, edición sin imagen, producto inexistente |

`test/utils/fetchSimulado.js` simula las respuestas de Spring Boot para estas pruebas.

## Pendientes para el líder técnico

1. **Límite de nginx:** `nginx.conf` no define `client_max_body_size`, cuyo valor por defecto es 1 MB. Una imagen cercana a 1 MB más los datos del multipart sería rechazada con **413** en producción. Agregar `client_max_body_size 2m;` en `location /api/`.
2. **Marcas y categorías:** no hay endpoints propios; las opciones se obtienen de los productos activos, por lo que una marca sin productos no aparece. Se recomienda `GET /api/v2/marcas` y `GET /api/v2/categorias`.
3. **Productos inactivos:** `GET /api/v2/productos` solo devuelve activos, así que un producto desactivado no puede reactivarse desde el panel.
4. **Rol VENDEDOR:** `RutaAdmin` hoy solo permite `ADMIN`. Para que el vendedor consulte el listado hay que permitirle la ruta; el panel ya oculta las acciones para cualquier rol distinto de `ADMIN`.
5. **Migración de imágenes:** los 11 productos actuales usan rutas de `public/imagenes`. Pueden pasarse a ImgBB editándolos desde el panel; luego esa carpeta puede eliminarse.
