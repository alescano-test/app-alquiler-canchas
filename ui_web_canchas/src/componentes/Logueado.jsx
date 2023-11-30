import { Link } from "react-router-dom";
import logo_nombre from "../img/logo_nombre.png";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexto/AuthContext";

export const Logueado = () => {
  const { sesion, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar flex justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 bg" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-base">
            <Link to="/clubes">
              <li>Clubes</li>
            </Link>
            <Link to="/canchas">
              <li>Canchas</li>
            </Link>
            <Link to="/turnos">
              <li>Turnos</li>
            </Link>
            <Link to="/reservas">
              <li>Reservas</li>
            </Link>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to="/">
            <img src={logo_nombre} />
          </Link>
        </div>

        <div className="navbar-end">
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
        
      </div>
    </>
  );
};
