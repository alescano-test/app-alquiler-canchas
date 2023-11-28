import { Buscador } from "./paginas/Buscador";
import { Route, Routes } from "react-router-dom";
import { Home } from "./paginas/Home";
import { Login } from "./paginas/Login";
import { ResultadoCanchas } from "./paginas/ResultadoCanchas";
import { Registro } from "./paginas/Registro";
import { Reservas } from "./paginas/Reservas";
import { NotFound } from "./paginas/NotFound";
import { RequiredAuth } from "./contexto/RequireAuth";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Buscador />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/resultadoCanchas" element={<RequiredAuth>
              <ResultadoCanchas />
            </RequiredAuth>} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/mis-reservas/:id" element={<Reservas />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
