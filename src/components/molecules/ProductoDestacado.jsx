import Imagen from "../atoms/Imagen";
import Texto from "../atoms/Texto";
import Enlace from "../atoms/Enlace";
import "../../styles/molecules/ProductoDestacado.css";

function ProductoDestacado({
    nombre,
    imagen,
    enlace,
}) {
    return (
        <div className="producto-destacado">

            <Enlace
                href={enlace}
                className="producto-destacado-enlace"
                texto={
                    <>
                        <div className="producto-destacado-imagen">
                            <Imagen
                                src={imagen}
                                alt={nombre}
                            />
                        </div>

                        <Texto
                            etiqueta="h3"
                            contenido={nombre}
                            className="producto-destacado-nombre"
                        />
                    </>
                }
            />

        </div>
    );
}

export default ProductoDestacado;