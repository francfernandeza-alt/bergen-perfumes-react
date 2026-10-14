function Input({
    tipo = "text",
    nombre,
    id,
    placeholder = "",
    valor,
    onChange,
    requerido = false,
    deshabilitado = false,
    className = "",
}) {
    return (
        <input
            type={tipo}
            name={nombre}
            id={id}
            placeholder={placeholder}
            value={valor}
            onChange={onChange}
            required={requerido}
            disabled={deshabilitado}
            className={`form-control ${className}`}
        />
    );
}

export default Input;