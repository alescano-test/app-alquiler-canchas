import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../AuthContext";

export const Logueado = () => {
  const { sesion, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-4 place-items-center">
        <p className="chat-bubble font-texts text-blanco">
          Hola {sesion.usuario}! 
        </p>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-4 ">
            <div className="w-15 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://multiavatar.com/img/logo-animated.gif?v=003"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-base"
          >
            <li>
              <a className="justify-between">
                Mi Perfil
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate(`/mis-reservas/${sesion.id}`)}>Reservas</a>
            </li>
            <li>
              <a onClick={() => logout(() => navigate("/"))}>Salir</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
