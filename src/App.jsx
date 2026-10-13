import Boton from "./components/atoms/Boton";

function App() {
  return (
    <div className="container mt-5">
      <h1>Prueba de botones</h1>

      <div className="d-flex gap-3 mt-3">
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
    </div>
  );
}

export default App;