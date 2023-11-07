import { Route, Routes } from "react-router-dom";
import {SignIn}  from "./SignInPage";
import {HomePage} from "./HomePage"
import { Layout } from "./Layout";
import { Button } from "@mui/material"

export default function App() {
  return (
    <>
    <h1>Hola</h1>
    <Button>Iniciar sesión</Button>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path="/iniciar-sesion" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}
