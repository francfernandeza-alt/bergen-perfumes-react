import Boton from "./components/atoms/Boton";
import Texto from "./components/atoms/Texto";

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

    </div>
  );
}

export default App;