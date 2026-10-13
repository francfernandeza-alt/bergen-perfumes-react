import "../../styles/atoms/Boton.css"

function Boton(
    {
        texto,
        onClick,
        tipo = "button",
        variante = "marca",
        deshabilitado = false,
        className = "",
    }
) {
    return (
    <button
        type={tipo}
        className={`btn btn-${variante} ${className}`}
        onClick={onClick}
        disabled={deshabilitado}
    >
        {texto}
    </button>
    );
}

export default Boton;