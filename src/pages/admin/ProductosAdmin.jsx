
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import TablaProductosAdmin from "../../components/organisms/TablaProductosAdmin";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import Mensaje from "../../components/atoms/Mensaje";

import { useAuth } from "../../context/AuthContext.jsx";

import {
    listarProductosAdmin,
    desactivarProducto
} from "../../services/adminProductoService.js";

import "../../styles/pages/ProductosAdmin.css";

function ProductosAdmin() {

    const navigate = useNavigate();
    const location = useLocation();
    const { usuario } = useAuth();

    // Solo ADMIN crea, edita o desactiva. Otros roles (VENDEDOR) solo consultan.
    const puedeAdministrar = usuario?.rol === "ADMIN";

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [aviso, setAviso] = useState(location.state?.aviso ?? null);
    const [procesandoId, setProcesandoId] = useState(null);

    // Limpiar el aviso recibido desde el formulario para que no se repita
    useEffect(() => {
        if (location.state?.aviso) {
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location, navigate]);

    // Cada cambio de "recarga" vuelve a consultar la API
    const [recarga, setRecarga] = useState(0);

    useEffect(() => {
        let activo = true;

        listarProductosAdmin()
            .then((lista) => {
                if (activo) {
                    setProductos(lista);
                    setError("");
                }
            })
            .catch((e) => {
                if (activo) {
                    setError(e.message);
                }
            })
            .finally(() => {
                if (activo) {
                    setCargando(false);
                }
            });

        return () => {
            activo = false;
        };
    }, [recarga]);

    const recargar = () => {
        setRecarga((anterior) => anterior + 1);
    };

    const reintentar = () => {
        setCargando(true);
        setError("");
        recargar();
    };

    const agregarProducto = () => {
        navigate("/admin/productos/nuevo");
    };

    const editarProducto = (producto) => {
        navigate(`/admin/productos/editar/${producto.id}`);
    };

    const manejarDesactivar = async (producto) => {

        setProcesandoId(producto.id);
        setAviso(null);

        try {
            await desactivarProducto(producto.id);

            setAviso({
                tipo: "success",
                texto: `"${producto.nombre}" fue desactivado y ya no aparece en el catálogo.`
            });

            recargar();

        } catch (e) {
            setAviso({ tipo: "danger", texto: e.message });
        } finally {
            setProcesandoId(null);
        }
    };

    return (
        <div className="productos-admin">

            {/* ENCABEZADO */}

            <div className="productos-admin-encabezado">

                <div className="productos-admin-informacion">

                    <Texto
                        etiqueta="h1"
                        contenido="Gestión de productos"
                        className="productos-admin-titulo"
                    />

                    <Texto
                        contenido="Administra los perfumes disponibles en Bergen Perfumes."
                        className="productos-admin-descripcion"
                    />

                </div>

                {puedeAdministrar && (
                    <Boton
                        texto="Agregar producto"
                        variante="marca"
                        className="productos-admin-agregar"
                        onClick={agregarProducto}
                    />
                )}

            </div>

            {aviso && (
                <Mensaje
                    texto={aviso.texto}
                    variante={aviso.tipo}
                />
            )}

            {/* TABLA DE PRODUCTOS */}

            <div className="productos-admin-contenido">

                {cargando ? (

                    <Mensaje
                        texto="Cargando productos..."
                        variante="secondary"
                    />

                ) : error ? (

                    <div>
                        <Mensaje texto={error} variante="danger" />

                        <Boton
                            texto="Reintentar"
                            variante="outline-secondary"
                            onClick={reintentar}
                        />
                    </div>

                ) : (

                    <TablaProductosAdmin
                        productos={productos}
                        onEditar={editarProducto}
                        onDesactivar={manejarDesactivar}
                        puedeAdministrar={puedeAdministrar}
                        procesandoId={procesandoId}
                    />

                )}

            </div>

        </div>
    );
}

export default ProductosAdmin;
