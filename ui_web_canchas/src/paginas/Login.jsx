import { useState } from "react";
import axios from "axios";
import { Boton } from "../componentes/Boton";
import { Link } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [online, setOnline] = useState(false);

  const enviarInfoUsuario = async (e) => {
    e.preventDefault();
    const resp = await axios
      .post("http://localhost:3000/auth/login", {
        usuario,
        password,
      });
      const data = resp.json();
      console.log(data)

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
              <Link to= "/">
                <Boton btnNombre="Ingresar" />
              </Link>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
