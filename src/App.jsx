
import { Routes, Route, Navigate } from "react-router-dom";

import LayoutPrincipal from "./components/templates/LayoutPrincipal";

import Inicio from "./pages/publicas/Inicio";
import Catalogo from "./pages/publicas/Catalogo";
import DetalleProducto from "./pages/publicas/DetalleProducto";
import Login from "./pages/publicas/Login";
import Registro from "./pages/publicas/Registro";
import Carrito from "./pages/clientes/Carrito";
import Envio from "./pages/clientes/Envio";

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

                <Route
                    path="/registro"
                    element={<Registro />}
                />

                <Route
                    path="/carrito"
                    element={<Carrito />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

            <Route
                path="/envio"
                element={<Envio />}
            />

        </Routes>
    );
}

export default App;
