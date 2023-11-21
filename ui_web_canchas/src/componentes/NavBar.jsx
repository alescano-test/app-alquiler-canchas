import { Link } from "react-router-dom";
import logo_nombre from "../img/logo_nombre.png";
import { Boton } from "./Boton";
import { Visible } from "./RequireAuth";
import { Logueado } from "./Logueado";
import { Navigate } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div className="contenedor-navbar bg-verde-oscuro flex justify-between">
        <div className="contenedor-img ms-4">
          <Link to="/">
            <img src={logo_nombre} />
          </Link>
        </div>
        <div className="self-center mr-3 flex gap-10">
            <Visible>
                <Logueado/>
            </Visible>
          
        </div>
      </div>
    </>
  );
};
