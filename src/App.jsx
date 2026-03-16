import { useState, useEffect } from "react";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Config from "./Config";

const API = "https://apiminecraft-production.up.railway.app";

export function apiFetch(path, token, options = {}) {
  return fetch(`${API}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

export { API };

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [pagina, setPagina] = useState("home");
  const [guildSelecionada, setGuildSelecionada] = useState(null);
  const [erroAuth, setErroAuth] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenUrl = params.get("token");
    const erro = params.get("erro");
    const wait = params.get("wait");

    if (erro === "rate_limit") {
      setErroAuth(`⏳ Discord em cooldown. Aguarde ${wait || "alguns"} minuto(s) e tente novamente.`);
      window.history.replaceState({}, "", window.location.pathname);
      setCarregando(false);
      return;
    } else if (erro) {
      setErroAuth("❌ Falha no login. Tente novamente.");
      window.history.replaceState({}, "", window.location.pathname);
      setCarregando(false);
      return;
    }

    const t = tokenUrl || sessionStorage.getItem("mc_token");
    if (!t) { setCarregando(false); return; }

    sessionStorage.setItem("mc_token", t);
    if (tokenUrl) window.history.replaceState({}, "", "/dashboard");

    fetch(`${API}/painel/auth/me`, { headers: { Authorization: `Bearer ${t}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setUsuario(data);
          setToken(t);
          setPagina("dashboard");
        } else {
          sessionStorage.removeItem("mc_token");
        }
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, []);

  if (carregando) {
    return (
      <div style={{ minHeight: "100vh", background: "#050f05", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#86efac", fontFamily: "monospace" }}>Carregando...</p>
      </div>
    );
  }

  // Não logado → Home
  if (!usuario) {
    return <Home erro={erroAuth} api={API} />;
  }

  // Logado → Dashboard ou Config
  return (
    <>
      {pagina === "dashboard" && (
        <Dashboard
          usuario={usuario}
          token={token}
          api={API}
          onSelecionarGuild={guild => {
            setGuildSelecionada(guild.id);
            setPagina("config");
          }}
          onLogout={() => {
            sessionStorage.removeItem("mc_token");
            setUsuario(null);
            setToken(null);
            setPagina("home");
          }}
        />
      )}
      {pagina === "config" && guildSelecionada && (
        <Config
          guildId={guildSelecionada}
          token={token}
          api={API}
          onVoltar={() => {
            setGuildSelecionada(null);
            setPagina("dashboard");
          }}
        />
      )}
    </>
  );
}
