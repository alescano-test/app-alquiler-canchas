import { useEffect, useState } from "react";
import { useAuthContext } from "../contexto/AuthContext";
import axios from "axios";


export const Reservas = () => {
  const { sesion } = useAuthContext();
  const [reservas, setDatosReservas] = useState([]);

  useEffect(() => {
    const buscarReservas = async () => {
      const datosReservas = await axios.get(
        `http://localhost:3000/cuentas/${sesion.id}/reservas`
      );
      const datos = datosReservas.data;
      setDatosReservas(datos);
    };
    buscarReservas();
  }, []);


  //ELIMINAR RESERVA
  const handleDeleteReservation = async () => {
    const deleteUrl = `http://localhost:3000/reservas/${id}`; 

    const response = await axios.delete(deleteUrl); 

    if (response.status === 200) {
    } else {
      console.error('Error deleting reservation:', response);
    }
  };

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
                    <tr key={reserva.id_reserva} className="text-blanco" >
                        <td className=""></td>
                        <td className="">{reserva.fecha}</td>
                        <td className="">{reserva.hora}</td>
                        <td className="">{reserva.direccion}</td>
                        <td className="">
                          <button onClick={handleDeleteReservation}>
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
                );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
