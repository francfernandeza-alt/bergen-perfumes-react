
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormularioProducto from "../../components/organisms/FormularioProducto";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import Mensaje from "../../components/atoms/Mensaje";

import {
    listarProductosAdmin,
    obtenerProductoAdmin,
    crearProducto,
    actualizarProducto,
    obtenerOpcionesCatalogo
} from "../../services/adminProductoService.js";

import {
    subirImagen,
    asignarImagenPrincipal
} from "../../services/imagenService.js";

import "../../styles/pages/FormularioProductoAdmin.css";

function FormularioProductoAdmin() {

    const navigate = useNavigate();
    const { id } = useParams();

    // Si existe un ID, estamos editando.
    // Si no existe, estamos agregando.
    const esEdicion = id !== undefined;

    const [producto, setProducto] = useState(null);
    const [opciones, setOpciones] = useState({ marcas: [], categorias: [] });
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState("");
    const [noEncontrado, setNoEncontrado] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [errorGuardar, setErrorGuardar] = useState("");

    // Cargar marcas, categorías y, al editar, el producto seleccionado
    useEffect(() => {
        let activo = true;

        async function cargar() {
            setCargando(true);
            setErrorCarga("");
            setNoEncontrado(false);

            try {
                const [productos, seleccionado] = await Promise.all([
                    listarProductosAdmin(),
                    esEdicion ? obtenerProductoAdmin(id) : Promise.resolve(null)
                ]);

                if (!activo) {
                    return;
                }

                if (esEdicion && !seleccionado) {
                    setNoEncontrado(true);
                    return;
                }

                // Incluir la marca y categoría del producto editado aunque esté inactivo
                const lista = seleccionado
                    ? [...productos, seleccionado]
                    : productos;

                setOpciones(obtenerOpcionesCatalogo(lista));
                setProducto(seleccionado);

            } catch (e) {
                if (activo) {
                    setErrorCarga(e.message);
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargar();

        return () => {
            activo = false;
        };
    }, [id, esEdicion]);

    // GUARDAR PRODUCTO
    // 1. Subir la imagen a ImgBB (si se eligió una)
    // 2. Crear o actualizar el producto
    // 3. Asociar la URL de ImgBB como imagen principal

    const guardarProducto = async (datos, archivo) => {

        setGuardando(true);
        setErrorGuardar("");

        let urlImagen = null;

        if (archivo) {
            try {
                urlImagen = await subirImagen(archivo);
            } catch (e) {
                // No se guardó nada: el formulario conserva los datos para reintentar
                setErrorGuardar(`No se pudo subir la imagen: ${e.message}`);
                setGuardando(false);
                return;
            }
        }

        let guardado;

        try {
            guardado = esEdicion
                ? await actualizarProducto(id, datos)
                : await crearProducto(datos);
        } catch (e) {
            setErrorGuardar(e.message);
            setGuardando(false);
            return;
        }

        let aviso = {
            tipo: "success",
            texto: esEdicion
                ? `"${guardado.nombre}" se actualizó correctamente.`
                : `"${guardado.nombre}" se creó correctamente.`
        };

        if (urlImagen) {
            try {
                await asignarImagenPrincipal(guardado.id, urlImagen, guardado.nombre);
            } catch {
                aviso = {
                    tipo: "warning",
                    texto: `"${guardado.nombre}" se guardó, pero no se pudo asociar la imagen. Edítalo para intentarlo de nuevo.`
                };
            }
        }

        // Regresar a la tabla de productos con el resultado
        navigate("/admin/productos", { state: { aviso } });
    };

    // CANCELAR

    const cancelar = () => {
        navigate("/admin/productos");
    };

    // CARGANDO

    if (cargando) {
        return (
            <div className="formulario-producto-admin">
                <Mensaje
                    texto={esEdicion ? "Cargando producto..." : "Cargando formulario..."}
                    variante="secondary"
                />
            </div>
        );
    }

    // ERROR AL CARGAR

    if (errorCarga) {
        return (
            <div className="formulario-producto-admin">

                <Mensaje texto={errorCarga} variante="danger" />

                <Boton
                    texto="Volver a productos"
                    variante="outline-secondary"
                    onClick={cancelar}
                />

            </div>
        );
    }

    // PRODUCTO NO ENCONTRADO

    if (noEncontrado) {
        return (
            <div className="formulario-producto-admin">

                <Texto
                    etiqueta="h1"
                    contenido="Producto no encontrado"
                    className="formulario-producto-admin-titulo"
                />

                <Texto
                    contenido="El producto que intentas editar no existe."
                    className="formulario-producto-admin-descripcion"
                />

                <Boton
                    texto="Volver a productos"
                    variante="outline-secondary"
                    onClick={cancelar}
                />

            </div>
        );
    }

    return (
        <div className="formulario-producto-admin">

            {/* ENCABEZADO */}

            <div className="formulario-producto-admin-encabezado">

                <Texto
                    etiqueta="h1"
                    contenido={
                        esEdicion
                            ? "Editar perfume"
                            : "Agregar nuevo perfume"
                    }
                    className="formulario-producto-admin-titulo"
                />

                <Texto
                    contenido={
                        esEdicion
                            ? "Modifica la información del perfume seleccionado."
                            : "Completa los datos para agregar un nuevo perfume al catálogo."
                    }
                    className="formulario-producto-admin-descripcion"
                />

            </div>

            {/* FORMULARIO */}

            <div className="formulario-producto-admin-contenido">

                <FormularioProducto
                    producto={producto}
                    marcas={opciones.marcas}
                    categorias={opciones.categorias}
                    onGuardar={guardarProducto}
                    onCancelar={cancelar}
                    guardando={guardando}
                    error={errorGuardar}
                />

            </div>

        </div>
    );
}

export default FormularioProductoAdmin;
