
export const Cancha = ({
  nombreClub, 
  direccion,
  imagen,
  cant_jugadores,
  precio,
    
}) => {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="h-60 w-72">
          {imagen}
        </figure>
        <div className="card-body font-base">
          <h2 className="card-title">{nombreClub}</h2>
          <div className="flex justify-between">
            <svg
                viewBox="0 0 576 512"
                fill="currentColor"
                height="2em"
                width="2em"
            >
                <path d="M408 120c0 54.6-73.1 151.9-105.2 192-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120 168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6.5-1.2 1-2.5 1.5-3.7l116-46.4c15.8-6.3 32.9 5.3 32.9 22.3v270.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zm-278.4-62.1c2.4 14.1 7.2 28.3 12.8 41.5 2.9 6.8 6.1 13.7 9.6 20.6v251.4L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77v249.3l-192-54.9V255c20.5 31.3 42.3 59.6 56.2 77 20.5 25.6 59.1 25.6 79.6 0zM288 152c22.1 0 40-17.9 40-40s-17.9-40-40-40-40 17.9-40 40 17.9 40 40 40z" />
            </svg>
            <p className="text-center p-2">{direccion}</p>
          </div>
          
          <div className="flex justify-between">
            <svg
              viewBox="0 0 448 512"
              fill="currentColor"
              height="24"
              width="30"
            >
              <path d="M336 48c0-26.5-21.5-48-48-48s-48 21.5-48 48 21.5 48 48 48 48-21.5 48-48zM141.7 175.5c9.9-9.9 23.4-15.5 37.5-15.5 1.9 0 3.8.1 5.6.3L153.6 254c-9.3 28 1.7 58.8 26.8 74.5l86.2 53.9-25.4 88.8c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l28.7-100.4c5.9-20.6-2.6-42.6-20.7-53.9L254 299l30.9-82.4 5.1 12.3c15 35.8 49.9 59.1 88.7 59.1H400c17.7 0 32-14.3 32-32s-14.3-32-32-32h-21.3c-12.9 0-24.6-7.8-29.5-19.7l-6.3-15c-14.6-35.1-44.1-61.9-80.5-73.1l-48.7-15C202.6 97.8 191 96 179.3 96c-31 0-60.8 12.3-82.7 34.3l-23.2 23.1c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l23.1-23.1zM107.2 352H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h69.6c19 0 36.2-11.2 43.9-28.5l11.5-25.9-9.5-6a95.394 95.394 0 01-37.9-44.9L107.2 352z" />
            </svg>
            <p className="text-left pl-2">2 - 7{cant_jugadores}</p>

          </div>
          <div className="flex justify-between">
            <p className="text-left pl-2">${precio}</p>
          </div>
          
          <div className="card-actions justify-center">
          <button className="rounded-full
                  bg-verde-claro 
                  font-texts
                  font-bold
                  h-10 w-48 
                  transition 
                  ease-in-out 
                  delay-50 
                  hover:-translate-y-1 
                  hover:scale-110 duration-300
                  hover:bg-amarillo"
                  type="submit">
                    Reservar
                </button>
          </div>
        </div>
        {/* <details className="dropdown font-base">
          <summary className="m-1 btn bg-naranja-claro">Horarios</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 ">
            <li><a>18:00</a></li>
            <li><a>19:00</a></li>
            <li><a>20:00</a></li>
          </ul>
        </details> */}
      </div>
    </>
  );
};
