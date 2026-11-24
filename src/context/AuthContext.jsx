
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    iniciarSesion,
    obtenerSesionActual,
    cerrarSesionActual
} from "../services/autenticacionService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        let activo = true;

        async function verificarSesion() {
            try {
                const sesion = await obtenerSesionActual();

                if (activo) {
                    setUsuario(sesion);
                }
            } catch (error) {
                console.error(
                    "Error al verificar la sesión:",
                    error
                );
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        verificarSesion();

        return () => {
            activo = false;
        };
    }, []);

    async function ingresar(correo, contrasena) {
        const usuarioAutenticado = await iniciarSesion(
            correo,
            contrasena
        );

        setUsuario(usuarioAutenticado);

        return usuarioAutenticado;
    }

    async function salir() {
        await cerrarSesionActual();
        setUsuario(null);
    }

    const valor = {
        usuario,
        cargando,
        autenticado: usuario !== null,
        ingresar,
        salir
    };

    return (
        <AuthContext.Provider value={valor}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const contexto = useContext(AuthContext);

    if (contexto === null) {
        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider."
        );
    }

    return contexto;
}
