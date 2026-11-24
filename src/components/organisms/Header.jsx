
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Imagen from "../atoms/Imagen";
import Enlace from "../atoms/Enlace";
import Boton from "../atoms/Boton";
import Icono from "../atoms/Icono";

import Buscador from "../molecules/Buscador";
import EnlaceIcono from "../molecules/EnlaceIcono";

import { useAuth } from "../../context/AuthContext.jsx";

import "../../styles/organisms/Header.css";

function Header() {
    const navigate = useNavigate();

    const { usuario, cargando, salir } = useAuth();

    const [menuAbierto, setMenuAbierto] = useState(false);
    const [cuentaAbierta, setCuentaAbierta] = useState(false);
    const [cerrandoSesion, setCerrandoSesion] = useState(false);
    const [errorSesion, setErrorSesion] = useState("");

    const alternarMenu = () => {
        setMenuAbierto((anterior) => !anterior);
    };

    const manejarBusqueda = (texto) => {
        const busqueda = texto.trim();

        if (busqueda === "") {
            navigate("/catalogo");
            return;
        }

        navigate(
            `/catalogo?buscar=${encodeURIComponent(busqueda)}`
        );
    };

    const manejarCierreSesion = async () => {
        if (cerrandoSesion) {
            return;
        }

        setErrorSesion("");
        setCerrandoSesion(true);

        try {
            await salir();
            setCuentaAbierta(false);
            setMenuAbierto(false);
            navigate("/", { replace: true });
        } catch (error) {
            setErrorSesion(
                error.message || "No se pudo cerrar sesión."
            );
        } finally {
            setCerrandoSesion(false);
        }
    };

    return (
        <header className="header">
            <div className="header-contenido">

                <Enlace
                    href="/"
                    className="header-logo"
                    texto={
                        <Imagen
                            src="/imagenes/LogoPeque.jpg"
                            alt="Bergen Perfumes"
                            className="header-logo-imagen"
                        />
                    }
                />

                <nav
                    className={
                        `header-navegacion ${
                            menuAbierto
                                ? "header-navegacion-abierta"
                                : ""
                        }`
                    }
                >
                    <Enlace
                        texto="Inicio"
                        href="/"
                        className="header-enlace"
                    />

                    <Enlace
                        texto="Catálogo"
                        href="/catalogo"
                        className="header-enlace"
                    />
                </nav>

                <div className="header-buscador">
                    <Buscador onBuscar={manejarBusqueda} />
                </div>

                <div
                    className={
                        `header-acciones ${
                            menuAbierto
                                ? "header-acciones-abiertas"
                                : ""
                        }`
                    }
                >
                    {cargando ? (
                        <span className="header-cuenta-cargando">
                            Verificando cuenta...
                        </span>
                    ) : usuario === null ? (
                        <EnlaceIcono
                            texto="Cuenta"
                            icono="person"
                            href="/login"
                        />
                    ) : (
                        <div className="header-cuenta">

                            <button
                                type="button"
                                className="header-cuenta-boton"
                                onClick={() =>
                                    setCuentaAbierta(
                                        (anterior) => !anterior
                                    )
                                }
                                aria-expanded={cuentaAbierta}
                                aria-controls="header-menu-cuenta"
                            >
                                <Icono nombre="person-circle" />
                                <span>Mi cuenta</span>
                                <Icono nombre="chevron-down" />
                            </button>

                            {cuentaAbierta && (
                                <div
                                    id="header-menu-cuenta"
                                    className="header-cuenta-menu"
                                >
                                    <span className="header-cuenta-correo">
                                        {usuario.correo}
                                    </span>

                                    {usuario.rol === "ADMIN" && (
                                        <button
                                            type="button"
                                            className="header-cuenta-opcion"
                                            onClick={() => {
                                                setCuentaAbierta(false);
                                                navigate("/admin");
                                            }}
                                        >
                                            Panel administrativo
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        className="header-cuenta-opcion"
                                        onClick={manejarCierreSesion}
                                        disabled={cerrandoSesion}
                                    >
                                        {cerrandoSesion
                                            ? "Cerrando sesión..."
                                            : "Cerrar sesión"}
                                    </button>

                                    {errorSesion && (
                                        <p
                                            className="header-cuenta-error"
                                            role="alert"
                                        >
                                            {errorSesion}
                                        </p>
                                    )}
                                </div>
                            )}

                        </div>
                    )}

                    <EnlaceIcono
                        texto="Carrito"
                        icono="cart3"
                        href="/carrito"
                    />
                </div>

                <Boton
                    variante="menu"
                    className="header-boton-menu"
                    onClick={alternarMenu}
                    texto={
                        <>
                            <Icono
                                nombre={
                                    menuAbierto ? "x-lg" : "list"
                                }
                            />

                            <span className="header-texto-menu">
                                Menú
                            </span>
                        </>
                    }
                />

            </div>
        </header>
    );
}

export default Header;
