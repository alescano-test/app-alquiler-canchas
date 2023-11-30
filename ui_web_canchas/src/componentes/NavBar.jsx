import { Link } from "react-router-dom";
import logo_nombre from "../img/logo_nombre.png";
import { Visible } from "../contexto/RequireAuth"
import { Logueado } from "./Logueado";
import { useAuthContext } from "../contexto/AuthContext";


export const Navbar = () => {
  const { sesion } = useAuthContext();

  return (
    <>
      <div className="navbar h-24 bg-verde-oscuro flex justify-between">
        

          {!sesion && (
            <div className="contenedor-img ms-4">
              <Link to="/">
                <img src={logo_nombre} />
              </Link>
            </div>
          )}
          
        
        <div className="flex">
            <Visible>
                <Logueado/>
            </Visible> 
        </div>
      </div>
    </>
  );
};