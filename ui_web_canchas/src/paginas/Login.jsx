import { useAuthContext } from "../contexto/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { MensajeError } from "../componentes/MensajeError";

export const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const userName = formData.get("userName");
    const userPassword = formData.get("userPassword");

    login(
      userName,
      userPassword,
      () => navigate(from, { replace: true }),
      () => setError(true)
    );

    event.preventDefault();
  };
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: "url(https://4tv4.short.gy/ZTtXLq)" }}
      >
        <div className="container w-auto h-96 ">
          <div className="max-h-20 font-texts p-10">
            <p className="font-base font-bold tracking-wide text-5xl text-amarillo">
              Loguea y controlá tus reservas!
            </p>
          </div>
          <div>
            <form onSubmit={onSubmit} className="flex flex-col p-10 gap-3 font-base">
              <input name="userName" type="text" className="input input-bordered" placeholder="Usuario" />
              <input name="userPassword" type="password"className="input input-bordered" placeholder="Contraseña" />

              {error && <MensajeError mensaje="Error! Usuario o contraseña incorrecto" />}

              <div className="form-control m-auto">
                <button className="rounded-full
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
                  type="submit">
                    Ingresar
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
