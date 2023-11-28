import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../AuthContext";

export const BtnReservar = () => {
  const { sesion } = useAuthContext();
  const [fecha, setFecha] = useState([]);
  const [hora, setHora] = useState([]);
  const [nombreClub, setNombreClub] = useState([]);

  return (
    <>
    <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>Reservar</button>
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Reserva realizada con éxito</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    </>
  )
}

