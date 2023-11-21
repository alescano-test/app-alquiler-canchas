export const Input = ({inputNombre, tipo}) => {

    return (
      <>
          <input
              className="input input-bordered"
              type={tipo}
              placeholder={inputNombre}
            />
      </>
      
    )
  }
  