import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexto/AuthContext";

export const RequiredAuth = ({ children }) => {
  const { sesion } = useAuthContext();
  const location = useLocation();

  if (!sesion) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export const Visible = ({ children }) => {
  const { sesion } = useAuthContext();

  if (!sesion) {
    return (
      <div className="flex gap-4 justify-end">
        <Link to="/login">
          |
          <button
            className="rounded-full
            bg-verde-claro 
              font-texts
              font-bold
              h-10 w-48 
              transition 
              ease-in-out 
              delay-50 
              hover:-translate-y-1 
              hover:scale-110 duration-300
            hover:bg-amarillo"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </Link>
        <Link to="/registro">
          <button
            className="rounded-full
            bg-verde-claro 
              font-texts
              font-bold
              h-10 w-48 
              transition 
              ease-in-out 
              delay-50 
              hover:-translate-y-1 
              hover:scale-110 duration-300
            hover:bg-amarillo"
            type="submit"
          >
            Registrate
          </button>
        </Link>
      </div>
    );
  }
  return children;
};
