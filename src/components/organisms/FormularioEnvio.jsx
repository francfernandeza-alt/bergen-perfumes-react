
import { useState } from "react";

import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import Texto from "../atoms/Texto";
import Icono from "../atoms/Icono";

import "../../styles/organisms/FormularioEnvio.css";
import {
    validarCampoObligatorio,
    validarTelefono
} from "../../scripts/validaciones/envio.js";

import {
    validarNombre,
    validarCorreo,
    validarDireccion
} from "../../scripts/validaciones/registros.js";

function FormularioEnvio({ onConfirmar }) {

    const [datos, setDatos] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        region: "",
        comuna: "",
        direccion: "",
        indicaciones: "",
        metodoPago: "tarjeta"
    });

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;

        setDatos((anteriores) => ({
            ...anteriores,
            [name]: value
        }));
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        if (validarNombre(datos.nombre.trim()) == false) {
            alert("El nombre debe tener entre 2 y 50 caracteres.");
            return;
        }
        if (validarCorreo(datos.correo.trim()) == false) {
            alert("Ingresa un correo electrónico válido que termine en .com o .cl.");
            return;
        }
        if (validarTelefono(datos.telefono) == false) {
            alert("Ingresa un número de teléfono chileno válido.");
            return;
        }
        if (validarCampoObligatorio(datos.region) == false) {
            alert("Debes ingresar una región válida.");
            return;
        }

        if (validarCampoObligatorio(datos.comuna) == false) {
            alert("Debes ingresar una comuna válida.");
            return;
        }
        if (
            validarCampoObligatorio(datos.direccion) == false ||
            validarDireccion(datos.direccion) == false
        ) {
            alert("La dirección es obligatoria y no puede superar los 100 caracteres.");
            return;
        }
        onConfirmar?.(datos);
    };

    return (
        <section className="formulario-envio">

            <div className="formulario-envio-encabezado">

                <Icono nombre="truck" />

                <Texto
                    etiqueta="h2"
                    contenido="Datos de envío"
                    className="formulario-envio-titulo"
                />

            </div>

            <div className="formulario-envio-linea"></div>

            <form onSubmit={manejarEnvio}>

                <div className="row g-3">

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Nombre completo"
                            nombre="nombre"
                            placeholder="Ingresa tu nombre"
                            valor={datos.nombre}
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
                            etiqueta="Teléfono"
                            tipo="tel"
                            nombre="telefono"
                            placeholder="+56 9 1234 5678"
                            valor={datos.telefono}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Región"
                            nombre="region"
                            placeholder="Ej: Metropolitana"
                            valor={datos.region}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Comuna"
                            nombre="comuna"
                            placeholder="Ej: Santiago"
                            valor={datos.comuna}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <CampoFormulario
                            etiqueta="Dirección"
                            nombre="direccion"
                            placeholder="Calle y número"
                            valor={datos.direccion}
                            onChange={manejarCambio}
                            requerido={true}
                        />
                    </div>

                    <div className="col-12">
                        <CampoFormulario
                            etiqueta="Indicaciones adicionales"
                            nombre="indicaciones"
                            placeholder="Departamento o referencias"
                            valor={datos.indicaciones}
                            onChange={manejarCambio}
                        />
                    </div>

                </div>

                <div className="formulario-envio-pago">

                    <Texto
                        etiqueta="h3"
                        contenido="Método de pago"
                    />

                    <label className="formulario-envio-opcion">

                        <input
                            type="radio"
                            name="metodoPago"
                            value="tarjeta"
                            checked={datos.metodoPago === "tarjeta"}
                            onChange={manejarCambio}
                        />

                        <Icono nombre="credit-card" />

                        <span>Pago simulado con tarjeta</span>

                    </label>

                </div>

                <Boton
                    texto="Confirmar compra"
                    tipo="submit"
                    variante="marca"
                    className="formulario-envio-boton"
                />

            </form>

        </section>
    );
}

export default FormularioEnvio;
