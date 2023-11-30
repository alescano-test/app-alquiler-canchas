import { useState, useEffect } from "react";
import { useAuthContext } from "../contexto/AuthContext";
import axios from "axios";

export const Clubes = () => {
  const { sesion } = useAuthContext();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [clubes, setClubes] = useState([]);
  const [clubSeleccionado, setClubSeleccionado] = useState(null);

  useEffect(() => {
    cargarClubes();
  }, [clubes]);

  const cargarClubes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clubes", {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });
      setClubes(response.data);
    } catch (error) {
      console.error("Error al cargar Clubes:", error);
    }
  };

  const agregarClub = async () => {
    try {
      // Validación para verificar si el nombre del club ya existe
      const existeClub = clubes.some((club) => club.nombre === nombre);
      if (existeClub) {
        alert("El nombre del club ya existe.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/clubes",
        {
          nombre: nombre,
          direccion: direccion,
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      setClubes([...clubes, response.data]);
      setDireccion("");
      setNombre("");
    } catch (error) {
      console.error("Error al agregar Club:", error);
    }
  };

  const editarClub = (club) => {
    setClubSeleccionado(club);
    setNombre(club.nombre);
    setDireccion(club.direccion);
  };

  const guardarCambios = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/clubes/${clubSeleccionado.clubId}`,
        {
          nombre: nombre,
          direccion: direccion,
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      const clubesActualizados = clubes.map((club) =>
        club.clubId === clubSeleccionado.clubId ? response.data : club
      );

      setClubes(clubesActualizados);
      setDireccion("");
      setNombre("");
      setClubSeleccionado(null);
    } catch (error) {
      console.error("Error al modificar club:", error);
    }
  };

  const eliminarClub = async (clubId) => {
    try {
      await axios.delete(`http://localhost:3000/clubes/${clubId}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });
      const clubEliminado = clubes.filter((club) => club.clubId !== clubId);
      setClubes(clubEliminado);
    } catch (error) {
      console.error("Error al eliminar club:", error);
    }
  };

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: "url(https://4tv4.short.gy/7wIHtK)" }}
      >
        <div className="min-w-full min-h-full">
          <div className="text-center p-5 pt-10 h-32">
            <p className="font-base font-bold tracking-wide text-4xl text-amarillo">
              Controla tus clubes!
            </p>
          </div>
          <div className="flex flex-row gap-8 mx-auto">
            <form className="flex flex-col p-5 gap-4 font-base w-1/2 ml-6">
              <input
                name="nombre"
                type="text"
                className="input input-bordered"
                placeholder="Nombre del Club"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <input
                name="direccion"
                type="text"
                className="input input-bordered"
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />

              <button
                className="rounded-full bg-verde-claro font-texts font-bold h-10 w-48 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-amarillo"
                type="button"
                onClick={clubSeleccionado ? guardarCambios : agregarClub}
              >
                {clubSeleccionado ? "Guardar" : "Agregar"}
              </button>
            </form>

            <div className="flex w-full p-2 mr-6">
              <table className="table table-auto font-base min-h-full max-h-24 border-spacing-y-15">
                <thead className="table-success">
                  <tr className="text-blanco text-xl">
                    <th className="font-base">Nombre del club</th>
                    <th className="font-base">Dirección</th>
                  </tr>
                </thead>

                <tbody>
                  {clubes.map((club) => (
                    <tr key={club.clubId} className="text-blanco text-sm">
                      <td>{club.nombre}</td>
                      <td>{club.direccion}</td>
                      <td>
                        <button onClick={() => eliminarClub(club.clubId)}>
                          <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="2em"
                            width="2em"
                          >
                            <path d="M6.5 1h3a.5.5 0 01.5.5v1H6v-1a.5.5 0 01.5-.5zM11 2.5v-1A1.5 1.5 0 009.5 0h-3A1.5 1.5 0 005 1.5v1H2.506a.58.58 0 00-.01 0H1.5a.5.5 0 000 1h.538l.853 10.66A2 2 0 004.885 16h6.23a2 2 0 001.994-1.84l.853-10.66h.538a.5.5 0 000-1h-.995a.59.59 0 00-.01 0H11zm1.958 1l-.846 10.58a1 1 0 01-.997.92h-6.23a1 1 0 01-.997-.92L3.042 3.5h9.916zm-7.487 1a.5.5 0 01.528.47l.5 8.5a.5.5 0 01-.998.06L5 5.03a.5.5 0 01.47-.53zm5.058 0a.5.5 0 01.47.53l-.5 8.5a.5.5 0 11-.998-.06l.5-8.5a.5.5 0 01.528-.47zM8 4.5a.5.5 0 01.5.5v8.5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" />
                          </svg>
                        </button>
                        <br />
                        <br />
                        <button onClick={() => editarClub(club)}>
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="2em"
                            width="2em"
                          >
                            <path d="M7 17.013l4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z" />
                            <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
