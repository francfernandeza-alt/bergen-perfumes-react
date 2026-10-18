import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Imagen from "../atoms/Imagen";
import Enlace from "../atoms/Enlace";
import Boton from "../atoms/Boton";
import Icono from "../atoms/Icono";

import Buscador from "../molecules/Buscador";
import EnlaceIcono from "../molecules/EnlaceIcono";

import "../../styles/organisms/Header.css";

function Header() {
    const navigate = useNavigate();

    const [menuAbierto, setMenuAbierto] = useState(false);

    const alternarMenu = () => {
        setMenuAbierto(!menuAbierto);
    };
    
    const manejarBusqueda = (texto) => {
        const busqueda = texto.trim();

        if (busqueda === "") {
            navigate("/catalogo");
            return;
        }

        navigate(`/catalogo?buscar=${encodeURIComponent(busqueda)}`);
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
                            menuAbierto ? "header-navegacion-abierta" : ""
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
                            menuAbierto ? "header-acciones-abiertas" : ""
                        }`
                    }
                >
                    <EnlaceIcono
                        texto="Cuenta"
                        icono="person"
                        href="/login"
                    />

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
                                nombre={menuAbierto ? "x-lg" : "list"}
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