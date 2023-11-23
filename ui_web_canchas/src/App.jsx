import { Hero } from "./componentes/Hero";
import { Route, Routes } from "react-router-dom";
import { Home } from "./paginas/Home";
import { Login } from "./paginas/Login";
import ResultadoCanchas from "./paginas/ResultadoCanchas";
import Registro from "./paginas/Registro";
import { Reservas } from "./paginas/Reservas";

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
          <Route path="/resultadoCanchas" element={<ResultadoCanchas />} />
          <Route path="/registro" element={<Registro />} />
            <Route path="/mis-reservas/:id" element={<Reservas />} />
        </Route>
      </Routes>
    </>
  );
}
