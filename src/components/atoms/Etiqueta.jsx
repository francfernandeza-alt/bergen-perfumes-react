function Etiqueta({
    texto,
    htmlFor,
    className = "",
}) {
    return (
        <label
            htmlFor={htmlFor}
            className={`form-label ${className}`}
        >
            {texto}
        </label>
    );
}

export default Etiqueta;