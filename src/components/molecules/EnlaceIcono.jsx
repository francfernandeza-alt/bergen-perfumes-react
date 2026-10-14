import Enlace from "../atoms/Enlace";
import Icono from "../atoms/Icono";
import "../../styles/molecules/EnlaceIcono.css";

function EnlaceIcono({
    texto,
    icono,
    href,
    target = "_self",
}) {
    return (
        <Enlace
            href={href}
            target={target}
            className="enlace-icono"
            texto={
                <>
                    <Icono nombre={icono} />
                    <span>{texto}</span>
                </>
            }
        />
    );
}

export default EnlaceIcono;