import { useEffect, useState } from "react";
import { useAuthContext } from "../AuthContext";
import axios from "axios";
import { BotonReservas } from "./BotonReservas";

export const Lista = ({encabezado1, encabezado2, encabezado3} ) => {
  const { sesion } = useAuthContext();
  const [reservas, setDatosReservas] = useState([]);

  useEffect(() => {
    const buscarReservas = async () => {
      const datosReservas = await axios.get(
        `http://localhost:3000/cuentas/${sesion.id}/reservas`);
      const datos = datosReservas.data;
      setDatosReservas(datos);
    };
    buscarReservas();
  }, []);

  return (
    <>
      <div className="bg-fondo min-h-screen flex flex-col p-8 py-6">
        <table className="table-auto font-base min-h-full max-h-24 border-spacing-y-15 ">
          <thead className="">
            <tr className="text-blanco ">
                <th className=""> </th>
                <th className="text-start">{encabezado1}</th>
                <th className="text-start">{encabezado2}</th>
                <th className="text-start">{encabezado3}</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => {
                return (
                    <tr className="text-blanco" key={reserva.id_reserva}>
                        <td className=""><BotonReservas /></td>
                        <td className="">{reserva.fecha}</td>
                        <td className="">{reserva.hora}</td>
                        <td className="">{reserva.direccion}</td>
                        <td className="">{reserva.estado_reserva}</td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
