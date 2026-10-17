
import { Link } from "react-router-dom";

import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import "../../styles/pages/Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard">

            <div className="dashboard-encabezado">

                <Texto
                    etiqueta="h1"
                    contenido="Panel de administración"
                    className="dashboard-titulo"
                />

                <Texto
                    contenido="Bienvenido al panel administrativo de Bergen Perfumes."
                    className="dashboard-descripcion"
                />

            </div>

            <section className="dashboard-seccion">

                <div className="dashboard-tarjeta">

                    <div className="dashboard-tarjeta-icono">
                        <Icono nombre="box-seam" />
                    </div>

                    <Texto
                        etiqueta="h2"
                        contenido="Gestión de productos"
                        className="dashboard-tarjeta-titulo"
                    />

                    <Texto
                        contenido="Administra el catálogo de perfumes de tu tienda. Puedes consultar, agregar, editar y eliminar productos."
                        className="dashboard-tarjeta-descripcion"
                    />

                    <Link
                        to="/admin/productos"
                        className="dashboard-tarjeta-enlace"
                    >
                        Administrar productos
                        <Icono nombre="arrow-right" />
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;
