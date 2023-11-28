import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexto/AuthContext";
import { Boton } from "../componentes/Boton";

export const RequiredAuth = ({ children }) => {
  const { sesion } = useAuthContext();
  const location = useLocation();

  if (!sesion) {
    return <Navigate to="/login" state={{ from: location }} replace />
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