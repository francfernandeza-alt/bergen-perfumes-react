function Mensaje({
    texto,
    variante = "info",
    className = "",
}) {
    return (
        <div
            className={`alert alert-${variante} ${className}`}
            role="alert"
        >
            {texto}
        </div>
    );
}

export default Mensaje;