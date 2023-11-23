import { useAuthContext } from "../contexto/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Boton } from "../componentes/Boton";

export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { login, sesion, setSesion } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);


  const from = location.state?.from?.pathname || "/";

  const enviarInfoUsuario = (event) => {
    const formData = new FormData(event.currentTarget);
    const usuario = formData.get("usuario");
    const password = formData.get("password");

    login(
      usuario,
      password,
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
              Registrate y controlá tus reservas!
            </p>
          </div>
          <form onSubmit={enviarInfoUsuario}
            className="flex flex-col p-10 gap-3 font-base"
          >
            <input
              className="input input-bordered"
              type="text"
              placeholder="Usuario"
              name="usuario"
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              className="input input-bordered"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div role="alert" className="alert alert-error font-base ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Error! Usuario o contraseña inválido.</span>
              </div>
            )}  

            
            <div className="form-control m-auto">
              <Boton type="submit" btnNombre="Ingresar"/>
            </div>

            
          </form>
          
        </div>
      </div>
    </>
  );
};
