
import { Routes, Route, Navigate } from "react-router-dom";

import LayoutPrincipal from "./components/templates/LayoutPrincipal";

import Inicio from "./pages/publicas/Inicio";
import Catalogo from "./pages/publicas/Catalogo";
import DetalleProducto from "./pages/publicas/DetalleProducto";
import Login from "./pages/publicas/Login";
import Registro from "./pages/publicas/Registro";

import Carrito from "./pages/clientes/Carrito";
import Envio from "./pages/clientes/Envio";

import LayoutAdmin from "./components/templates/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import FormularioProductoAdmin from "./pages/admin/FormularioProductoAdmin";

import RutaAdmin from "./routes/RutaAdmin";

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

                <Route
                    path="/envio"
                    element={<Envio />}
                />

            </Route>

            <Route element={<RutaAdmin />}>

                <Route path="/admin" element={<LayoutAdmin />}>

                    <Route
                        index
                        element={<Dashboard />}
                    />

                    <Route
                        path="productos"
                        element={<ProductosAdmin />}
                    />

                    <Route
                        path="productos/nuevo"
                        element={<FormularioProductoAdmin />}
                    />

                    <Route
                        path="productos/editar/:id"
                        element={<FormularioProductoAdmin />}
                    />

                </Route>

            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}

export default App;
