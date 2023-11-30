import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexto/AuthContext";
import axios from "axios";
import { MensajeError } from "../componentes/MensajeError";

export const Reservas = () => {
  const { sesion } = useAuthContext();
  const [clubes, setClubes] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [clubSeleccionado, setClubSeleccionado] = useState("");
  const [canchaSeleccionada, setCanchaSeleccionada] = useState("");
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    cargarClubes();
    cargarReservas();
  }, []);

  useEffect(() => {
    if (clubSeleccionado) {
      cargarCanchasPorClub(clubSeleccionado.clubId);
    }
  }, [clubSeleccionado]);

  useEffect(() => {
    if (canchaSeleccionada) {
      cargarTurnosPorCancha(canchaSeleccionada.canchaId);
    }
  }, [canchaSeleccionada]);

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
      const response = await axios.get(
        `http://localhost:3000/clubes/${clubId}/canchas`,
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );
      setCanchas(response.data);
    } catch (error) {
      console.error("Error al cargar Canchas:", error);
    }
  };

  const cargarTurnosPorCancha = async (canchaId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/turnos/turnosporcancha/${canchaId}`,
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );
      setTurnos(response.data);
    } catch (error) {
      console.error("Error al cargar Turnos:", error);
    }
  };


  const cargarReservas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/reservas/detalles/todos", {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });
      setReservas(response.data);
    } catch (error) {
      console.error("Error al cargar Reservas:", error);
    }
  };


  const reservarTurno = async () => {
    try {
      const responseTurno = await axios.get(`http://localhost:3000/turnos/${turnoSeleccionado.turnoId}`);
      const detalleTurno = responseTurno.data;

      if(detalleTurno.estado === "disponible") {
        await axios.post("http://localhost:3000/reservas", {
          turno: turnoSeleccionado.turnoId,
          usuario: sesion.id,
          estado: "activa"
        }, 
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        });
        cargarReservas();
        setMensaje("Turno reservado");

        await axios.put(
          `http://localhost:3000/turnos/${turnoSeleccionado.turnoId}`,
          {
            cancha: turnoSeleccionado.cancha,
            precio: turnoSeleccionado.precio,
            fecha: turnoSeleccionado.fecha,
            hora: turnoSeleccionado.hora,
            estado: "ocupado",
          },
          {
            headers: { Authorization: `Bearer ${sesion.token}` },
          }
        );

        setReservas([...reservas, responseTurno.data]);
        setTurnoSeleccionado(responseTurno.data);
        cargarTurnosPorCancha(canchaSeleccionada.canchaId);
        limpiarCampos();
      } else {
        setMensaje("No se pueden reservar turnos ocupados");
      }

    } catch (error) {
      setError(true)  
      console.error("Error al reservar turno:", error);  
    }
  };

  const eliminarReserva = async (reservaId) => {
    try {
      const turnoId = reservaSeleccionada.turno.turnoId;

      await axios.delete(`http://localhost:3000/reservas/${reservaId}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });

      
      await axios.put(
        `http://localhost:3000/turnos/${turnoId}`,
        {
          estado: "disponible",
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      const reservaEliminada = reservas.filter(
        (reserva) => reserva.reservaId !== reservaId
      );
      setReservas(reservaEliminada);
      cargarTurnosPorCancha(canchaSeleccionada.canchaId);
      cargarTurnos();
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    }
  };

  const limpiarCampos = () => {
    setReservaSeleccionada(null);
  };


  //ELEMENTOS DEL FRONT
  return (
    <div className="flex justify-center flex-row gap-8 sm:flex-col mx-auto">
      <form className="flex flex-col p-5 gap-4 font-base w-full">
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
          value={canchaSeleccionada ? canchaSeleccionada.canchaId : ""}
          onChange={(e) =>
            setCanchaSeleccionada(
              canchas.find((cancha) => cancha.canchaId === +e.target.value)
            )
          }
        >
          <option value="" disabled>
            Seleccione una cancha
          </option>
          {canchas.map((cancha) => (
            <option key={cancha.canchaId} value={cancha.canchaId}>
              {`Cancha: ${cancha.canchaId}, Deporte: ${cancha.tipo_deporte}, Cant. jugadores: ${cancha.cant_jugadores}`}
            </option>
          ))}
        </select>

        <select
          className="form-select h-10 hover:border-slate-400 rounded-md border-2 border-verde-claro font-base"
          name="turno"
          value={turnoSeleccionado ? turnoSeleccionado.turnoId : ""}
          onChange={(e) =>
            setTurnoSeleccionado(
              turnos.find((turno) => turno.turnoId === +e.target.value)
            )
          }
        >
          <option value="" disabled>
            Seleccione un turno
          </option>
          {turnos.map((turno) => (
            <option key={turno.turnoId} value={turno.turnoId}>
              {`Fecha: ${turno.fecha}, Hora: ${turno.hora}, Precio: ${turno.precio}, Estado: ${turno.estado}`}
            </option>
          ))}
        </select>

        {error && <MensajeError mensaje={mensaje} />}

        <button
          className="rounded-full bg-verde-claro font-texts font-bold h-10 w-full sm:w-48 
          transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-amarillo"
          type="button"
          onClick={reservaSeleccionada ? guardarCambios : reservarTurno}
        >
          {reservaSeleccionada ? "Guardar" : "Reservar"}
        </button>
      </form>

      <div className="flex w-full p-2 mr-6 overflow-x-auto">
        <table className="table table-auto font-base min-h-full max-h-24 border-spacing-y-15 max-w-7xl">
          <thead className="table-success ">
            <tr className="text-lg text-verde-oscuro">
              <th>Id Reserva</th>
              <th>Club</th>
              <th>Id Cancha</th>
              <th>Deporte</th>
              <th>Fecha del turno</th>
              <th>Hora del turno</th>
              <th>Precio del turno</th>
              <th>Estado de Reserva</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr
                key={reserva.reservaId}
                className="text-negro text-sm font-semibold"
              >
                <td>{reserva.reservaId}</td>
                <td>{reserva.nombre_club}</td>
                <td>{reserva.canchaId}</td>
                <td>{reserva.tipo_deporte}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.hora}</td>
                <td>{reserva.estado}</td>

                <td>
                  <button onClick={() => eliminarReserva(reserva.reservaId)}>
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
  );
};
