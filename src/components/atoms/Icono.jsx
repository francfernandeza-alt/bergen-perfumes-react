function Icono({
    nombre,
    className = "",
}) {
    return (
        <i
            className={`bi bi-${nombre} ${className}`}
            aria-hidden="true"
        ></i>
    );
}

export default Icono;