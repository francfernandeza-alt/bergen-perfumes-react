import Boton from "./components/atoms/Boton";
import Texto from "./components/atoms/Texto";
import Imagen from "./components/atoms/Imagen";

function App() {
  return (
    <div className="container mt-5">

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

    </div>
  );
}

export default App;