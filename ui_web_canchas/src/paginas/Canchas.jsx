import { useState, useEffect } from "react";
import { useAuthContext } from "../contexto/AuthContext";
import axios from "axios";

export const Canchas = () => {
  const { sesion } = useAuthContext();
  const [clubes, setClubes] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [clubSeleccionado, setClubSeleccionado] = useState(null);
  const [tipoDeporte, setTipoDeporte] = useState("");
  const [cantJugadores, setCantJugadores] = useState(0);
  const [precio, setPrecio] = useState("");
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);

  useEffect(() => {
    cargarClubes();
    cargarCanchas();
  }, [canchas]);

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

  const cargarCanchas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/canchas", {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });
      setCanchas(response.data);
    } catch (error) {
      console.error("Error al cargar Canchas:", error);
    }
  };

  const agregarCancha = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/canchas",
        {
          club: clubSeleccionado.clubId,
          tipo_deporte: tipoDeporte,
          cant_jugadores: cantJugadores,
          precio: precio,
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      setCanchas([...canchas, response.data]);
      setTipoDeporte("");
      setCantJugadores(0);
      setPrecio("");
      cargarCanchas();
    } catch (error) {
      console.error("Error al agregar Cancha:", error);
    }
  };

  const editarCancha = (cancha) => {
    setCanchaSeleccionada(cancha);
    setTipoDeporte(cancha.tipo_deporte);
    setCantJugadores(cancha.cant_jugadores);
    setPrecio(cancha.precio);
  };

  const guardarCambios = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/canchas/${canchaSeleccionada.canchaId}`,
        {
          club: clubSeleccionado.clubId,
          tipo_deporte: tipoDeporte,
          cant_jugadores: cantJugadores,
          precio: precio,
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      const canchasActualizadas = canchas.map((cancha) =>
        cancha.canchaId === canchaSeleccionada.canchaId ? response.data : cancha
      );

      setCanchas(canchasActualizadas);
      setTipoDeporte("");
      setCantJugadores(0);
      setPrecio("");
      setCanchaSeleccionada(null);
    } catch (error) {
      console.error("Error al modificar cancha:", error);
    }
  };

  const eliminarCancha = async (canchaId) => {
    try {
      await axios.delete(`http://localhost:3000/canchas/${canchaId}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });
      const canchaEliminada = canchas.filter(
        (cancha) => cancha.canchaId !== canchaId
      );
      setCanchas(canchaEliminada);
    } catch (error) {
      console.error("Error al eliminar cancha:", error);
    }
  };

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: "url(https://4tv4.short.gy/oM7fAA)" }}
      >
        <div className="min-w-full min-h-full ">
          <div className="max-h-20 text-center p-5 mb-5 py-14">
            <p className="font-base font-bold tracking-wide text-4xl text-verde-oscuro">
              Controla tus canchas!
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

              <input
                type="text"
                className="input input-bordered"
                placeholder="Tipo de deporte"
                name="tipoDeporte"
                value={tipoDeporte}
                onChange={(e) => setTipoDeporte(e.target.value)}
              />

              <input
                type="number"
                className="input input-bordered"
                placeholder="Cantidad de jugadores"
                name="cantJugadores"
                value={cantJugadores}
                onChange={(e) => setCantJugadores(e.target.value)}
              />

              <input
                type="text"
                className="input input-bordered"
                placeholder="Precio de la cancha"
                name="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />

              <button
                className="rounded-full bg-verde-claro font-texts font-bold h-10 w-48 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-amarillo"
                type="button"
                onClick={canchaSeleccionada ? guardarCambios : agregarCancha}
              >
                {canchaSeleccionada ? "Guardar" : "Agregar"}
              </button>
            </form>

            <div className="flex w-full p-2 mr-6">
              <table className="table table-auto font-base min-h-full max-h-24 border-spacing-y-15 ">
                <thead className="table-success ">
                  <tr className="text-xl text-verde-oscuro">
                    <th className="text-start">Club</th>
                    <th className="text-start">Deporte</th>
                    <th className="text-start">Jugadores</th>
                    <th className="text-start">Precio</th>
                    <th> </th>
                  </tr>
                </thead>

                <tbody>
                  {canchas.map((cancha) => (
                    <tr key={cancha.canchaId} className="text-negro text-lg font-semibold">
                      <td>{cancha.canchaId}</td>
                      <td>{cancha.tipo_deporte}</td>
                      <td>{cancha.cant_jugadores}</td>
                      <td>{cancha.precio}</td>
                      <td>
                        <button onClick={() => eliminarCancha(cancha.canchaId)}>
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
                        <button onClick={() => editarCancha(cancha)}>
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

// import { useEffect, useState } from "react";
// import { useAuthContext } from "../contexto/AuthContext";
// import axios from "axios";

// export const Canchas = () => {
//   const { sesion } = useAuthContext();
//   const [nuevaCancha, setNuevaCancha] = useState({
//     club: "",
//     tipo_deporte: "",
//     cant_jugadores: "",
//     precio: "",
//   });
//   const [canchas, setCanchas] = useState([]);
//   const [canchaCompleta, setCanchaCompleta] = useState([]);
//   const [idCanchaEditada, setIdCanchaEditada] = useState(null);

//   useEffect(() => {
//     const buscarCanchas = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/canchas", {
//           headers: { Authorization: `Bearer ${sesion.token}` },
//         });
//         setCanchaCompleta(response.data);
//         setCanchas(response.data);
//       } catch (error) {
//         console.error("Error al obtener canchas", error);
//       }
//     };

//     if (sesion && sesion.token) {
//       buscarCanchas();
//     }
//   }, [sesion, canchas]);

//   const agregarCancha = async () => {
//     try {
//       if (idCanchaEditada) {
//         await axios.put(
//           `http://localhost:3000/canchas/${idCanchaEditada}`,
//           {
//             club: nuevaCancha.club,
//             tipo_deporte: nuevaCancha.tipo_deporte,
//             cant_jugadores: nuevaCancha.cant_jugadores,
//             precio: nuevaCancha.precio,
//           },
//           { headers: { Authorization: `Bearer ${sesion.token}` } }
//         );
//         console.log("Cancha editada");
//         buscarCanchas();
//         setNuevaCancha({
//           club: "",
//           tipo_deporte: "",
//           cant_jugadores: "",
//           precio: "",
//         });
//         setIdCanchaEditada(null);
//       } else {
//         const response = await axios.post(
//           "http://localhost:3000/canchas",
//           {
//             club: nuevaCancha.club,
//             tipo_deporte: nuevaCancha.tipo_deporte,
//             cant_jugadores: nuevaCancha.cant_jugadores,
//             precio: nuevaCancha.precio,
//           },
//           { headers: { Authorization: `Bearer ${sesion.token}` } }
//         );
//         console.log("Cancha agregada", response.data);
//         buscarCanchas();
//         setNuevaCancha({
//           club: "",
//           tipo_deporte: "",
//           cant_jugadores: "",
//           precio: "",
//         });
//       }
//     } catch (error) {
//       console.error("Error al agregar o editar cancha", error);
//     }
//   };

//   const eliminarCancha = async (canchaId) => {
//     try {
//       await axios.delete(`http://localhost:3000/canchas/${canchaId}`, {
//         headers: { Authorization: `Bearer ${sesion.token}` },
//       });
//       console.log("Cancha eliminada");
//       buscarCanchas();
//     } catch (error) {
//       console.error("Error al eliminar cancha:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNuevaCancha((prevCancha) => ({
//       ...prevCancha,
//       [name]: value,
//     }));
//   };

//   const editarCancha = (cancha) => {
//     setNuevaCancha({
//       club: cancha.club,
//       tipo_deporte: cancha.tipo_deporte,
//       cant_jugadores: cancha.cant_jugadores,
//       precio: cancha.precio,
//     });
//     setIdCanchaEditada(cancha.canchaId);
//   };

//   const confirmarEdicion = async () => {
//     try {
//       if (idCanchaEditada) {
//         await axios.put(
//           `http://localhost:3000/canchas/${idCanchaEditada}`,
//           {
//             club: nuevaCancha.club,
//             tipo_deporte: nuevaCancha.tipo_deporte,
//             cant_jugadores: nuevaCancha.cant_jugadores,
//             precio: nuevaCancha.precio,
//           },
//           {
//             headers: { Authorization: `Bearer ${sesion.token}` },
//           }
//         );
//         console.log("Cancha editada");
//         buscarCanchas();
//         setNuevaCancha({
//           club: "",
//           tipo_deporte: "",
//           cant_jugadores: "",
//           precio: "",
//         });
//         setIdCanchaEditada(null);
//       }
//     } catch (error) {
//       console.error("Error al editar cancha:", error);
//     }
//   };

//   return (
//     <>
//       <div
//         className="hero min-h-screen"
//         style={{ backgroundImage: "url(https://4tv4.short.gy/NmfPeT)" }}
//       >
//         <div className="container min-w-full h-96 ">
//           <div className="max-h-20 font-texts p-10">
//             <p className="font-base font-bold tracking-wide text-xl text-blanco">
//               Controla tus canchas!
//             </p>
//           </div>
//           <div className="flex flex-row gap-8">
//             <form
//               onSubmit={agregarCancha}
//               className="flex flex-col p-10 gap-3 font-base"
//             >
//               <input
//                 name="club"
//                 type="text"
//                 className="input input-bordered"
//                 placeholder="Club"
//                 value={nuevaCancha.club}
//                 onChange={handleChange}
//               />
//               <input
//                 name="tipo_deporte"
//                 type="text"
//                 className="input input-bordered"
//                 placeholder="Tipo de deporte"
//                 value={nuevaCancha.tipo_deporte}
//                 onChange={handleChange}
//               />
//               <input
//                 name="cant_jugadores"
//                 type="text"
//                 className="input input-bordered"
//                 placeholder="Cantidad de jugadores"
//                 value={nuevaCancha.cant_jugadores}
//                 onChange={handleChange}
//               />
//               <input
//                 name="precio"
//                 type="text"
//                 className="input input-bordered"
//                 placeholder="Precio"
//                 value={nuevaCancha.precio}
//                 onChange={handleChange}
//               />

//               {/* Botones de acción */}
//               <button
//                 className="rounded-full bg-verde-claro font-texts font-bold h-10 w-48 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-amarillo"
//                 type="submit"
//               >
//                 Agregar Cancha
//               </button>

//               {idCanchaEditada ? (
//                 <>
//                   <button
//                     className="rounded-full bg-verde-claro font-texts font-bold h-10 w-48 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-amarillo"
//                     onClick={confirmarEdicion}
//                     type="button"
//                   >
//                     Guardar
//                   </button>
//                   <button
//                     className="rounded-full bg-rojo font-texts font-bold h-10 w-48 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-amarillo"
//                     onClick={() => setIdCanchaEditada(null)}
//                     type="button"
//                   >
//                     Cancelar Edición
//                   </button>
//                 </>
//               ) : null}
//             </form>

//             <table className="table-auto font-base min-h-full max-h-24 border-spacing-y-15">
//               <thead className="">
//                 <tr className="text-blanco">
//                   <th className=""></th>
//                   <th className="text-start">Club</th>
//                   <th className="text-start">Tipo de Deporte</th>
//                   <th className="text-start">Cantidad de Jugadores</th>
//                   <th className="text-start">Precio</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {canchas.map((cancha) => (
//                   <tr key={cancha.canchaId} className="text-blanco">
//                     <td className=""></td>
//                     <td className="">{cancha.club}</td>
//                     <td className="">{cancha.tipo_deporte}</td>
//                     <td className="">{cancha.cant_jugadores}</td>
//                     <td className="">{cancha.precio}</td>
//                     <td className="">
//                       <button onClick={() => eliminarCancha(cancha.canchaId)}>
//                         <svg
//                           fill="currentColor"
//                           viewBox="0 0 16 16"
//                           height="2em"
//                           width="2em"
//                         >
//                           <path d="M6.5 1h3a.5.5 0 01.5.5v1H6v-1a.5.5 0 01.5-.5zM11 2.5v-1A1.5 1.5 0 009.5 0h-3A1.5 1.5 0 005 1.5v1H2.506a.58.58 0 00-.01 0H1.5a.5.5 0 000 1h.538l.853 10.66A2 2 0 004.885 16h6.23a2 2 0 001.994-1.84l.853-10.66h.538a.5.5 0 000-1h-.995a.59.59 0 00-.01 0H11zm1.958 1l-.846 10.58a1 1 0 01-.997.92h-6.23a1 1 0 01-.997-.92L3.042 3.5h9.916zm-7.487 1a.5.5 0 01.528.47l.5 8.5a.5.5 0 01-.998.06L5 5.03a.5.5 0 01.47-.53zm5.058 0a.5.5 0 01.47.53l-.5 8.5a.5.5 0 11-.998-.06l.5-8.5a.5.5 0 01.528-.47zM8 4.5a.5.5 0 01.5.5v8.5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" />
//                         </svg>
//                       </button>
//                       <button onClick={() => editarCancha(cancha)}>
//                         <svg
//                           viewBox="0 0 24 24"
//                           fill="currentColor"
//                           height="2em"
//                           width="2em"
//                         >
//                           <path d="M7 17.013l4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z" />
//                           <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
//                         </svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
