export const Logueado = () => {
    return (
      <>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://multiavatar.com/img/logo-animated.gif?v=003"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>    
              <a className="justify-between">
                Mi Perfil
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Reservas</a>
            </li>
            <li>
              <a>Salir</a>
            </li>
          </ul>
        </div>
      </>
    );
  };