import { Hero } from "./componentes/Hero";
import { NavBar } from "./componentes/NavBar";
import { Footer } from "./componentes/Footer";
import { Date } from "./componentes/Date";


export default function App() {
  
  return (
    <>
    <NavBar/>
    <Hero>
      <Date/>
    </Hero>
    <Footer/>
    </>
  );
}
