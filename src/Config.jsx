import { useState, useEffect } from "react";

const estilos = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Outfit:wght@400;600;700;800;900&display=swap');

  * { margin:0; padding:0; box-sizing:border-box; }

  .cfg {
    min-height:100vh;
    background:#050f05;
    color:#f0fdf4;
    font-family:'Outfit',sans-serif;
    position:relative;
  }
  .cfg::before {
    content:'';
    position:fixed; inset:0;
    background-image:
      linear-gradient(rgba(74,222,128,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(74,222,128,0.025) 1px, transparent 1px);
    background-size:40px 40px;
    pointer-events:none; z-index:0;
  }

  /* NAV */
  .nav {
    position:fixed; top:0; left:0; right:0; z-index:100;
    display:flex; align-items:center; justify-content:space-between;
    padding:1rem 2.5rem;
    background:rgba(5,15,5,0.9);
    backdrop-filter:blur(20px);
    border-bottom:1px solid #1a3a1a;
  }
  .nav-left { display:flex; align-items:center; gap:1rem; }
  .nav-logo {
    font-family:'Press Start 2P',monospace;
    font-size:0.75rem; color:#4ade80;
    text-shadow:0 0 20px rgba(74,222,128,0.5);
    text-decoration:none;
  }
  .btn-voltar {
    background:transparent; color:#86efac;
    border:1px solid #1a3a1a; border-radius:8px;
    padding:0.4rem 1rem; cursor:pointer;
    font-family:'Outfit',sans-serif;
    font-weight:700; font-size:0.85rem;
    transition:all 0.2s;
  }
  .btn-voltar:hover { border-color:#4ade80; color:#4ade80; }

  /* CONTEUDO */
  .conteudo {
    position:relative; z-index:1;
    max-width:740px; margin:0 auto;
    padding:7rem 2rem 4rem;
  }

  /* HEADER DO SERVIDOR */
  .guild-header {
    display:flex; align-items:center; gap:1.2rem;
    margin-bottom:2.5rem;
    padding:1.5rem;
    background:#0d1f0d;
    border:1px solid #1a3a1a;
    border-radius:16px;
  }
  .guild-icon {
    width:60px; height:60px; border-radius:50%;
    border:2px solid #1a3a1a; object-fit:cover;
    flex-shrink:0;
  }
  .guild-icon-placeholder {
    width:60px; height:60px; border-radius:50%;
    background:linear-gradient(135deg,#16a34a,#14532d);
    display:flex; align-items:center; justify-content:center;
    font-weight:900; font-size:1.5rem; flex-shrink:0;
  }
  .guild-name { font-size:1.3rem; font-weight:900; margin-bottom:0.3rem; }
  .badge {
    display:inline-block;
    background:#14532d; color:#4ade80;
    border:1px solid #16a34a;
    border-radius:6px; padding:0.2rem 0.7rem;
    font-size:0.75rem; font-weight:800;
  }

  /* SECOES */
  .secao {
    background:#0d1f0d;
    border:1px solid #1a3a1a;
    border-radius:16px;
    padding:1.8rem;
    margin-bottom:1.2rem;
    transition:border-color 0.2s;
  }
  .secao:focus-within { border-color:#16a34a; }

  .secao-titulo {
    font-size:1rem; font-weight:900;
    margin-bottom:1.2rem;
    display:flex; align-items:center; gap:0.5rem;
    color:#4ade80;
  }

  .form-row {
    display:grid;
    grid-template-columns:1fr 120px;
    gap:1rem; align-items:end;
    margin-bottom:0;
  }

  .campo { margin-bottom:1rem; }
  .campo:last-child { margin-bottom:0; }

  label {
    display:block;
    margin-bottom:0.4rem;
    color:#86efac;
    font-size:0.82rem;
    font-weight:700;
    letter-spacing:0.5px;
  }

  input[type=text], input[type=number] {
    width:100%;
    background:#050f05;
    border:1px solid #1a3a1a;
    border-radius:10px;
    padding:0.75rem 1rem;
    color:#f0fdf4;
    font-family:'Outfit',sans-serif;
    font-size:0.95rem;
    transition:border-color 0.2s, box-shadow 0.2s;
    outline:none;
  }
  input[type=text]:focus, input[type=number]:focus {
    border-color:#16a34a;
    box-shadow:0 0 0 3px rgba(22,163,74,0.15);
  }
  input::placeholder { color:#2d5a2d; }

  .cor-row {
    display:flex; gap:0.8rem; align-items:center;
  }
  .cor-row input[type=text] { flex:1; }
  input[type=color] {
    width:46px; height:46px;
    border-radius:10px; border:1px solid #1a3a1a;
    cursor:pointer; background:none; padding:2px;
    flex-shrink:0;
  }
  .cor-preview {
    width:46px; height:46px;
    border-radius:10px; flex-shrink:0;
    border:1px solid #1a3a1a;
    transition:background 0.2s;
  }

  /* MENSAGEM */
  .msg {
    padding:0.9rem 1.2rem;
    border-radius:10px;
    font-weight:700; font-size:0.9rem;
    margin-bottom:1.2rem;
    animation:fadeIn 0.3s;
  }
  .msg.sucesso { background:#0a2a14; border:1px solid #16a34a; color:#4ade80; }
  .msg.erro    { background:#2a0a0a; border:1px solid #ED4245; color:#ED4245; }

  /* BOTAO SALVAR */
  .btn-salvar {
    width:100%; padding:1rem;
    background:#4ade80; color:#000;
    border:none; border-radius:12px;
    font-family:'Outfit',sans-serif;
    font-weight:900; font-size:1.05rem;
    cursor:pointer; transition:all 0.2s;
    box-shadow:0 4px 20px rgba(74,222,128,0.2);
  }
  .btn-salvar:hover:not(:disabled) {
    background:#86efac;
    box-shadow:0 8px 30px rgba(74,222,128,0.4);
    transform:translateY(-2px);
  }
  .btn-salvar:disabled { opacity:0.5; cursor:not-allowed; }

  /* LOADING */
  .loading {
    display:flex; align-items:center; justify-content:center;
    padding:5rem; color:#86efac; font-weight:700;
  }
  .spinner {
    width:24px; height:24px;
    border:3px solid #1a3a1a;
    border-top-color:#4ade80;
    border-radius:50%;
    animation:spin 0.8s linear infinite;
    margin-right:1rem;
  }
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

  @media (max-width:640px) {
    .nav { padding:1rem 1.5rem; }
    .form-row { grid-template-columns:1fr; }
  }
`;

export default function Config({ guildId, token, api, onVoltar }) {
  const [guild, setGuild] = useState(null);
  const [form, setForm] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    fetch(`${api}/painel/guild/${guildId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => { setGuild(data); setForm(data.config); });
  }, [guildId, token, api]);

  function atualizar(campo, valor) {
    setForm(f => ({ ...f, [campo]: valor }));
  }

  async function salvar() {
    setSalvando(true);
    setMensagem(null);
    try {
      const res = await fetch(`${api}/painel/guild/${guildId}/save`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.sucesso) {
        setMensagem({ tipo: "sucesso", texto: "✅ Configurações salvas com sucesso!" });
      } else {
        setMensagem({ tipo: "erro", texto: "❌ " + (data.erro || "Erro ao salvar.") });
      }
    } catch {
      setMensagem({ tipo: "erro", texto: "❌ Erro de conexão. Tente novamente." });
    }
    setSalvando(false);
  }

  if (!guild) return (
    <>
      <style>{estilos}</style>
      <div className="cfg">
        <div className="loading"><div className="spinner" />Carregando...</div>
      </div>
    </>
  );

  return (
    <>
      <style>{estilos}</style>
      <div className="cfg">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-left">
            <a className="nav-logo" href="#">⬛ Creeper</a>
            <button className="btn-voltar" onClick={onVoltar}>← Voltar</button>
          </div>
        </nav>

        <div className="conteudo">

          {/* Header do servidor */}
          <div className="guild-header">
            {guild.icone
              ? <img className="guild-icon" src={guild.icone} alt={guild.nome} />
              : <div className="guild-icon-placeholder">{guild.nome[0]}</div>
            }
            <div>
              <div className="guild-name">{guild.nome}</div>
              <span className="badge">Administrador</span>
            </div>
          </div>

          {/* Servidor Minecraft */}
          <div className="secao">
            <div className="secao-titulo">🌐 Servidor Minecraft</div>
            <div className="form-row">
              <div className="campo">
                <label>IP do Servidor</label>
                <input
                  type="text"
                  value={form.ip || ""}
                  onChange={e => atualizar("ip", e.target.value)}
                  placeholder="play.meuservidor.com"
                />
              </div>
              <div className="campo">
                <label>Porta</label>
                <input
                  type="number"
                  value={form.porta || 25565}
                  onChange={e => atualizar("porta", e.target.value)}
                  placeholder="25565"
                />
              </div>
            </div>
          </div>

          {/* Personalização */}
          <div className="secao">
            <div className="secao-titulo">🎨 Personalização</div>
            <div className="campo">
              <label>Nome do Servidor</label>
              <input
                type="text"
                value={form.nome_servidor || ""}
                onChange={e => atualizar("nome_servidor", e.target.value)}
                placeholder="Meu Servidor Survival"
              />
            </div>
            <div className="campo">
              <label>Cor dos Embeds</label>
              <div className="cor-row">
                <input
                  type="text"
                  value={form.cor_embed || "#4ade80"}
                  onChange={e => atualizar("cor_embed", e.target.value)}
                  placeholder="#4ade80"
                />
                <input
                  type="color"
                  value={form.cor_embed || "#4ade80"}
                  onChange={e => atualizar("cor_embed", e.target.value)}
                />
                <div className="cor-preview" style={{ background: form.cor_embed || "#4ade80" }} />
              </div>
            </div>
          </div>

          {/* Discord */}
          <div className="secao">
            <div className="secao-titulo">📢 Discord</div>
            <div className="campo">
              <label>ID do Canal de Alertas</label>
              <input
                type="text"
                value={form.canal_alertas || ""}
                onChange={e => atualizar("canal_alertas", e.target.value)}
                placeholder="Clique direito no canal → Copiar ID"
              />
            </div>
            <div className="campo">
              <label>ID do Cargo Admin</label>
              <input
                type="text"
                value={form.cargo_admin || ""}
                onChange={e => atualizar("cargo_admin", e.target.value)}
                placeholder="Clique direito no cargo → Copiar ID"
              />
            </div>
          </div>

          {/* Mensagem feedback */}
          {mensagem && (
            <div className={`msg ${mensagem.tipo}`}>{mensagem.texto}</div>
          )}

          {/* Salvar */}
          <button className="btn-salvar" onClick={salvar} disabled={salvando}>
            {salvando ? "Salvando..." : "💾 Salvar Configurações"}
          </button>

        </div>
      </div>
    </>
  );
}
