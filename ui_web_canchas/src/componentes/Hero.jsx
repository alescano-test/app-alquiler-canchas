import { Date } from "./Date";

export const Hero = () => {

  return (
    <>
      <div className="hero min-h-screen #0c0c0c">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/foto-gratis/joven-corredor-atar-cordones_1421-46.jpg?w=740&t=st=1699763229~exp=1699763829~hmac=63a72afcaba7cda30c7a4085086ac50402540c0d8cf631dad7e98c9752471ea5)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div>
            <h1 className="text-5xl font-bold text-center text-neutral-content">
              Reservá con un click!
            </h1>
            <p className="py-6 text-center text-neutral-content">
              Eligí el deporte, el día, la hora y la cancha que más te guste,
              después...que gane el mejor. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.{" "}
            </p>
            <select className="select select-success w-full max-w-xs">
              <option disabled selected>
                Selecciona un deporte
              </option>
              <option>Fútbol</option>
              <option>Tenis</option>
              <option>Padel</option>
              <option>Basquet</option>
              <option>Voley</option>
            </select>
            <Date/>
            
          </div>
        </div>
      </div>
    </>
  );
};
