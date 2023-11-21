import { useState } from "react";
import axios from "axios";

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
