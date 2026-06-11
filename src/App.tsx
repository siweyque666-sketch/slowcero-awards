import { useState } from "react";
import {
  Trophy,
  Vote,
  Lock,
  Users,
  Crown,
  Star,
  Heart,
  Award,
} from "lucide-react";
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

const nominees: Record<string, { alias: string; user: string }[]> = {
  "Mejor Mujer": [
    { alias: "Fernanda", user: "blnvq." },
    { alias: "ange", user: "tteamu" },
    { alias: "joki", user: "18kiss" },
    { alias: "ali", user: "alixexxx" },
    { alias: "doll", user: "jskhx" },
    { alias: "Izly", user: "weritafresa" },
    { alias: "lala", user: "lovemanipulation" },
  ],
  "Mejor Hombre": [
    { alias: "Nominado 1", user: "usuario1" },
    { alias: "Nominado 2", user: "usuario2" },
    { alias: "Nominado 3", user: "usuario3" },
  ],
  "Mejor Owner": [],
  "Mejor OG": [],
  "Persona Más Importante del Server": [],
  "Mejor Pareja del Server": [],
  "El Mejor de SlowCero": [],
};

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState<string | null>(null);
  const [voted, setVoted] = useState<string[]>(
    JSON.parse(localStorage.getItem("votes") || "[]")
  );

  function vote(category: string) {
    if (voted.includes(category)) {
      alert("Ya votaste en esta categoría.");
      return;
    }

    const updated = [...voted, category];
    setVoted(updated);
    localStorage.setItem("votes", JSON.stringify(updated));
    alert("Tu voto fue registrado correctamente.");
  }

  return (
    <div className="app">
      <header>
        <div
          className="brand"
          onClick={() => {
            setPage("home");
            setSelected(null);
          }}
        >
          <img src={LOGO} alt="SlowCero Logo" />
          <span>
            SLOWCERO <b>AWARDS</b> 2026
          </span>
        </div>

        <nav>
          <button onClick={() => { setPage("home"); setSelected(null); }}>
            Inicio
          </button>
          <button onClick={() => { setPage("categories"); setSelected(null); }}>
            Categorías
          </button>
          <button onClick={() => { setPage("results"); setSelected(null); }}>
            Resultados
          </button>
        </nav>
      </header>

      {page === "home" && (
        <main className="hero">
          <img className="logo" src={LOGO} alt="SlowCero Awards" />

          <h1>SLOWCERO AWARDS 2026</h1>

          <p>
            Vota por los miembros más destacados de la comunidad SlowCero y
            ayuda a decidir quiénes serán los ganadores oficiales.
          </p>

          <div className="buttons">
            <button
              className="primary"
              onClick={() => {
                setPage("categories");
                setSelected(null);
              }}
            >
              <Vote size={18} /> Votar Ahora
            </button>

            <a href={DISCORD} target="_blank" rel="noreferrer">
              Unirse al Discord
            </a>
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

          <p className="muted">
            Los resultados permanecerán ocultos hasta la revelación oficial de
            los SlowCero Awards 2026.
          </p>

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
          <button className="back" onClick={() => setSelected(null)}>
            ← Volver
          </button>

          <h2>{selected}</h2>

          <p className="muted">Los votos no se muestran públicamente.</p>

          <div className="grid">
            {(nominees[selected] || []).map((n) => (
              <div className="card nominee" key={n.alias}>
                <div className="avatar">{n.alias[0].toUpperCase()}</div>

                <h3>{n.alias}</h3>
                <p>@{n.user}</p>

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

          <p>
            Los ganadores serán revelados durante el evento oficial de SlowCero
            Awards 2026.
          </p>

          <button
            className="primary"
            onClick={() => {
              setPage("categories");
              setSelected(null);
            }}
          >
            Ir a votar
          </button>
        </main>
      )}

      <footer>© SlowCero Awards 2026 · Todos los derechos reservados.</footer>
    </div>
  );
}
