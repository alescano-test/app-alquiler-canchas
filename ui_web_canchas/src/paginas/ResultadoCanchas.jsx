import { Cancha } from "../componentes/Cancha"


export default function ResultadoCanchas () {
  return (
    <>
        <div className="hero min-h-screen flex flex-col flex-wrap p-8 py-6">
          <div className="grid grid-cols-2 gap-6">
            <Cancha />
            <Cancha />
            <Cancha />
            <Cancha />
          </div>
        </div>
    </>
    
  )
}
