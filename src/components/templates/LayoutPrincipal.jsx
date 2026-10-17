
import { Outlet } from "react-router-dom";

import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

import "../../styles/templates/LayoutPrincipal.css";

function LayoutPrincipal() {
    return (
        <div className="layout-principal">

            <Header />

            <main className="layout-principal-contenido">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}

export default LayoutPrincipal;
