import { useAuthContext } from "../AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Boton } from "../componentes/Boton";
import { Input } from "../componentes/Input";
import {AuthProvider} from "../AuthContext"

export default function Registro() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const location = useLocation();
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const cargarInfoUsuario = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/personas/crear-persona-cuenta", {
        usuario,
        password,
        nombre,
        apellido,
      }).then(function (response) {
        console.log(response.data)
        if (response.data.mensaje === "Terminó correctamente."){
          console.log("registrado");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
          <form
            className="flex flex-col p-10 gap-3 font-base"
            onSubmit={cargarInfoUsuario}
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
            <input
              className="input input-bordered"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              className="input input-bordered"
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
            {/* <Input
              inputNombre="Usuario"
              value={usuario}
              tipo="text"
              onChange={(e) => setUsuario(e.target.value)}
            />
            <Input
              inputNombre="Contraseña"
              value={password}
              tipo="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              inputNombre="Nombre"
              value={nombre}
              tipo="text"
              onChange={(e) => setNombre(e.target.value)}
            />
            <Input
              inputNombre="Apellido"
              value={apellido}
              tipo="text"
              onChange={(e) => setApellido(e.target.value)}
            /> */}
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
              <Boton type="submit" btnNombre="Registrate" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
