import { useState } from "react";
import Input from "../atoms/Input";
import Boton from "../atoms/Boton";
import Icono from "../atoms/Icono";
import "../../styles/molecules/Buscador.css";

function Buscador({ onBuscar }) {
    const [busqueda, setBusqueda] = useState("");

    const manejarBusqueda = (evento) => {
        evento.preventDefault();
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
                onChange={(evento) => setBusqueda(evento.target.value)}
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