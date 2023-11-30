import { useState, useEffect } from "react";
import { useAuthContext } from "../contexto/AuthContext";
import axios from "axios";

export const Turnos = () => {
  const { sesion } = useAuthContext();
  const [canchas, setCanchas] = useState([]);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState("disponible");
  const [turnos, setTurnos] = useState([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [clubes, setClubes] = useState([]);
  const [clubSeleccionado, setClubSeleccionado] = useState(null);
  

  useEffect(() => {
    cargarClubes();
    cargarTurnos();
  }, [turnos]);

  useEffect(() => {
    if (clubSeleccionado) {
      cargarCanchasPorClub(clubSeleccionado.clubId);
    }
  }, [clubSeleccionado]);

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

  const cargarCanchasPorClub = async (clubId) => {
    try {
      const response = await axios.get(`http://localhost:3000/clubes/${clubId}/canchas`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });
      setCanchas(response.data);
    } catch (error) {
      console.error("Error al cargar Canchas:", error);
    }
  };


  const cargarTurnos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/turnos", {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });
      setTurnos(response.data);
    } catch (error) {
      console.error("Error al cargar Turnos:", error);
    }
  };

  const agregarTurno = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/turnos",
        {
          cancha: canchaSeleccionada,
          fecha: fecha,
          hora: hora,
          precio: precio,
          estado: estado,
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );
      setTurnos([...turnos, response.data]);
      limpiarCampos();
    } catch (error) {
      console.error("Error al agregar Turno:", error);
    }
  };

  const eliminarTurno = async (turnoId) => {
    try {
      await axios.delete(`http://localhost:3000/turnos/${turnoId}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });
      const turnoEliminado = turnos.filter(
        (turno) => turno.turnoId !== turnoId
      );
      setTurnos(turnoEliminado);
    } catch (error) {
      console.error("Error al eliminar turno:", error);
    }
  };

  const limpiarCampos = () => {
    setCanchaSeleccionada("");
    setFecha("");
    setHora("");
    setPrecio("");
    setEstado("disponible");
    setTurnoSeleccionado(null);
  };

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: "url(https://4tv4.short.gy/B8YtyN)" }}
    >
      <div className="min-w-full min-h-full">
        <div className="max-h-20 text-center p-5 mb-5 py-14">
          <p className="font-base font-bold tracking-wide text-4xl text-verde-oscuro">
            Gestioná los turnos!
          </p>
        </div>

        <div className="flex justify-center flex-row gap-8 mx-auto">
          <form className="flex flex-col p-5 gap-4 font-base w-1/2 ml-6">
            <select
              className="form-select h-10 hover:border-slate-400 rounded-md border-2 border-verde-claro font-base"
              name="club"
              value={clubSeleccionado ? clubSeleccionado.clubId : ""}
              onChange={(e) =>
                setClubSeleccionado(
                  clubes.find((club) => club.clubId === +e.target.value)
                )
              }
            >
              <option value="" disabled>
                Seleccione un club
              </option>
              {clubes.map((club) => (
                <option key={club.clubId} value={club.clubId}>
                  {club.nombre}
                </option>
              ))}
            </select>

            <select
              className="form-select h-10 hover:border-slate-400 rounded-md border-2 border-verde-claro font-base"
              name="cancha"
              value={canchaSeleccionada}
              onChange={(e) => setCanchaSeleccionada(e.target.value)} // Esto debe ser solo el ID de la cancha
            >
              {canchas.map((cancha) => (
                <option key={cancha.canchaId} value={cancha.canchaId}>
                  Cancha: {cancha.canchaId}, Deporte: {cancha.tipo_deporte},
                  Cant. jugadores: {cancha.cant_jugadores}
                </option>
              ))}
            </select>

            <label>Fecha</label>
            <input
              type="date"
              className="input input-bordered"
              name="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />

            <label>Hora</label>
            <input
              type="time"
              className="input input-bordered"
              name="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />

            <input
              type="number"
              className="input input-bordered"
              placeholder="Precio"
              name="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />

            <select
              className="input input-bordered"
              placeholder="Estado del turno"
              name="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="disponible">Disponible</option>
              <option value="ocupado">Ocupado</option>
            </select>

            <button
              className="rounded-full bg-verde-claro font-texts font-bold h-10 w-48 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-amarillo"
              type="button"
              onClick={turnoSeleccionado ? guardarCambios : agregarTurno}
            >
              {turnoSeleccionado ? "Guardar" : "Agregar"}
            </button>
          </form>

          <div className="flex w-full p-2 mr-6">
            <table className="table table-auto font-base min-h-full max-h-24 border-spacing-y-15 ">
              <thead className="table-success ">
                <tr className="text-xl text-verde-oscuro">
                  <th>Cancha</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((turno) => (
                  <tr
                    key={turno.turnoId}
                    className="text-negro text-lg font-semibold"
                  >
                    <td>{turno.cancha}</td>
                    <td>{turno.fecha}</td>
                    <td>{turno.hora}</td>
                    <td>{turno.precio}</td>
                    <td>{turno.estado}</td>
                    <td>
                      <button onClick={() => eliminarTurno(turno.turnoId)}>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          height="2em"
                          width="2em"
                        >
                          <path d="M6.5 1h3a.5.5 0 01.5.5v1H6v-1a.5.5 0 01.5-.5zM11 2.5v-1A1.5 1.5 0 009.5 0h-3A1.5 1.5 0 005 1.5v1H2.506a.58.58 0 00-.01 0H1.5a.5.5 0 000 1h.538l.853 10.66A2 2 0 004.885 16h6.23a2 2 0 001.994-1.84l.853-10.66h.538a.5.5 0 000-1h-.995a.59.59 0 00-.01 0H11zm1.958 1l-.846 10.58a1 1 0 01-.997.92h-6.23a1 1 0 01-.997-.92L3.042 3.5h9.916zm-7.487 1a.5.5 0 01.528.47l.5 8.5a.5.5 0 01-.998.06L5 5.03a.5.5 0 01.47-.53zm5.058 0a.5.5 0 01.47.53l-.5 8.5a.5.5 0 11-.998-.06l.5-8.5a.5.5 0 01.528-.47zM8 4.5a.5.5 0 01.5.5v8.5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" />
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
  );
};



const handleComprarBoleto = async () => {
  try {
    const responseAsiento = await axios.get(
      `http://localhost:3000/asientos/${nuevoBoleto.asiento}/detalle`
    );
    const asientoDetalle = responseAsiento.data;

    if (asientoDetalle.estado === "libre") {
      const responseBoleto = await axios.post(
        "http://localhost:3000/boletos",
        {
          idcolectivo: nuevoBoleto.idColectivo,
          precio: nuevoBoleto.precio,
          destino: nuevoBoleto.destino,
          asiento: nuevoBoleto.asiento,
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      setMensaje(`Boleto comprado: ${responseBoleto.data}`);

      // Actualizar el estado del asiento a 'reservado' mediante la solicitud PUT
      await axios.put(
        `http://localhost:3000/asientos/${nuevoBoleto.asiento}`,
        { estado: "reservado" }
      );

      setNuevoBoleto({
        idColectivo: "",
        precio: "",
        destino: "",
        asiento: "",
      });
      setAsientosSeleccionados([]);
    } else {
      setMensaje("El asiento no está libre. Por favor, elija otro.");
      setModalTitle("Error en Comprar el Boleto"); // Cambiar el título del Modal en caso de error
    }
  } catch (error) {
    console.error("Error al comprar boleto:", error);
    setError("Error al comprar boleto. Inténtalo de nuevo más tarde.");
    setModalTitle("Error en Comprar el Boleto"); // Cambiar el título del Modal en caso de error
  }

  // Mostrar el Modal después de comprar el boleto o en caso de error
  setShowModal(true);
};