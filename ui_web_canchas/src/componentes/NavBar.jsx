

export const NavBar = () => {

    return <>
        <div className="navbar rounded-box h-20 bg-green-900">
            <div className="flex-1 px-2 lg:flex-none">
                <img src="C:\Users\andrea.holland\Documents\alqCanchas\app-alquiler-canchas\ui_web_canchas\src\img\logo.png"/>
                <a className="text-lg font-bold text-gray-50">CanchasGo!</a>
            </div> 
            <div className="flex justify-end flex-1 px-2">
                <div className="dropdown dropdown-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer-4" className="btn btn-primary">Iniciar sesión</label>
                    </div> 
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form className="card-body">
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Olvidaste la contraseña?</a>
                                </label>
                                </div>
                                <div className="form-control mt-6">
                                <button className="btn btn-primary">Ingresar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
