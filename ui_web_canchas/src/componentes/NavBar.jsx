import { Link } from "react-router-dom";
import logo_nombre from "../img/logo_nombre.png";
import { Boton } from "./Boton";


export const Navbar = () => {
  return (
    <>
      <div className="contenedor-navbar bg-verde-oscuro flex justify-between">
        <div className="contenedor-img ms-4">
          <Link to="/">
            <img src={logo_nombre} />
          </Link>
        </div>
        <div className="self-center mr-3">
          <Link to="/login">
            <Boton btnNombre="Iniciar Sesión" />
          </Link>
        </div>
      </div>
    </>
  );
};
