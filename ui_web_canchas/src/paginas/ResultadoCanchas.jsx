import { useEffect, useState } from "react";
import { Cancha } from "../componentes/Cancha";
import axios from "axios";
import { useAuthContext } from "../AuthContext";

export default function ResultadoCanchas() {
  const [canchas, setCanchas] = useState([]);
  const { sesion } = useAuthContext();

  useEffect(() => {
    const buscarTurnos = async () => {
      const datosTurnos = await axios.post(`http://localhost:3000/cuentas/${sesion.id}/filtrar-turnos`, {
        "fecha": "2023-11-23",
        "hora_turno": "21:00:00",
        "tipo_deporte": "Voley"
      });
      const datos = datosTurnos.data;
      setCanchas(datos);
    };
    buscarTurnos();
  }, []);

  return (
    <>
      <div className="hero min-h-screen flex flex-col flex-wrap p-8 py-6">
        <div className="grid grid-cols-2 gap-6">
          {canchas.map((turno) => {
            return (
              <Cancha
                imagen={<iframe src="https://giphy.com/embed/oqWEEn8VBrlqp7HBqb" width="480" height="238" class="giphy-embed" allowFullScreen></iframe>}
                nombreClub={turno.nombre}
                dimensiones={turno.dimensiones}
                precio={turno.precio}
                suelo={turno.suelo}
              />
            );
          })}

        </div>
        
      </div>
    </>
  );
}
