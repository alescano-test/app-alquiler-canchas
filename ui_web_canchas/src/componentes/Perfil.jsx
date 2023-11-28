import {useAuthContext} from "../contexto/AuthContext"
import axios from "axios";
import React, { useState, useEffect } from "react";

export const Perfil = () => {
    const { sesion } = useAuthContext();
    const [cuenta, setCuenta] = useState({
        nombre: "",
        apellido: "",
    });

    useEffect(() => {
        const obtenerDatosCuenta = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/cuentas/${sesion}/personas`,{
                headers: { Authorization: `Bearer ${sesion.token}` },
              });
              setCuenta(response.data);
          } catch (error) {
            console.error("Error al obtener cuentas", error);
          }
        };
    
        if (sesion && sesion.token) {
          obtenerDatosCuenta();
        }
      }, [sesion, cuenta]);

    return (
    <>
    
    
    </>
    );
};
