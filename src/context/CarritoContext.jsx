import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useRef
} from "react";

import {
    sincronizarCarritoInvitado
} from "../services/carritoSincronizacionService.js";

import { useAuth } from "./AuthContext.jsx";

import {
    obtenerCarrito,
    agregarAlCarrito as agregarAlCarritoLocal,
    cambiarCantidadCarrito,
    eliminarDelCarrito,
    asociarCarritoInvitado,
    obtenerCarritoPendiente
} from "../scripts/storage/carritoStorage.js";

import {
    obtenerCarritoAPI,
    agregarAlCarritoAPI,
    cambiarCantidadCarritoAPI,
    eliminarDelCarritoAPI
} from "../services/carritoService.js";

import {
    obtenerProductoPorIdAPI
} from "../services/productoService.js";

const CarritoContext = createContext(null);

// Obtener los datos actuales de los productos del invitado
async function obtenerProductosInvitado() {

    const carrito = obtenerCarrito();

    const productos = await Promise.all(
        carrito.map(async (item) => {

            const producto = await obtenerProductoPorIdAPI(
                item.id
            );

            if (!producto) {
                return null;
            }

            return {
                ...producto,
                cantidad: item.cantidad
            };
        })
    );

    return productos.filter(Boolean);
}

export function CarritoProvider({ children }) {

    const { usuario, cargando: cargandoSesion } = useAuth();

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [avisoSincronizacion, setAvisoSincronizacion] =
        useState("");

    const operacionEnCurso = useRef(false);
    const productosRef = useRef(productos);

    // Controlar las cargas simultáneas del carrito
    const cargaEnCurso = useRef(null);

    // Identificar la sesión correspondiente a cada carga
    const usuarioRef = useRef(usuario);
    const sesionCargandoRef = useRef(cargandoSesion);

    productosRef.current = productos;
    usuarioRef.current = usuario;
    sesionCargandoRef.current = cargandoSesion;

    const esCliente = usuario?.rol === "CLIENTE";
    const puedeComprar = usuario === null || esCliente;

    const cargarCarrito = useCallback(async () => {

        if (cargandoSesion) {
            return;
        }

        // Comprobar que la sesión sigue siendo la misma
        const sesionVigente = () =>
            usuarioRef.current === usuario &&
            !sesionCargandoRef.current;

        // Reutilizar una carga correspondiente a la misma sesión
        if (cargaEnCurso.current?.usuario === usuario) {
            return cargaEnCurso.current.promesa;
        }

        // Esperar una carga anterior antes de iniciar otra
        const cargaAnterior = cargaEnCurso.current?.promesa;

        setCargando(true);
        setError("");
        setAvisoSincronizacion("");

        const carga = {
            usuario,
            promesa: null
        };

        carga.promesa = Promise.resolve().then(async () => {

            try {

                if (cargaAnterior) {
                    await cargaAnterior;
                }

                if (!sesionVigente()) {
                    return;
                }

                if (!puedeComprar) {
                    setProductos([]);
                    return;
                }

               if (esCliente) {

                    const idUsuario = usuario.idUsuario;

                    if (!sesionVigente()) {
                        return;
                    }

                    // Asociar el carrito temporal al cliente
                    asociarCarritoInvitado(idUsuario);

                    // Recuperar el carrito persistente
                    const carrito = await obtenerCarritoAPI();

                    if (!sesionVigente()) {
                        return;
                    }

                    const pendientes = obtenerCarritoPendiente(
                        idUsuario
                    );

                    if (pendientes.length > 0) {

                        // Sincronizar los productos pendientes
                        const resultado = await sincronizarCarritoInvitado(
                            carrito,
                            idUsuario,
                            sesionVigente
                        );

                        if (!sesionVigente()) {
                            return;
                        }

                        setProductos(resultado.carrito.productos);

                        const avisos = [];

                        if (resultado.ajustesStock.length > 0) {

                            const detalle = resultado.ajustesStock
                                .map((item) =>
                                    `${item.nombre}: se descartaron ` +
                                    `${item.cantidadDescartada} unidades ` +
                                    `por falta de stock.`
                                )
                                .join(" ");

                            avisos.push(detalle);
                        }

                        if (
                            resultado.errorSincronizacion ||
                            resultado.pendientes.length > 0
                        ) {
                            avisos.push(
                                "No se pudieron sincronizar todos los productos. " +
                                "Revisa tu carrito antes de agregarlos nuevamente."
                            );
                        }

                        setAvisoSincronizacion(avisos.join(" "));

                    } else {

                        setProductos(carrito.productos);
                    }

                } else {

                    const productosInvitado =
                        await obtenerProductosInvitado();

                    if (sesionVigente()) {
                        setProductos(productosInvitado);
                    }
                }

            } catch (error) {

                console.error(
                    "Error al cargar el carrito:",
                    error
                );

                if (sesionVigente()) {
                    setError(error.message);
                    setProductos([]);
                }

            } finally {

                if (cargaEnCurso.current === carga) {
                    cargaEnCurso.current = null;

                    if (sesionVigente()) {
                        setCargando(false);
                    }
                }
            }
        });

        cargaEnCurso.current = carga;

        return carga.promesa;

    }, [
        usuario,
        cargandoSesion,
        esCliente,
        puedeComprar
    ]);

    useEffect(() => {
        cargarCarrito();
    }, [cargarCarrito]);

    const agregarAlCarrito = async (
        id,
        cantidad = 1,
        productoCatalogo = null
    ) => {

        if (!puedeComprar) {
            throw new Error(
                "Esta cuenta no puede realizar compras."
            );
        }

        if (
            cargandoSesion ||
            cargando ||
            cargaEnCurso.current ||
            operacionEnCurso.current
        ) {
            return false;
        }

        operacionEnCurso.current = true;

        try {

            if (esCliente) {

                const carrito = await agregarAlCarritoAPI(
                    id,
                    cantidad
                );

                if (usuarioRef.current === usuario) {
                    setProductos(carrito.productos);
                }

                return true;
            }

            let producto = productosRef.current.find(
                (item) => Number(item.id) === Number(id)
            );

            if (!producto && productoCatalogo) {
                producto = productoCatalogo;
            }

            if (!producto) {
                producto = await obtenerProductoPorIdAPI(id);
            }

            if (usuarioRef.current !== usuario) {
                return false;
            }

            if (!producto || producto.stock < 1) {
                return false;
            }

            const existente = obtenerCarrito().find(
                (item) => Number(item.id) === Number(id)
            );

            const cantidadActual = existente
                ? existente.cantidad
                : 0;

            if (cantidadActual + cantidad > producto.stock) {
                return false;
            }

            const agregado = agregarAlCarritoLocal(
                id,
                cantidad
            );

            if (agregado) {

                const productoExistente =
                    productosRef.current.some(
                        (item) => Number(item.id) === Number(id)
                    );

                if (productoExistente) {

                    setProductos((anteriores) =>
                        anteriores.map((item) =>
                            Number(item.id) === Number(id)
                                ? {
                                    ...item,
                                    cantidad: item.cantidad + cantidad
                                }
                                : item
                        )
                    );

                } else {

                    setProductos((anteriores) => [
                        ...anteriores,
                        {
                            ...producto,
                            cantidad
                        }
                    ]);
                }
            }

            return agregado;

        } finally {
            operacionEnCurso.current = false;
        }
    };

    const cambiarCantidad = async (id, nuevaCantidad) => {

        if (!puedeComprar) {
            return false;
        }

        if (
            cargandoSesion ||
            cargando ||
            cargaEnCurso.current ||
            operacionEnCurso.current
        ) {
            return false;
        }

        operacionEnCurso.current = true;

        try {

            if (esCliente) {

                const carrito = await cambiarCantidadCarritoAPI(
                    id,
                    nuevaCantidad
                );

                if (usuarioRef.current === usuario) {
                    setProductos(carrito.productos);
                }

                return true;
            }

            const producto = productosRef.current.find(
                (item) => Number(item.id) === Number(id)
            );

            if (
                !producto ||
                nuevaCantidad < 1 ||
                nuevaCantidad > producto.stock
            ) {
                return false;
            }

            const actualizado = cambiarCantidadCarrito(
                id,
                nuevaCantidad
            );

            if (actualizado) {

                setProductos((anteriores) =>
                    anteriores.map((item) =>
                        Number(item.id) === Number(id)
                            ? {
                                ...item,
                                cantidad: nuevaCantidad
                            }
                            : item
                    )
                );
            }

            return actualizado;

        } finally {
            operacionEnCurso.current = false;
        }
    };

    const eliminarProducto = async (id) => {

        if (!puedeComprar) {
            return false;
        }

        if (
            cargandoSesion ||
            cargando ||
            cargaEnCurso.current ||
            operacionEnCurso.current
        ) {
            return false;
        }

        operacionEnCurso.current = true;

        try {

            if (esCliente) {

                const carrito = await eliminarDelCarritoAPI(id);

                if (usuarioRef.current === usuario) {
                    setProductos(carrito.productos);
                }

                return true;
            }

            const eliminado = eliminarDelCarrito(id);

            if (eliminado) {

                setProductos((anteriores) =>
                    anteriores.filter(
                        (item) => Number(item.id) !== Number(id)
                    )
                );
            }

            return eliminado;

        } finally {
            operacionEnCurso.current = false;
        }
    };

    return (
        <CarritoContext.Provider
            value={{
                productos,
                cargando,
                error,
                avisoSincronizacion,
                agregarAlCarrito,
                cambiarCantidad,
                eliminarProducto,
                cargarCarrito
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {

    const contexto = useContext(CarritoContext);

    if (!contexto) {
        throw new Error(
            "useCarrito debe utilizarse dentro de CarritoProvider."
        );
    }

    return contexto;
}