import { useAuthContext } from "../contexto/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Boton } from "../componentes/Boton";
import { MensajeError } from "../componentes/MensajeError";

export const Registro = () => {
    
  const { logueado, login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const userName = formData.get("userName");
    const userPassword = formData.get("userPassword");
    const nombre = formData.get("nombre");
    const apellido = formData.get("apellido");

    logueado(
      userName,
      userPassword,
      nombre,
      apellido,
      () => navigate(from, { replace: true }),
      () => setError(true)
    );

    if (!error) {
      login(
        userName,
        userPassword,
        () => navigate(from, { replace: true }),
        () => setError(true)
      );
    }

    event.preventDefault();
  };

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: "url(https://4tv4.short.gy/ZfJnOv)" }}
      >
        <div className="container w-auto h-96 ">
          <div className="max-h-20 font-texts p-10">
            <p className="font-base font-bold tracking-wide text-5xl text-blanco">
              Registrate para obtener beneficios!
            </p>
          </div>
          <div>
            <form onSubmit={onSubmit} className="flex flex-col p-10 gap-3 font-base">
              <input name="userName" type="text" className="input input-bordered" placeholder="Usuario" />
              <input name="userPassword" type="password" className="input input-bordered" placeholder="Contraseña" />
              <input name="nombre" type="text" className="input input-bordered" placeholder="Nombre" />
              <input name="apellido" type="text" className="input input-bordered" placeholder="Apellido" />

              {error && <MensajeError mensaje="Ups! No se pudo registrar el usuario" />}

              <div className="form-control m-auto">
                <Boton btnNombre="Registrar" type="submit" />
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
