import { useState } from "react";

export default function IniciarSesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-2xl">Iniciar Sesión</h1>
          <form className="mt-5" onSubmit={handleSubmit}>
            <input
              className="w-full p-2 rounded"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
  );
}
