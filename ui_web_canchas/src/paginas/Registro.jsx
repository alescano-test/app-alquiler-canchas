import { useAuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Boton } from "../componentes/Boton";

export default function Registro() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  
  const enviarInfoUsuario = async () => {
    
    const response = await axios.post("http://localhost:3000/personas/crear-persona-cuenta", {
      usuario,
      password,
      nombre,
      apellido,
    });
    
    login(
      usuario,
      password,
      () => navigate("/"),
      () => setError(true)
    );
    e.preventDefault();

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
            onSubmit={enviarInfoUsuario}
          >
           <input
              className="input input-bordered"
              type="text"
              placeholder="Usuario"
              name="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              className="input input-bordered"
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="input input-bordered"
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              className="input input-bordered"
              type="text"
              placeholder="Apellido"
              name="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
            
            <div className="form-control m-auto">
              <Boton type="submit" btnNombre="Registrate" />
            </div>
            
          </form>
          
          
        </div>
      </div>
    </>
  );
}
