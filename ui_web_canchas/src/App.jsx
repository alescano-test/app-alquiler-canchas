
import { Hero } from "./componentes/Hero";
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
          <Route path="/resultado-canchas" element={<ResultadoCanchas />} />
        </Route>
      </Routes>
    </>
  );
}
