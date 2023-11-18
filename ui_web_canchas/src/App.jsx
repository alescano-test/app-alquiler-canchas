import FiltroBusqueda from "./components/FiltroBusqueda";
import IniciarSesion from "./components/IniciarSesion";
import ListaCancha from "./components/ListaCanchas";
import NavBar from "./components/NavBar";
export default function App() {
  return (
    <>
      <div className="">
        <NavBar />
        <FiltroBusqueda/>
        <ListaCancha />
        <IniciarSesion/>
      </div>
    </>
  );
}
