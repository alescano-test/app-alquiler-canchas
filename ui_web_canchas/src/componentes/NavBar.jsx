import logo_nombre from "../img/logo_nombre.png"

export const Navbar = () => {
    return(
        <>
        <div className="contenedor-navbar flex-auto bg-verde-oscuro " >
            <div className="contenedor-img ms-4">
                <img src={logo_nombre} /> 
            </div>
            

            {/* Boton Iniciar sesion */}
        </div>
        </>
    )
}