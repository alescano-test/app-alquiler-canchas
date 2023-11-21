import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../AuthContext";
import { Boton } from "./Boton";

export const RequiredAuth = ({ children }) => {
  const { sesion } = useAuthContext();
  const location = useLocation();

  if (!sesion) {
    return (
      <div>
        <Navigate to="/login" state={{ from: location }} replace />
        <Navigate to="/registro" state={{ from: location }} replace />
      </div>
      
    )
  }

  return children;
};

export const Visible = ({ children }) => {
  const { sesion } = useAuthContext();

  if (!sesion ) {
    return (
      <div className="flex gap-4 mr-3">
        <Link to="/login">
          <Boton btnNombre="Iniciar Sesión" />
        </Link>
        <Link to="/registro">
          <Boton btnNombre="Registrate" />
        </Link>
      </div>
      
    )
        
    
    
  }
  return children;
};