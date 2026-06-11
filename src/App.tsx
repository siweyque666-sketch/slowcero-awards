import { useState } from "react";
import {
  Trophy,
  Vote,
  Lock,
  Users,
  Crown,
  Star,
  Award,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import "./App.css";

const supabase = createClient(
  "https://ihdjkreiwiffpijjlnju.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZGprcmVpd2lmZnBpampsbmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNDY1MjgsImV4cCI6MjA5NjcyMjUyOH0.D93aQOXq7YAJmh_egGYsj5LzAXbBrElXHZiRhWdVmuY"
);

const DISCORD = "https://discord.gg/slw";

const LOGO =
  "https://cdn.discordapp.com/attachments/1511795825553178624/1514456684179882004/431090d54d3304d4649dd3aa7285a28b.jpg?ex=6a2b6f32&is=6a2a1db2&hm=a7b235c0368e0b0a245328a3dcce3a110a7ed2f6a07d54acea8c25390b0713cc&";

const categories = [
  ["Mejor Mujer", "Vota por la mujer más destacada.", Star],
  ["Mejor Hombre", "Vota por el hombre más destacado.", Users],
  ["Mejor Owner", "Vota por el mejor owner.", Crown],
  ["Mejor OG", "Vota por la persona más OG.", Trophy],
  ["El Más Meme del Server", "Vota por la persona más meme del servidor.", Award],
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
    { alias: "kevin", user: "3t24" },
    { alias: "slow", user: "324g." },
    { alias: "wero", user: "wero.0" },
    { alias: "kled", user: "onlymexicali" },
    { alias: "Gabriel", user: "gabntxl0l" },
    { alias: "xazf", user: "f8v9" },
    { alias: "Axel", user: "aaxxelx" },
    { alias: "Alejandro know", user: "3gh7w" },
  ],

  "Mejor Owner": [
    { alias: "wero", user: "wero.0" },
    { alias: "slow", user: "324g." },
    { alias: "kled", user: "onlymexicali" },
  ],

  "Mejor OG": [
    { alias: "slow", user: "324g." },
    { alias: "ange", user: "tteamu" },
    { alias: "asheee", user: "ricoysuavee" },
    { alias: "joki", user: "18kiss" },
    { alias: "mari", user: "18savior" },
    { alias: "kled", user: "onlymexicali" },
    { alias: "dessy", user: "blodyx_o" },
    { alias: "vale", user: "zombiefeelings" },
    { alias: "Gabriel", user: "gabntxl0l" },
    { alias: "tefy", user: "desmembrada." },
    { alias: "gioo", user: "lujuriaeterna" },
    { alias: "lala", user: "lovemanipulation" },
  ],

  "El Más Meme del Server": [
    { alias: "Alejandro know", user: "3gh7w" },
    { alias: "Ilicita", user: "jakajshsja" },
    { alias: "ondearte", user: "mysoundishigh" },
  ],

  "El Mejor de SlowCero": [
    { alias: "slow", user: "324g." },
    { alias: "ange", user: "tteamu" },
    { alias: "asheee", user: "ricoysuavee" },
    { alias: "joki", user: "18kiss" },
    { alias: "mari", user: "18savior" },
    { alias: "kled", user: "onlymexicali" },
    { alias: "dessy", user: "blodyx_o" },
    { alias: "vale", user: "zombiefeelings" },
    { alias: "Gabriel", user: "gabntxl0l" },
    { alias: "tefy", user: "desmembrada." },
    { alias: "gioo", user: "lujuriaeterna" },
    { alias: "lala", user: "lovemanipulation" },
    { alias: "wero", user: "wero.0" },
    { alias: "Fernanda", user: "blnvq." },
  ],
};

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState<string | null>(null);
  const [voted, setVoted] = useState<string[]>(
    JSON.parse(localStorage.getItem("votes") || "[]")
  );

  async function vote(category: string, nominee: string) {
    if (voted.includes(category)) {
      alert("Ya votaste en esta categoría.");
      return;
    }

    const { error } = await supabase.from("votes").insert({
      category,
      nominee,
    });

    if (error) {
      alert("Error guardando el voto.");
      console.error(error);
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
            <div>6 Categorías</div>
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
              <div className="card nominee" key={`${n.alias}-${n.user}`}>
                <div className="avatar">{n.alias[0].toUpperCase()}</div>

                <h3>{n.alias}</h3>
                <p>@{n.user}</p>

                <button
                  className="primary"
                  onClick={() => vote(selected, n.alias)}
                >
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
