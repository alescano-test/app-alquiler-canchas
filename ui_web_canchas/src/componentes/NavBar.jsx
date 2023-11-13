

export const NavBar = () => {

    return <>
        <div className="navbar rounded-box h-20 bg-green-900">
            <div className="flex-1 px-2 lg:flex-none">
                <img src="C:\Users\andrea.holland\Documents\alqCanchas\app-alquiler-canchas\ui_web_canchas\src\img\logo.png"/>
                <a className="text-lg font-bold text-gray-50">CanchasGo!</a>
            </div> 
            <div className="flex justify-end flex-1 px-2">
                <div className="flex items-stretch">
                <a className="btn btn-ghost rounded-btn text-gray-50">Iniciar Sesión</a>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost rounded-btn text-gray-50">Registrate</label>
                    <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                        <li><a>Jugador</a></li> 
                        <li><a>Club</a></li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    </>
}
