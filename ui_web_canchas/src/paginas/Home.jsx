import { Link, Outlet } from "react-router-dom";
import { Navbar } from "../componentes/NavBar";
export const Home = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
    
  )
}
