function Imagen({
    src,
    alt,
    className = "",
    ancho,
    alto,
}) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            width={ancho}
            height={alto}
        />
    );
}

export default Imagen;