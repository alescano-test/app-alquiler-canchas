import { useState, useEffect } from "react";
import CanchaCard from "./CanchaCard";

export default function ListaCanchas() {
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    async function obtenerCanchas() {
      const response = await fetch("http://localhost:3000/canchas");
      const dataCancha = await response.json();
      setCanchas(dataCancha);
    }
    obtenerCanchas();
  }, []);

  return (
    <div className="">
      <ul>
        {canchas.map((cancha) => (
          <li key={cancha.club_id}>
            <CanchaCard
              nombreClub={cancha.club_id}
              tipoDeporte={cancha.tipo_deporte}
              dimensiones={cancha.dimensiones}
              precio={cancha.precio}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
