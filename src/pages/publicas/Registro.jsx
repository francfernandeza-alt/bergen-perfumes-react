
import { Link } from "react-router-dom";

import FormularioRegistro from "../../components/organisms/FormularioRegistro";
import Texto from "../../components/atoms/Texto";
import Icono from "../../components/atoms/Icono";

import { crearUsuario } from "../../scripts/storage/usuariosStorage.js";

import "../../styles/pages/Registro.css";

function Registro() {

    const manejarRegistro = (datosUsuario) => {
        return crearUsuario(datosUsuario);
    };

    return (
        <div className="registro">

            <div className="container">

                <div className="registro-contenedor">

                    {/* NAVEGACIÓN */}

                    <Link
                        to="/"
                        className="registro-volver"
                    >
                        <Icono nombre="arrow-left" />
                        Volver al inicio
                    </Link>

                    {/* FORMULARIO */}

                    <FormularioRegistro
                        onRegistrar={manejarRegistro}
                    />

                    {/* INFORMACIÓN ADICIONAL */}

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
