import { Footer } from "./componentes/Footer";
import { Navbar } from "./componentes/NavBar";
import { Hero } from "./componentes/Hero";
import { Fecha } from "./componentes/Fecha";
import { Route, Routes } from "react-router-dom";
import { Home } from "./paginas/Home";
import Login from "../src/paginas/Login";
export default function App() {
  return (
    //NavBar
    //Hero
    //Footer
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Hero />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}
