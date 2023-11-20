import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const enviarInfoUsuario = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/cuentas", {
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
    <div className="w-full h-full">
      <div className="flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-2xl">Iniciar Sesión</h1>
          <form className="mt-5" onSubmit={enviarInfoUsuario}>
            <input
              className="w-full p-2 rounded"
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              className="w-full p-2 rounded"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-black text-white text-base font-bold p-2 rounded cursor-pointer hover:bg-green-500"
              type="submit"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
}