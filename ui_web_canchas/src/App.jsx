import { Route, Routes } from "react-router-dom";
import { SignIn } from "./SingInPage";
import { Layout } from "./Layout";

export default function App() {
  return (
    <>
    <h1>Hola</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index />
          <Route path="/iniciar-sesion" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}
