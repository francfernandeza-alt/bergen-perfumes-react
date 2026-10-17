import CampoFormulario from "../components/molecules/CampoFormulario";
import Boton from "../components/atoms/Boton";
import { useState } from "react";
import {
    validarRut,
    validarNombre,
    validarApellidos,
    validarCorreo,
    validarContrasena,
    validarConfirmacionContrasena,
    validarDireccion
} from "../scripts/registros";
import Mensaje from "../components/atoms/Mensaje";
function Registro() {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [rut, setRut] = useState("");
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [clave2, setClave2] = useState("");
    const [direccion, setDireccion] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);
    function manejarRegistro(evento) {
        evento.preventDefault();
        setMensaje("");

        if (validarRut(rut) == false) {
            setError(true);
            setMensaje("El RUT ingresado no es válido");
            return;
        }
        if (validarNombre(nombre) == false) {
            setError(true);
            setMensaje("El nombre debe tener entre 2 y 50 caracteres");
            return;
        }    
        if (validarApellidos(apellidos) == false) {
            setError(true);
            setMensaje("Los apellidos deben tener entre 2 y 100 caracteres");
            return;
        }
        if (validarCorreo(correo) == false) {
            setError(true);
            setMensaje("El correo electrónico no es válido");
            return;
        }
        if (validarContrasena(clave) == false) {
            setError(true);
            setMensaje("La contraseña debe tener 8 caracteres, incluyendo mayúsculas y minúsculas");
            return;
        }
        if (validarConfirmacionContrasena(clave, clave2) == false) {
            setError(true);
            setMensaje("Las contraseñas no coinciden");
            return;
        }
        if (validarDireccion(direccion) == false) {
            setError(true);
            setMensaje("La dirección es obligatoria y no debe superar los 100 caracteres");
            return;
        }      
        setError(false);
        setMensaje("Todos los datos son válidos");
    }

    return (
        <div className="container mt-4">
            <h2>Registro de usuario</h2>
            <p>Completa tus datos para crear una cuenta en BERGEN PERFUMES.</p>
            {mensaje !== "" && (
            <Mensaje
                texto={mensaje}
                variante={error ? "danger" : "success"}/>
            )}
            <form onSubmit={manejarRegistro}>        
                <CampoFormulario
                    etiqueta="RUT"
                    tipo="text"
                    nombre="rut"
                    placeholder="Ej: 19011022K"
                    valor={rut}
                    onChange={(evento) => setRut(evento.target.value)}
                    requerido={true}/>
                <CampoFormulario
                    etiqueta="Nombre"
                    tipo="text"
                    nombre="nombre"
                    placeholder="Ingresa tu nombre"
                    valor={nombre}
                    onChange={(evento) => setNombre(evento.target.value)}
                    requerido={true}/>        
                <CampoFormulario
                    etiqueta="Apellidos"
                    tipo="text"
                    nombre="apellidos"
                    placeholder="Ingresa tus apellidos"
                    valor={apellidos}
                    onChange={(evento) => setApellidos(evento.target.value)}
                    requerido={true}/>
                <CampoFormulario
                    etiqueta="Correo electrónico"
                    tipo="email"
                    nombre="correo"
                    placeholder="Ej: correo@gmail.com"
                    valor={correo}
                    onChange={(evento) => setCorreo(evento.target.value)}
                    requerido={true}/>
                <CampoFormulario
                    etiqueta="Contraseña"
                    tipo="password"
                    nombre="clave"
                    placeholder="Ingresa tu contraseña"
                    valor={clave}
                    onChange={(evento) => setClave(evento.target.value)}
                    requerido={true}/> 
                <CampoFormulario
                    etiqueta="Confirmar contraseña"
                    tipo="password"
                    nombre="clave2"
                    placeholder="Confirma tu contraseña"
                    valor={clave2}
                    onChange={(evento) => setClave2(evento.target.value)}
                    requerido={true}/>
                <CampoFormulario
                    etiqueta="Dirección"
                    tipo="text"
                    nombre="direccion"
                    placeholder="Ej: Av. Pajaritos 1234, Maipú"
                    valor={direccion}
                    onChange={(evento) => setDireccion(evento.target.value)}
                    requerido={true}/>
                <Boton
                    texto="Registrarse"
                    tipo="submit"
                    variante="marca"/>
            </form>
        </div>
    );
}
export default Registro;
