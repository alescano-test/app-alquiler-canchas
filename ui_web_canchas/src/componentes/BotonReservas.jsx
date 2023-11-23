import { useState } from "react";

export const BotonReservas = () => {
  const [estado, setEstado] = useState({
    nombre: "Reservada",
  });

  const onMouseOver = () => {
    if (estado.nombre === "Cancelada") {
        return;
    }
      setEstado({ nombre: "Cancelar Turno" });
  };

  const onClick = () => {
    setEstado({
      nombre: "Cancelada",
      disabled: true,
    });
  };

  return (
    <>
      <button
        className="
              rounded-full
              h-10 w-36
              border-2 
              bg-transparent
              font-texts
              hover:bg-rojo
              hover:opacity-80
              border-verde-claro
              cursor-auto
              hover:border-rojo
              "
        nombre={estado.nombre}
        onClick={onClick}
        onMouseOver={onMouseOver}
        disabled={estado.disabled}
      >
        {estado.nombre}
      </button>
    </>
  );
};
