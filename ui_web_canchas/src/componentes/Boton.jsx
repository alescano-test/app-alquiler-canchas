
export const Boton = ({btnNombre}) => {

  return (
    <>
        <button className="rounded-full
          bg-verde-claro 
          font-texts
          font-bold
          h-10 w-52 
          transition 
          ease-in-out 
          delay-50 
          hover:-translate-y-1 
          hover:scale-110 duration-300
          hover:bg-amarillo"> {btnNombre}
        </button>
    </>
    
  )
}
