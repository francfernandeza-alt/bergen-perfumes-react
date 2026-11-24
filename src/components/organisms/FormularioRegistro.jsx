import { useState } from "react";

import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import Texto from "../atoms/Texto";
import Icono from "../atoms/Icono";
import Enlace from "../atoms/Enlace";
import Mensaje from "../atoms/Mensaje";

import "../../styles/organisms/FormularioRegistro.css";
import {
    validarRut,
    validarNombre,
    validarApellidos,
    validarCorreo,
    validarContrasena,
    validarConfirmacionContrasena,
} from "../../scripts/validaciones/registros";
function FormularioRegistro({ onRegistrar }) {

    const [datos, setDatos] = useState({
        rut: "",
        nombre: "",
        apellidos: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: "",
    });

    const [error, setError] = useState("");

    const [exito, setExito] = useState(false);

    const [cargando, setCargando] = useState(false);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;

        setDatos((anteriores) => ({
            ...anteriores,
            [name]: value
        }));
    };
    
    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        if (cargando) return;

        setError("");
        setExito(false);

        if (!validarRut(datos.rut)) {
            setError("El RUT no es válido.");
            return;
        }

        if (!validarNombre(datos.nombre)) {
            setError("El nombre debe tener entre 2 y 50 caracteres.");
            return;
        }

        if (!validarApellidos(datos.apellidos)) {
            setError("Los apellidos deben tener entre 2 y 100 caracteres.");
            return;
        }

        if (!validarCorreo(datos.correo)) {
            setError("El correo electrónico no es válido.");
            return;
        }

        if (!validarContrasena(datos.contrasena)) {
            setError("La contraseña debe tener 8 caracteres, con mayúsculas y minúsculas.");
            return;
        }

        if (!validarConfirmacionContrasena(
            datos.contrasena,
            datos.confirmarContrasena
        )) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const { confirmarContrasena, ...datosRegistro } = datos;

        setCargando(true);

        try {
            await onRegistrar(datosRegistro);

            setExito(true);

            setDatos({
                rut: "",
                nombre: "",
                apellidos: "",
                correo: "",
                contrasena: "",
                confirmarContrasena: ""
            });

        } catch (error) {
            setError(
                error.message || "No se pudo crear la cuenta."
            );
        } finally {
            setCargando(false);
        }
    };



    return (
        <section className="formulario-registro">

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
                            placeholder="123456789"
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

                </div>

                {error && (
                    <Mensaje
                        texto={error}
                        variante="danger"
                    />
                )}

                {exito && (
                    <Mensaje
                        texto="¡Cuenta creada correctamente! Ya puedes iniciar sesión."
                        variante="success"
                    />
                )}

                <Boton
                    texto={cargando ? "Creando cuenta..." : "Crear cuenta"}
                    tipo="submit"
                    variante="marca"
                    className="formulario-registro-boton"
                    deshabilitado={cargando}
                />

            </form>

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
