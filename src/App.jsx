import { useState, useEffect } from "react";

const API = "https://apiminecraft.onrender.com";

// ════════════════════════════════════════════════════════════════
//  CORES E ESTILOS
// ════════════════════════════════════════════════════════════════
const estilos = {
  fundo: { minHeight: "100vh", background: "#0f1117", color: "#fff", fontFamily: "Inter, sans-serif" },
  nav: { background: "#1a1d2e", borderBottom: "1px solid #2a2d3e", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { fontSize: "1.3rem", fontWeight: "700", color: "#5865F2" },
  botao: { background: "#5865F2", color: "#fff", border: "none", borderRadius: "8px", padding: "0.6rem 1.4rem", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" },
  botaoVermelho: { background: "#ED4245", color: "#fff", border: "none", borderRadius: "8px", padding: "0.6rem 1.4rem", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" },
  botaoVerde: { background: "#57F287", color: "#000", border: "none", borderRadius: "8px", padding: "0.6rem 1.4rem", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" },
  card: { background: "#1a1d2e", border: "1px solid #2a2d3e", borderRadius: "12px", padding: "1.5rem" },
  input: { width: "100%", background: "#0f1117", border: "1px solid #2a2d3e", borderRadius: "8px", padding: "0.7rem 1rem", color: "#fff", fontSize: "0.95rem", boxSizing: "border-box" },
  label: { display: "block", marginBottom: "0.4rem", color: "#aaa", fontSize: "0.85rem", fontWeight: "600" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" },
  avatar: { width: "36px", height: "36px", borderRadius: "50%" },
  badge: { background: "#5865F2", borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: "700" },
};

// ════════════════════════════════════════════════════════════════
//  PÁGINA DE LOGIN
// ════════════════════════════════════════════════════════════════
function Login() {
  return (
    <div style={{ ...estilos.fundo, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...estilos.card, textAlign: "center", maxWidth: "400px", width: "90%" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚙️</div>
        <h1 style={{ color: "#5865F2", marginBottom: "0.5rem" }}>Painel Minecraft Bot</h1>
        <p style={{ color: "#aaa", marginBottom: "2rem" }}>Configure seu bot para cada servidor Discord</p>
        <a href={`${API}/painel/auth/discord`} style={{ textDecoration: "none" }}>
          <button style={{ ...estilos.botao, width: "100%", padding: "0.9rem", fontSize: "1rem" }}>
            🎮 Login com Discord
          </button>
        </a>
        <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "1rem" }}>
          Apenas servidores onde você é Administrador serão exibidos.
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  NAVBAR
// ════════════════════════════════════════════════════════════════
function Navbar({ usuario, onVoltar, paginaAtual }) {
  return (
    <nav style={estilos.nav}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={estilos.logo}>⚙️ MC Panel</span>
        {paginaAtual === "config" && (
          <button onClick={onVoltar} style={{ background: "none", border: "1px solid #2a2d3e", color: "#aaa", borderRadius: "8px", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.85rem" }}>
            ← Voltar
          </button>
        )}
      </div>
      {usuario && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src={usuario.avatar} alt="" style={estilos.avatar} />
          <span style={{ color: "#aaa", fontSize: "0.9rem" }}>{usuario.username}</span>
          <a href={`${API}/painel/auth/logout`} style={{ textDecoration: "none" }}>
            <button style={{ ...estilos.botaoVermelho, padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>
              Sair
            </button>
          </a>
        </div>
      )}
    </nav>
  );
}

// ════════════════════════════════════════════════════════════════
//  DASHBOARD - Lista de servidores
// ════════════════════════════════════════════════════════════════
function Dashboard({ usuario, onSelecionarGuild }) {
  const [guilds, setGuilds] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(`${API}/painel/guilds`, { credentials: "include" })
      .then(r => r.json())
      .then(data => { setGuilds(data); setCarregando(false); })
      .catch(() => setCarregando(false));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>Seus Servidores</h2>
      <p style={{ color: "#aaa", marginBottom: "2rem" }}>Selecione um servidor para configurar o bot.</p>

      {carregando ? (
        <p style={{ color: "#aaa" }}>Carregando servidores...</p>
      ) : guilds.length === 0 ? (
        <div style={{ ...estilos.card, textAlign: "center", color: "#aaa" }}>
          <p>Nenhum servidor encontrado onde você seja Administrador.</p>
        </div>
      ) : (
        <div style={estilos.grid}>
          {guilds.map(guild => (
            <div key={guild.id} style={{ ...estilos.card, cursor: "pointer", transition: "border 0.2s", border: "1px solid #2a2d3e" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#5865F2"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#2a2d3e"}
              onClick={() => onSelecionarGuild(guild)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                {guild.icone
                  ? <img src={guild.icone} alt="" style={{ width: "48px", height: "48px", borderRadius: "50%" }} />
                  : <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#5865F2", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>{guild.nome[0]}</div>
                }
                <div>
                  <div style={{ fontWeight: "700", marginBottom: "0.2rem" }}>{guild.nome}</div>
                  <div style={{ color: "#aaa", fontSize: "0.8rem" }}>{guild.id}</div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #2a2d3e", paddingTop: "0.8rem" }}>
                <div style={{ color: "#aaa", fontSize: "0.85rem" }}>
                  🌐 {guild.config.ip ? `${guild.config.ip}:${guild.config.porta}` : "IP não configurado"}
                </div>
                <div style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                  🖥️ {guild.config.nome_servidor}
                </div>
              </div>
              <button style={{ ...estilos.botao, width: "100%", marginTop: "1rem" }}>
                Configurar →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  CONFIG - Configuração de um servidor
// ════════════════════════════════════════════════════════════════
function Config({ guildId, onVoltar }) {
  const [guild, setGuild] = useState(null);
  const [form, setForm] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    fetch(`${API}/painel/guild/${guildId}`, { credentials: "include" })
      .then(r => r.json())
      .then(data => {
        setGuild(data);
        setForm(data.config);
      });
  }, [guildId]);

  function atualizar(campo, valor) {
    setForm(f => ({ ...f, [campo]: valor }));
  }

  async function salvar() {
    setSalvando(true);
    setMensagem(null);
    try {
      const res = await fetch(`${API}/painel/guild/${guildId}/save`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.sucesso) {
        setMensagem({ tipo: "sucesso", texto: "✅ Configurações salvas com sucesso!" });
      } else {
        setMensagem({ tipo: "erro", texto: "❌ " + data.erro });
      }
    } catch {
      setMensagem({ tipo: "erro", texto: "❌ Erro ao salvar." });
    }
    setSalvando(false);
  }

  if (!guild) return <div style={{ padding: "2rem", color: "#aaa" }}>Carregando...</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "700px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        {guild.icone
          ? <img src={guild.icone} alt="" style={{ width: "56px", height: "56px", borderRadius: "50%" }} />
          : <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#5865F2", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "1.5rem" }}>{guild.nome[0]}</div>
        }
        <div>
          <h2 style={{ margin: 0 }}>{guild.nome}</h2>
          <span style={estilos.badge}>Administrador</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

        {/* Servidor Minecraft */}
        <div style={estilos.card}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#5865F2" }}>🌐 Servidor Minecraft</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.8rem", alignItems: "end" }}>
            <div>
              <label style={estilos.label}>IP do Servidor</label>
              <input style={estilos.input} value={form.ip || ""} onChange={e => atualizar("ip", e.target.value)} placeholder="play.meuservidor.com" />
            </div>
            <div style={{ width: "100px" }}>
              <label style={estilos.label}>Porta</label>
              <input style={estilos.input} value={form.porta || 25565} onChange={e => atualizar("porta", e.target.value)} placeholder="25565" type="number" />
            </div>
          </div>
        </div>

        {/* Personalização */}
        <div style={estilos.card}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#5865F2" }}>🎨 Personalização</h3>
          <div style={{ marginBottom: "1rem" }}>
            <label style={estilos.label}>Nome do Servidor</label>
            <input style={estilos.input} value={form.nome_servidor || ""} onChange={e => atualizar("nome_servidor", e.target.value)} placeholder="Meu Servidor Survival" />
          </div>
          <div>
            <label style={estilos.label}>Cor dos Embeds</label>
            <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
              <input style={{ ...estilos.input, width: "auto", flex: 1 }} value={form.cor_embed || "#5865F2"} onChange={e => atualizar("cor_embed", e.target.value)} placeholder="#5865F2" />
              <input type="color" value={form.cor_embed || "#5865F2"} onChange={e => atualizar("cor_embed", e.target.value)}
                style={{ width: "48px", height: "42px", borderRadius: "8px", border: "none", cursor: "pointer", background: "none" }} />
              <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: form.cor_embed || "#5865F2" }} />
            </div>
          </div>
        </div>

        {/* Discord */}
        <div style={estilos.card}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#5865F2" }}>📢 Discord</h3>
          <div style={{ marginBottom: "1rem" }}>
            <label style={estilos.label}>ID do Canal de Alertas</label>
            <input style={estilos.input} value={form.canal_alertas || ""} onChange={e => atualizar("canal_alertas", e.target.value)} placeholder="ID do canal (clique com botão direito → Copiar ID)" />
          </div>
          <div>
            <label style={estilos.label}>ID do Cargo Admin</label>
            <input style={estilos.input} value={form.cargo_admin || ""} onChange={e => atualizar("cargo_admin", e.target.value)} placeholder="ID do cargo (clique com botão direito → Copiar ID)" />
          </div>
        </div>

        {/* Botão salvar */}
        {mensagem && (
          <div style={{ padding: "0.8rem 1rem", borderRadius: "8px", background: mensagem.tipo === "sucesso" ? "#1a3a2a" : "#3a1a1a", border: `1px solid ${mensagem.tipo === "sucesso" ? "#57F287" : "#ED4245"}`, color: mensagem.tipo === "sucesso" ? "#57F287" : "#ED4245" }}>
            {mensagem.texto}
          </div>
        )}

        <button onClick={salvar} disabled={salvando} style={{ ...estilos.botaoVerde, padding: "0.9rem", fontSize: "1rem" }}>
          {salvando ? "Salvando..." : "💾 Salvar Configurações"}
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  APP PRINCIPAL
// ════════════════════════════════════════════════════════════════
export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [pagina, setPagina] = useState("dashboard");
  const [guildSelecionada, setGuildSelecionada] = useState(null);

  useEffect(() => {
    fetch(`${API}/painel/auth/me`, { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(data => { setUsuario(data); setCarregando(false); })
      .catch(() => setCarregando(false));
  }, []);

  if (carregando) {
    return (
      <div style={{ ...estilos.fundo, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#aaa" }}>Carregando...</p>
      </div>
    );
  }

  if (!usuario) return <Login />;

  return (
    <div style={estilos.fundo}>
      <Navbar
        usuario={usuario}
        paginaAtual={pagina}
        onVoltar={() => { setPagina("dashboard"); setGuildSelecionada(null); }}
      />
      {pagina === "dashboard" && (
        <Dashboard
          usuario={usuario}
          onSelecionarGuild={guild => {
            setGuildSelecionada(guild.id);
            setPagina("config");
          }}
        />
      )}
      {pagina === "config" && guildSelecionada && (
        <Config
          guildId={guildSelecionada}
          onVoltar={() => { setPagina("dashboard"); setGuildSelecionada(null); }}
        />
      )}
    </div>
  );
}
