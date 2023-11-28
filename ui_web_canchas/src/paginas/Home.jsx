import { Outlet } from "react-router-dom";
import { Navbar } from "../componentes/NavBar";
import { Footer } from "../componentes/Footer";

export const Home = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer />
    </>
    
  )
}