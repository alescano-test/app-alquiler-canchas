export const Selectores = ({selectNombre}) => {
    const opcionDeportes = [
        'Fútbol',
        'Tenis',
        'Padel',
        'Voley'
    ]

    return (
      <>
        <select className="h-10 w-64 hover:border-slate-400 rounded-md border-2 border-verde-claro font-base">
            <option disabled selected>{selectNombre}</option>
            
            
            
        </select> 
      </>
      
    )
  }