import { useState } from "react";
import { Trophy, Vote, Lock, Users, Crown, Star, Heart, Award } from "lucide-react";
import "./App.css";

const DISCORD = "https://discord.gg/slw";
const LOGO =
  "https://cdn.discordapp.com/attachments/1511795825553178624/1514456684179882004/431090d54d3304d4649dd3aa7285a28b.jpg?ex=6a2b6f32&is=6a2a1db2&hm=a7b235c0368e0b0a245328a3dcce3a110a7ed2f6a07d54acea8c25390b0713cc&";

const categories = [
  ["Mejor Mujer", "Vota por la mujer más destacada.", Star],
  ["Mejor Hombre", "Vota por el hombre más destacado.", Users],
  ["Mejor Owner", "Vota por el mejor owner.", Crown],
  ["Mejor OG", "Vota por la persona más OG.", Trophy],
  ["Persona Más Importante del Server", "Vota por quien más representa al server.", Award],
  ["Mejor Pareja del Server", "Vota por la mejor pareja.", Heart],
  ["El Mejor de SlowCero", "Vota por el mejor de todo SlowCero.", Trophy],
];

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState<string | null>(null);
  const [voted, setVoted] = useState<string[]>([]);

  function vote(name: string) {
    if (voted.includes(name)) return alert("Ya votaste en esta categoría.");
    setVoted([...voted, name]);
    alert("Tu voto fue registrado correctamente.");
  }

  return (
    <div className="app">
      <header>
        <div className="brand" onClick={() => setPage("home")}>
          <img src={LOGO} />
          <span>SLOWCERO <b>AWARDS</b> 2026</span>
        </div>

        <nav>
          <button onClick={() => setPage("home")}>Inicio</button>
          <button onClick={() => setPage("categories")}>Categorías</button>
          <button onClick={() => setPage("results")}>Resultados</button>
        </nav>
      </header>

      {page === "home" && (
        <main className="hero">
          <img className="logo" src={LOGO} />
          <h1>SLOWCERO AWARDS 2026</h1>
          <p>Vota por los miembros más destacados de la comunidad SlowCero.</p>

          <div className="buttons">
            <button className="primary" onClick={() => setPage("categories")}>
              <Vote size={18} /> Votar Ahora
            </button>
            <a href={DISCORD} target="_blank">Unirse al Discord</a>
          </div>

          <div className="stats">
            <div>Comunidad Activa</div>
            <div>7 Categorías</div>
            <div>Evento 2026</div>
          </div>
        </main>
      )}

      {page === "categories" && !selected && (
        <main>
          <h2>Categorías oficiales</h2>
          <p className="muted">Los resultados estarán ocultos hasta el evento oficial.</p>

          <div className="grid">
            {categories.map(([name, desc, Icon]: any, i) => (
              <div className="card" key={name}>
                <Icon className="icon" />
                <span className="num">#{i + 1}</span>
                <h3>{name}</h3>
                <p>{desc}</p>
                <button className="primary" onClick={() => setSelected(name)}>
                  Votar
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {page === "categories" && selected && (
        <main>
          <button className="back" onClick={() => setSelected(null)}>← Volver</button>
          <h2>{selected}</h2>
          <p className="muted">Los votos no se muestran públicamente.</p>

          <div className="grid">
            {["Nominado 1", "Nominado 2", "Nominado 3"].map((n) => (
              <div className="card nominee" key={n}>
                <div className="avatar">{n[0]}</div>
                <h3>{n}</h3>
                <p>@usuario</p>
                <button className="primary" onClick={() => vote(selected)}>
                  Votar
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {page === "results" && (
        <main className="locked">
          <Lock size={55} />
          <h2>Resultados ocultos</h2>
          <p>Los ganadores serán revelados durante el evento oficial de SlowCero Awards 2026.</p>
          <button className="primary" onClick={() => setPage("categories")}>Ir a votar</button>
        </main>
      )}

      <footer>© SlowCero Awards 2026 · Todos los derechos reservados.</footer>
    </div>
  );
}
