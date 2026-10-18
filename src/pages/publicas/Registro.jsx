
import { Link } from "react-router-dom";

import FormularioRegistro from "../../components/organisms/FormularioRegistro";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import "../../styles/pages/Registro.css";

function Registro() {

    const manejarRegistro = () => {
        console.log("Formulario de registro enviado");
    };

    return (
        <div className="registro">

            <div className="container">

                <div className="registro-contenedor">

                    <Link
                        to="/"
                        className="registro-volver"
                    >
                        <Icono nombre="arrow-left" />
                        Volver al inicio
                    </Link>

                    <FormularioRegistro
                        onRegistrar={manejarRegistro}
                    />

                    <div className="registro-informacion">

                        <Icono nombre="shield-check" />

                        <Texto
                            contenido="Tus datos serán utilizados para gestionar tu cuenta y tus compras."
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Registro;
