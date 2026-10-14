function Texto({
    etiqueta = "p",
    contenido,
    className = "",
}) {
    const Etiqueta = etiqueta;

    return (
        <Etiqueta className={className}>
            {contenido}
        </Etiqueta>
    );
}

export default Texto;