/* eslint-disable react/prop-types */

export default function CanchaCard({
  nombreClub,
  tipoDeporte,
  dimensiones,
  precio,
}) {
  return (
    <div className="" >
      <div className="">
        <h2>Club: {nombreClub}</h2>
      </div>
      <div className="">
        <p>Tipo deporte: {tipoDeporte}</p>
        <p>Dimensiones: {dimensiones}</p>
        <p>Precio: {precio}</p>
      </div>
      <div className="">
        <button className="w-full bg-black text-white text-base font-bold p-2 rounded cursor-pointer hover:bg-green-500">Reservar</button>
      </div>
    </div>
  );
}
