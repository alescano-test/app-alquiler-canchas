import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sesion, setSesion] = useState();

  const login = async (userName, userPassword, callback, error) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        userName,
        userPassword,
      });
      if (response.data.token) {
        setSesion(response.data);
        callback();
      }
    } catch (e) {
      error();
    }
  };

  const logueado = async (userName, userPassword, nombre, apellido, callback, error) => {
    try {
      const response = await axios.post('http://localhost:3000/cuentas', {
        userName,
        userPassword,
        nombre,
        apellido,
      });
      if (response.data.token) {
        setSesion(response.data);
        callback();
      }
    } catch (e) {
      error();
    }
  };



  const logout = (callback) => {
    setSesion(null);
    callback();
  };

  const value = { logueado, sesion, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};