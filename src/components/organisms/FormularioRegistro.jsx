import { useState } from "react";

import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import Texto from "../atoms/Texto";
import Icono from "../atoms/Icono";
import Enlace from "../atoms/Enlace";
import Mensaje from "../atoms/Mensaje";

import "../../styles/organisms/FormularioRegistro.css";

function FormularioRegistro({ onRegistrar }) {

    const [datos, setDatos] = useState({
        rut: "",
        nombre: "",
        apellidos: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: "",
        direccion: ""
    });

    const [error, setError] = useState("");

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;

        setDatos((anteriores) => ({
            ...anteriores,
            [name]: value
        }));
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        setError("");

        if (datos.contrasena !== datos.confirmarContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const { confirmarContrasena, ...datosRegistro } = datos;

        onRegistrar?.(datosRegistro);
    };

    return (
        <section className="formulario-registro">

            {/* ENCABEZADO */}
            <div className="formulario-registro-encabezado">

                <div className="formulario-registro-icono">
                    <Icono nombre="person-plus" />
                </div>

                <Texto
                    etiqueta="h2"
                    contenido="Crea tu cuenta"
                    className="formulario-registro-titulo"
                />

                <Texto
                    contenido="Únete a Bergen Perfumes"
                    className="formulario-registro-descripcion"
                />

            </div>

            {/* FORMULARIO */}
            <form onSubmit={manejarEnvio}>

                <div className="row">

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="RUT"
                            nombre="rut"
                            placeholder="12.345.678-9"
                            valor={datos.rut}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Nombre"
                            nombre="nombre"
                            placeholder="Ingresa tu nombre"
                            valor={datos.nombre}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Apellidos"
                            nombre="apellidos"
                            placeholder="Ingresa tus apellidos"
                            valor={datos.apellidos}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Correo electrónico"
                            tipo="email"
                            nombre="correo"
                            placeholder="ejemplo@correo.cl"
                            valor={datos.correo}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Contraseña"
                            tipo="password"
                            nombre="contrasena"
                            placeholder="Ingresa tu contraseña"
                            valor={datos.contrasena}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Confirmar contraseña"
                            tipo="password"
                            nombre="confirmarContrasena"
                            placeholder="Repite tu contraseña"
                            valor={datos.confirmarContrasena}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12">
                        <CampoFormulario
                            etiqueta="Dirección"
                            nombre="direccion"
                            placeholder="Ingresa tu dirección"
                            valor={datos.direccion}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                </div>

                {/* MENSAJE DE ERROR */}
                {error && (
                    <Mensaje
                        texto={error}
                        variante="danger"
                    />
                )}

                {/* BOTÓN */}
                <Boton
                    texto="Crear cuenta"
                    tipo="submit"
                    variante="marca"
                    className="formulario-registro-boton"
                />

            </form>

            {/* ENLACE AL LOGIN */}
            <div className="formulario-registro-login">

                <Texto contenido="¿Ya tienes cuenta?" />

                <Enlace
                    texto="Inicia sesión"
                    href="/login"
                />

            </div>

        </section>
    );
}

export default FormularioRegistro;
