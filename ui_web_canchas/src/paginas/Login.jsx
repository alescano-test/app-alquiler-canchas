import { useState } from "react";
import axios from "axios";
import { Boton } from "../componentes/Boton";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const enviarInfoUsuario = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/cuentas", {
        usuario,
        password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("usuario:", usuario);
    console.log("password:", password);
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
          <form
            className="flex flex-col p-10 gap-3 font-base"
            onSubmit={enviarInfoUsuario}
          >
            <input
              className="input input-bordered"
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              className="input input-bordered"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="form-control m-auto">
              <Boton type="submit" btnNombre="Ingresar" />
            </div>
          </form>
        </div>
        
      </div>
    </>
  );
}
