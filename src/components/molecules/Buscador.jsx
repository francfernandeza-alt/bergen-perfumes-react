import { useState } from "react";
import Input from "../atoms/Input";
import Boton from "../atoms/Boton";
import Icono from "../atoms/Icono";
import "../../styles/molecules/Buscador.css";
import { validarBusqueda } from "../../scripts/validaciones/productos";

function Buscador({ onBuscar }) {
    const [busqueda, setBusqueda] = useState("");

    const manejarCambio = (evento) => {
        const texto = evento.target.value;

        setBusqueda(texto);

        if (texto.trim() === "") {
            onBuscar("");
        }
    };

    const manejarBusqueda = (evento) => {
    evento.preventDefault();

    if (validarBusqueda(busqueda) == false) {
        return;
    }
    onBuscar(busqueda.trim());
    };

    return (
        <form
            className="buscador"
            onSubmit={manejarBusqueda}
        >

            <Input
                tipo="search"
                nombre="busqueda"
                id="busqueda"
                placeholder="Buscar perfume..."
                valor={busqueda}
                onChange={manejarCambio}
            />

            <Boton
                tipo="submit"
                variante="marca"
                texto={
                    <>
                        <Icono nombre="search" />
                        <span>Buscar</span>
                    </>
                }
            />

        </form>
    );
}

export default Buscador;