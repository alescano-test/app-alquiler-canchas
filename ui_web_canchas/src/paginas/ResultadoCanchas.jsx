import { useEffect, useState } from "react";
import { Cancha } from "../componentes/Cancha";
import axios from "axios";
import { useAuthContext } from "../contexto/AuthContext";

export const ResultadoCanchas = () => {
  const [canchas, setCanchas] = useState([]);
  const { sesion } = useAuthContext();
  const [reservas, setReservas] = useState([])

  useEffect(() => {
    const buscarTurnos = async () => {
      const datosTurnos = await axios.get(
        `http://localhost:3000/turnos`,
        {
          headers: {
            Authorization: `Bearer ${sesion}`,
          },
        }
      );
      const datos = datosTurnos.data;
      console.log(datos);
      setCanchas(datos);
    };

    // const reservarCancha = async () => {
    //   const datosReserva = await axios.post(
    //     `http://localhost:3000/cuentas/generar-reserva`,
    //     {
    //       cancha_id: canchas.id_cancha,
    //       fecha: canchas.fecha,
    //       hora_turno: canchas.hora_turno,
    //       estado_turno: 2,
    //       id: sesion.id,
    //     }
    //   );
    //   const datos = datosReserva.data;
    //   setReservas(datos)
    // };
    buscarTurnos();
  }, []);

  

  return (
    <>
      <div className="hero min-h-screen flex flex-col flex-wrap p-8 py-6">
        <div className="grid grid-cols-2 gap-6">
          {canchas.map((turno) => {
            return (
              <Cancha
                imagen={
                  <iframe
                    src="https://giphy.com/embed/oqWEEn8VBrlqp7HBqb"
                    width="480"
                    height="238"
                    class="giphy-embed"
                    allowFullScreen
                  ></iframe>
                }
                precio={turno.precio}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
