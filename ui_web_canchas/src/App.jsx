import { Buscador } from "./componentes/Buscador";
import { Route, Routes } from "react-router-dom";
import { Home } from "./paginas/Home";
import { Login } from "./paginas/Login";
import { ResultadoCanchas } from "./componentes/ResultadoCanchas";
import { Registro } from "./paginas/Registro";
import { Reservas } from "./paginas/Reservas";
import { NotFound } from "./paginas/NotFound";
import { Canchas } from "./paginas/Canchas";
import { RequiredAuth } from "./contexto/RequireAuth";
import { Clubes } from "./paginas/Clubes";
import { Turnos } from "./paginas/Turnos";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Buscador />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/resultadoCanchas"
            element={
              <RequiredAuth>
                <ResultadoCanchas />
              </RequiredAuth>
            }
          />

          <Route
            path="/clubes"
            element={
              <RequiredAuth>
                <Clubes />
              </RequiredAuth>
            }
          />

          <Route
            path="/canchas"
            element={
              <RequiredAuth>
                <Canchas />
              </RequiredAuth>
            }
          />

          <Route
            path="/turnos"
            element={
              <RequiredAuth>
                <Turnos />
              </RequiredAuth>
            }
          />

          <Route
            path="/reservas"
            element={
              <RequiredAuth>
                <Reservas />
              </RequiredAuth>
            }
          />

          <Route path="/registro" element={<Registro />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
