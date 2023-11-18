export default function NavBar() {
  return (
    <div className="flex flex-row items-center justify-between w-full h-24 bg-blue-500 rounded">
      <div className="m-10" >
        <h1 className="font-bold text-white">Alquiler de canchas</h1>
      </div>
      <div className="flex flex-row items-center">
        <button className="w-24 h-12 bg-black text-white text-base font-bold rounded cursor-pointer m-2 hover:bg-green-500">
          Iniciar Sesión
        </button>
        <button className="w-24 h-12 bg-black text-white text-base font-bold rounded cursor-pointer m-2 hover:bg-green-500">
          Registrate
        </button>
      </div>
    </div>
  );
}
