
import { Routes, Route, Navigate } from "react-router-dom";

import LayoutPrincipal from "./components/templates/LayoutPrincipal";

import Inicio from "./pages/publicas/Inicio";
import Catalogo from "./pages/publicas/Catalogo";
import DetalleProducto from "./pages/publicas/DetalleProducto";
import Login from "./pages/publicas/Login";

function App() {
    return (
        <Routes>

            <Route element={<LayoutPrincipal />}>

                <Route
                    path="/"
                    element={<Inicio />}
                />

                <Route
                    path="/catalogo"
                    element={<Catalogo />}
                />

                <Route
                    path="/producto/:id"
                    element={<DetalleProducto />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}

export default App;
