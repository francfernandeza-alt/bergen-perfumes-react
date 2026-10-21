
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import App from "./App.jsx";

import { crearAdministradorDemo } from "./scripts/storage/usuariosStorage.js";

// Crear administrador de demostración al iniciar la aplicación
if (import.meta.env.DEV) {
    crearAdministradorDemo(
        "Administrador",
        "admin@bergen.com",
        "Admin12345"
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
