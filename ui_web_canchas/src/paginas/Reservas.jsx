import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexto/AuthContext";
import axios from "axios";

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

  useEffect(() => {
    cargarClubes();
  }, []);

  useEffect(() => {
    if (clubSeleccionado) {
      cargarCanchasPorClub(clubSeleccionado.clubId);
    }
  }, [clubSeleccionado]);

  useEffect(() => {
    if (canchaSeleccionada) {
      cargarTurnosPorCancha(canchaSeleccionada.canchaId);
      cargarReservasPorCancha(canchaSeleccionada.canchaId);
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
        `http://localhost:3000/canchas/${canchaId}/turnos`,
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );
      setTurnos(response.data);
    } catch (error) {
      console.error("Error al cargar Turnos:", error);
    }
  };

  const cargarReservasPorCancha = async (canchaId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/canchas/${canchaId}/reservas`,
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );
      setReservas(response.data);
    } catch (error) {
      console.error("Error al cargar Reservas:", error);
    }
  };

  const reservarTurno = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/reservas",
        {
          usuario: sesion.usuario,
          turno: turnoSeleccionado,
          estado: "ocupado",
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      // Cambiar el estado del turno a "ocupado"
      await axios.put(
        `http://localhost:3000/turnos/${turnoSeleccionado.turnoId}`,
        {
          estado: "ocupado",
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      setReservas([...reservas, response.data]);
      cargarTurnosPorCancha(canchaSeleccionada.canchaId);
      limpiarCampos();
    } catch (error) {
      console.error("Error al reservar turno:", error);
    }
  };

  const eliminarReserva = async (reservaId) => {
    try {
      const turnoId = reservaSeleccionada.turno.turnoId;

      await axios.delete(`http://localhost:3000/reservas/${reservaId}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });

      // Cambiar el estado del turno a "disponible" al eliminar la reserva
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
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    }
  };

  const limpiarCampos = () => {
    setReservaSeleccionada(null);
  };

  return (
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
              {`Fecha: ${turno.fecha}, Hora: ${turno.hora}, Precio: ${turno.precio}`}
            </option>
          ))}
        </select>

        <button
          className="rounded-full bg-verde-claro font-texts font-bold h-10 w-48 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-amarillo"
          type="button"
          onClick={reservaSeleccionada ? guardarCambios : reservarTurno}
        >
          {reservaSeleccionada ? "Guardar" : "Reservar"}
        </button>
      </form>

      <div className="flex w-full p-2 mr-6">
        <table className="table table-auto font-base min-h-full max-h-24 border-spacing-y-15 ">
          {/* Encabezados de la tabla */}
          <thead className="table-success ">
            {/* ... (otros encabezados) */}
            <th>Acciones</th>
          </thead>
          <tbody>
            {/* Filas de la tabla */}
            {reservas.map((reserva) => (
              <tr
                key={reserva.reservaId}
                className="text-negro text-lg font-semibold"
              >
                {/* ... (otras columnas) */}
                <td>
                  <button onClick={() => eliminarReserva(reserva.reservaId)}>
                    Eliminar Reserva
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
