import Texto from "../atoms/Texto";
import Enlace from "../atoms/Enlace";
import EnlaceIcono from "../molecules/EnlaceIcono";
import Subscripcion from "../molecules/Subscripcion";

import "../../styles/organisms/Footer.css";

function Footer() {

    const manejarSubscripcion = (correo) => {
        alert(`Gracias por subscribirte: ${correo}`);
    };

    return (
        <footer className="footer-bergen">
            <div className="container">

                <div className="row g-4">

                    <div className="col-12 col-md-6 col-lg-3">
                        <Texto
                            etiqueta="h3"
                            contenido="SOBRE NOSOTROS"
                            className="footer-titulo"
                        />

                        <Texto
                            contenido="En Bergen Perfumes nos apasionan las fragancias. Descubre perfumes para cada ocasión y encuentra tu aroma ideal."
                            className="footer-descripcion"
                        />
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <Texto
                            etiqueta="h3"
                            contenido="CATEGORÍAS"
                            className="footer-titulo"
                        />

                        <div className="footer-enlaces">
                            <Enlace
                                texto="Hombre"
                                href="/categorias/hombre"
                            />

                            <Enlace
                                texto="Mujer"
                                href="/categorias/mujer"
                            />

                            <Enlace
                                texto="Ofertas"
                                href="/ofertas"
                            />

                            <Enlace
                                texto="Catálogo"
                                href="/catalogo"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <Texto
                            etiqueta="h3"
                            contenido="CONTACTO E INFORMACIÓN"
                            className="footer-titulo"
                        />

                        <div className="footer-enlaces">
                            <EnlaceIcono
                                texto="contacto@bergenperfumes.cl"
                                icono="envelope"
                                href="mailto:contacto@bergenperfumes.cl"
                            />

                            <EnlaceIcono
                                texto="Instagram"
                                icono="instagram"
                                href="https://www.instagram.com/bergenperfumes_chile?mdxt=c2RhZWs4Mnk4cnhm"
                                target="_blank"
                            />

                            <EnlaceIcono
                                texto="WhatsApp"
                                icono="whatsapp"
                                href="https://wa.me/"
                                target="_blank"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <Texto
                            etiqueta="h3"
                            contenido="SUBSCRÍBETE"
                            className="footer-titulo"
                        />

                        <Texto
                            contenido="Recibe nuestras novedades y ofertas especiales."
                            className="footer-descripcion"
                        />

                        <Subscripcion
                            onSubscribir={manejarSubscripcion}
                        />
                    </div>

                </div>

                <div className="footer-inferior">
                    <Texto
                        contenido={`© ${new Date().getFullYear()} Bergen Perfumes. Todos los derechos reservados.`}
                    />
                </div>

            </div>
        </footer>
    );
}

export default Footer;