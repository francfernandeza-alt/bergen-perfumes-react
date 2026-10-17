
import { Link, NavLink, Outlet } from "react-router-dom";

import Icono from "../atoms/Icono";
import Texto from "../atoms/Texto";

import "../../styles/templates/LayoutAdmin.css";

function LayoutAdmin() {
    return (
        <div className="layout-admin">

            {/* ENCABEZADO ADMINISTRATIVO */}

            <header className="layout-admin-header">

                <Link to="/" className="layout-admin-logo">
                    <Icono nombre="gem" />

                    <span>BERGEN PERFUMES</span>
                </Link>

                <Texto
                    etiqueta="span"
                    contenido="Panel de administración"
                    className="layout-admin-header-texto"
                />

            </header>

            <div className="layout-admin-cuerpo">

                {/* MENÚ LATERAL */}

                <aside className="layout-admin-sidebar">

                    <Texto
                        etiqueta="h2"
                        contenido="Administración"
                        className="layout-admin-sidebar-titulo"
                    />

                    <nav
                        className="layout-admin-menu"
                        aria-label="Navegación administrativa"
                    >

                        <NavLink
                            to="/admin/productos"
                            className={({ isActive }) =>
                                `layout-admin-enlace ${
                                    isActive ? "activo" : ""
                                }`
                            }
                        >
                            <Icono nombre="box-seam" />
                            <span>Productos</span>
                        </NavLink>

                        <Link
                            to="/"
                            className="layout-admin-enlace"
                        >
                            <Icono nombre="shop" />
                            <span>Volver a la tienda</span>
                        </Link>

                    </nav>

                </aside>

                {/* CONTENIDO DE LAS PÁGINAS */}

                <main className="layout-admin-contenido">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default LayoutAdmin;
