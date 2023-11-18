/* eslint-disable react/prop-types */

export default function CanchaCard({
  nombreClub,
  tipoDeporte,
  dimensiones,
  precio,
}) {
  return (
    <div className="bg-slate-400 pt-1 pr-1 pb-1 pl-1 mt-1 mr-1 mb-1 ml-1 flex flex-row justify-stretch items-center">
      <div className="basis-1/2">
        <h2>Club: {nombreClub}</h2>
      </div>
      <div className="basis-1/2">
        <p>Tipo deporte: {tipoDeporte}</p>
        <p>Dimensiones: {dimensiones}</p>
        <p>Precio: {precio}</p>
      </div>
      <div className="basis-1/2">
        <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ">Reservar</button>
      </div>
    </div>
  );
}
