import Boton from "./components/atoms/Boton";
import Texto from "./components/atoms/Texto";
import Imagen from "./components/atoms/Imagen";
import Input from "./components/atoms/Input";
import Etiqueta from "./components/atoms/Etiqueta";
import Icono from "./components/atoms/Icono";
import Enlace from "./components/atoms/Enlace";
import Mensaje from "./components/atoms/Mensaje";
import CampoFormulario from "./components/molecules/CampoFormulario";

function App() {
  return (
    <div className="container mt-5">

      {/* PRUEBA DE MOLÉCULAS */}
        <section className="mb-5">

          <h2>Prueba de moléculas</h2>

          {/* CAMPO FORMULARIO */}
          <div className="p-4 bg-white rounded shadow-sm mt-3">

            <h3 className="mb-4">CampoFormulario</h3>

            <CampoFormulario
              etiqueta="Nombre completo"
              nombre="molecula-nombre"
              placeholder="Ingrese su nombre completo"
            />

            <CampoFormulario
              etiqueta="Correo electrónico"
              tipo="email"
              nombre="molecula-correo"
              placeholder="ejemplo@correo.com"
              requerido={true}
            />

            <CampoFormulario
              etiqueta="Contraseña"
              tipo="password"
              nombre="molecula-contrasena"
              placeholder="Ingrese su contraseña"
            />

            <CampoFormulario
              etiqueta="Campo deshabilitado"
              nombre="molecula-deshabilitado"
              placeholder="No disponible"
              deshabilitado={true}
            />

          </div>

        </section>

        <hr />

      {/* PRUEBA DEL ÁTOMO BOTON */}
      <section className="mb-5">
        <h2>Prueba de botones</h2>

        <div className="d-flex flex-wrap gap-3 mt-3">
          <Boton
            texto="Iniciar sesión"
            variante="marca"
            onClick={() => alert("Iniciar sesión")}
          />

          <Boton
            texto="Agregar al carrito"
            variante="blanco"
            onClick={() => alert("Producto agregado")}
          />

          <Boton
            texto="Eliminar"
            variante="danger"
            deshabilitado={true}
          />
        </div>
      </section>

      <hr />

      {/* PRUEBA DEL ÁTOMO TEXTO */}
      <section className="mt-5">
        <h2>Prueba de textos</h2>

        <Texto
          etiqueta="h1"
          contenido="Bergen Perfumes"
          className="text-center fw-bold"
        />

        <Texto
          etiqueta="h2"
          contenido="Nuestro catálogo"
          className="mt-4"
        />

        <Texto
          etiqueta="h3"
          contenido="Perfumes para hombre"
          className="text-primary"
        />

        <Texto
          etiqueta="p"
          contenido="Descubre nuestra selección de perfumes exclusivos."
          className="fs-5"
        />

        <Texto
          etiqueta="p"
          contenido="Envíos disponibles a todo Chile."
          className="small text-body-secondary"
        />

        <Texto
          etiqueta="span"
          contenido="Precio: 50 esmeraldas"
          className="fw-bold text-success"
        />
      </section>

      <hr />

      {/* PRUEBA DEL ÁTOMO IMAGEN */}
      <section className="mt-5 mb-5">
        <h2>Prueba de imágenes</h2>

        <div className="d-flex flex-wrap gap-4 mt-3">

          <Imagen
            src="/imagenes/263-Polo-Blue.webp"
            alt="Perfume Polo Blue"
            ancho={200}
            className="img-fluid"
          />

          <Imagen
            src="/imagenes/263-Polo-Blue.webp"
            alt="Perfume Polo Blue con bordes redondeados"
            ancho={200}
            className="img-fluid rounded"
          />

          <Imagen
            src="/imagenes/263-Polo-Blue.webp"
            alt="Perfume Polo Blue con miniatura"
            ancho={200}
            className="img-fluid img-thumbnail"
          />

        </div>
      </section>

      <hr />

      {/* PRUEBA DE LOS ÁTOMOS INPUT Y ETIQUETA */}
      <section className="mt-5 mb-5">
        <h2>Prueba de inputs y etiquetas</h2>

        <div className="d-flex flex-column gap-3 mt-3">

          <div>
            <Etiqueta
              texto="Nombre"
              htmlFor="nombre"
            />

            <Input
              tipo="text"
              nombre="nombre"
              id="nombre"
              placeholder="Ingrese su nombre"
            />
          </div>

          <div>
            <Etiqueta
              texto="Correo electrónico"
              htmlFor="correo"
              className="fw-bold"
            />

            <Input
              tipo="email"
              nombre="correo"
              id="correo"
              placeholder="Ingrese su correo electrónico"
              requerido={true}
            />
          </div>

          <div>
            <Etiqueta
              texto="Contraseña"
              htmlFor="contrasena"
              className="fw-semibold"
            />

            <Input
              tipo="password"
              nombre="contrasena"
              id="contrasena"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <div>
            <Etiqueta
              texto="Cantidad"
              htmlFor="cantidad"
              className="text-secondary"
            />

            <Input
              tipo="number"
              nombre="cantidad"
              id="cantidad"
              placeholder="Ingrese una cantidad"
            />
          </div>

          <div>
            <Etiqueta
              texto="Campo deshabilitado"
              htmlFor="deshabilitado"
            />

            <Input
              tipo="text"
              nombre="deshabilitado"
              id="deshabilitado"
              placeholder="Campo deshabilitado"
              deshabilitado={true}
            />
          </div>

        </div>
      </section>

      <hr />

      {/* PRUEBA DEL ÁTOMO ICONO */}
      <section className="mt-5 mb-5">
        <h2>Prueba de iconos</h2>

        <div className="d-flex flex-wrap gap-4 mt-3">

          <Icono nombre="cart3" className="fs-1" />

          <Icono nombre="person-circle" className="fs-1 text-primary" />

          <Icono nombre="search" className="fs-1 text-secondary" />

          <Icono nombre="heart" className="fs-1 text-danger" />

          <Icono nombre="trash" className="fs-1 text-danger" />

          <Icono nombre="check-circle" className="fs-1 text-success"/>

          <Icono nombre="link-45deg" className="fs-1" />

          <Icono nombre="chat-dots" className="fs-1 text-primary" />

          <Icono nombre="envelope" className="fs-1" />

          <Icono nombre="telephone" className="fs-1" />

          <Icono nombre="instagram" className="fs-1 text-danger" />

          <Icono nombre="facebook" className="fs-1 text-primary" />

          <Icono nombre="whatsapp" className="fs-1 text-success" />

          <Icono nombre="geo-alt" className="fs-1" />

        </div>
      </section>

      <hr />

      {/* PRUEBA DEL ÁTOMO ENLACE */}
      <section className="mt-5 mb-5">
        <h2>Prueba de enlaces</h2>

        <div className="d-flex flex-column align-items-start gap-3 mt-3">

          <Enlace
            texto="Ir al inicio"
            href="/"
          />

          <Enlace
            texto="Ver catálogo"
            href="/catalogo"
            className="link-success fw-bold"
          />

          <Enlace
            texto="¿Olvidaste tu contraseña?"
            href="#recuperar"
            className="text-decoration-none"
          />

          <Enlace
            texto="Visitar Instagram"
            href="https://www.instagram.com/"
            target="_blank"
            className="link-danger"
          />

          <Enlace
            texto="Contáctanos por correo"
            href="mailto:contacto@ejemplo.com"
            className="link-primary"
          />

        </div>
      </section>

      <hr />

      {/* PRUEBA DEL ÁTOMO MENSAJE */}
      <section className="mt-5 mb-5">
        <h2>Prueba de mensajes</h2>

        <div className="d-flex flex-column gap-3 mt-3">

          <Mensaje
            texto="Bienvenido a Bergen Perfumes."
            variante="primary"
          />

          <Mensaje
            texto="Producto agregado al carrito correctamente."
            variante="success"
          />

          <Mensaje
            texto="No se pudo iniciar sesión. Verifique sus datos."
            variante="danger"
          />

          <Mensaje
            texto="Quedan pocas unidades disponibles."
            variante="warning"
          />

          <Mensaje
            texto="Realizamos envíos a todo Chile."
            variante="info"
          />

          <Mensaje
            texto="Este producto no tiene descuentos disponibles."
            variante="secondary"
          />

        </div>
      </section>

    </div>
  );
}

export default App;