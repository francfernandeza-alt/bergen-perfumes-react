
import { Routes, Route, Navigate } from "react-router-dom";

import LayoutPrincipal from "./components/templates/LayoutPrincipal";
import Inicio from "./pages/publicas/Inicio";

function App() {
    return (
        <Routes>

            <Route element={<LayoutPrincipal />}>

                <Route
                    path="/"
                    element={<Inicio />}
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
