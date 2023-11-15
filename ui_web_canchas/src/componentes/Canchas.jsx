
export const Canchas = () => {
  return (
    <>
    <div className="container mx-auto bg-black ">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure><img src="https://www.elcivismo.com.ar/imagenes/fotos/52693.jpg" alt="Album"/></figure>
        <div className="card-body">
          <h2 className="card-title">El Parque Futbol</h2>
          <div className="iconGPS w-10 h-9" >
            <img src="https://cdn.icon-icons.com/icons2/1258/PNG/96/1495574578-map-location-solid-style-17_84574.png"/>
          </div>
          <p>Los Sauces esq San Martin de Porres , La Rioja.</p>
          
          <div className="rating">
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Reservar</button>
          </div>
        </div>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure><img src="https://www.elcivismo.com.ar/imagenes/fotos/52693.jpg" alt="Album"/></figure>
        <div className="card-body">
          <h2 className="card-title">El Parque Futbol</h2>
          <div className="iconGPS w-10 h-9" >
            <img src="https://cdn.icon-icons.com/icons2/1258/PNG/96/1495574578-map-location-solid-style-17_84574.png"/>
          </div>
          <p>Los Sauces esq San Martin de Porres , La Rioja.</p>
          
          <div className="rating">
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Reservar</button>
          </div>
        </div>
      </div>

    </div>
    
    </>
    
  )
}
