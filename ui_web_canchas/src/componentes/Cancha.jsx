import { Boton } from "./Boton";

export const Cancha = ({nombreClub, dimensiones, cant_jugadores, precio, suelo,}) => {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img src="https://4tv4.short.gy/WVWGPK" alt="Cancha" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{nombreClub}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            id="location">
            <g
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              data-name="Target Location">

              <path d="M56.38 52H3.11l7.78-30h1.57M31.61 22h21.5l7.78 30"></path>
              <path d="m55.18 29.99-5.04 1.63h-.01M46.39 32.83l-16.42 5.3-3.76 1.21-21.62 6.98h-.01M30.26 42.71l-17.69 5.71M34 41.5l16.43-5.3 2.62-.85M37.55 48.79l-7.29-6.08M46.6 52 34 41.5"></path>
              <path d="M50.14 31.62h-.01l-7.78-6.49M46.39 32.83 33.4 22"></path>
              <circle cx="22" cy="18.67" r="6.67"></circle>
              <path d="M22.69 15.06a3.7 3.7 0 0 1 2.65 2.09M22 25.33v7.78"></path>
            </g>
          </svg>
          <p>
            Nombre: {nombreClub}
            Cantidad de jugadores: {cant_jugadores}
            Dimensiones: {dimensiones}
            precio: {precio}
            suelo: {suelo}
          </p>
          <div className="card-actions justify-end">
            <Boton onClick btnNombre="Reservar" />
          </div>
        </div>
      </div>
    </>
  );
};
