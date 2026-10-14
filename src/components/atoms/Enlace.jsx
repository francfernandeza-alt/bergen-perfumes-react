function Enlace({
    texto,
    href,
    target = "_self",
    className = "",
}) {
    return (
        <a
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className={className}
        >
            {texto}
        </a>
    );
}

export default Enlace;