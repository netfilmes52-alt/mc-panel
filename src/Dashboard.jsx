import { useState, useEffect } from "react";

const estilos = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Outfit:wght@400;600;700;800;900&display=swap');

  * { margin:0; padding:0; box-sizing:border-box; }

  .dash {
    min-height:100vh;
    background:#050f05;
    color:#f0fdf4;
    font-family:'Outfit',sans-serif;
    position:relative;
  }
  .dash::before {
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
  .nav-logo {
    font-family:'Press Start 2P',monospace;
    font-size:0.75rem; color:#4ade80;
    text-shadow:0 0 20px rgba(74,222,128,0.5);
    text-decoration:none;
  }
  .nav-user {
    display:flex; align-items:center; gap:1rem;
  }
  .nav-avatar {
    width:36px; height:36px; border-radius:50%;
    border:2px solid #1a3a1a;
  }
  .nav-username {
    color:#86efac; font-weight:700; font-size:0.9rem;
  }
  .btn-sair {
    background:transparent; color:#86efac;
    border:1px solid #1a3a1a; border-radius:8px;
    padding:0.4rem 1rem; cursor:pointer;
    font-family:'Outfit',sans-serif;
    font-weight:700; font-size:0.85rem;
    transition:all 0.2s; text-decoration:none;
    display:inline-block;
  }
  .btn-sair:hover { border-color:#ED4245; color:#ED4245; }

  /* CONTEUDO */
  .conteudo {
    position:relative; z-index:1;
    max-width:1000px; margin:0 auto;
    padding:7rem 2rem 4rem;
  }

  .page-header { margin-bottom:2.5rem; }
  .page-tag {
    font-family:'Press Start 2P',monospace;
    font-size:0.5rem; color:#16a34a;
    letter-spacing:4px; display:block; margin-bottom:0.8rem;
  }
  .page-title {
    font-size:2rem; font-weight:900;
    margin-bottom:0.4rem;
  }
  .page-sub { color:#86efac; font-size:0.95rem; font-weight:600; }

  /* GRID SERVIDORES */
  .guild-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));
    gap:1.2rem;
  }

  .guild-card {
    background:#0d1f0d;
    border:1px solid #1a3a1a;
    border-radius:16px;
    padding:1.5rem;
    cursor:pointer;
    transition:all 0.25s;
    position:relative;
    overflow:hidden;
  }
  .guild-card::before {
    content:'';
    position:absolute; top:0; left:0; right:0;
    height:3px;
    background:linear-gradient(90deg, #4ade80, #16a34a);
    transform:scaleX(0); transform-origin:left;
    transition:transform 0.3s;
  }
  .guild-card:hover {
    border-color:#16a34a;
    transform:translateY(-4px);
    box-shadow:0 12px 40px rgba(74,222,128,0.12);
  }
  .guild-card:hover::before { transform:scaleX(1); }

  .guild-header {
    display:flex; align-items:center; gap:1rem;
    margin-bottom:1rem;
  }
  .guild-icon {
    width:52px; height:52px; border-radius:50%;
    border:2px solid #1a3a1a; flex-shrink:0;
    object-fit:cover;
  }
  .guild-icon-placeholder {
    width:52px; height:52px; border-radius:50%;
    background:linear-gradient(135deg, #16a34a, #14532d);
    display:flex; align-items:center; justify-content:center;
    font-weight:900; font-size:1.3rem; flex-shrink:0;
    border:2px solid #1a3a1a;
  }
  .guild-name { font-weight:800; font-size:1.05rem; margin-bottom:0.2rem; }
  .guild-id { color:#2d5a2d; font-size:0.75rem; font-weight:600; }

  .guild-info {
    border-top:1px solid #1a3a1a;
    padding-top:0.8rem; margin-bottom:1rem;
  }
  .guild-info-row {
    color:#86efac; font-size:0.82rem;
    font-weight:600; margin-bottom:0.3rem;
    display:flex; align-items:center; gap:0.4rem;
  }
  .guild-info-row.offline { color:#2d5a2d; }

  .btn-config {
    width:100%; padding:0.7rem;
    background:#4ade80; color:#000;
    border:none; border-radius:10px;
    font-family:'Outfit',sans-serif;
    font-weight:800; font-size:0.95rem;
    cursor:pointer; transition:all 0.2s;
  }
  .btn-config:hover { background:#86efac; }

  /* EMPTY */
  .empty {
    text-align:center;
    background:#0d1f0d;
    border:1px solid #1a3a1a;
    border-radius:16px;
    padding:4rem 2rem;
    grid-column:1/-1;
  }
  .empty-icon { font-size:3rem; margin-bottom:1rem; display:block; }
  .empty-title { font-size:1.2rem; font-weight:800; margin-bottom:0.5rem; }
  .empty-sub { color:#86efac; font-size:0.9rem; }

  /* LOADING */
  .loading {
    display:flex; align-items:center; justify-content:center;
    padding:5rem;
    color:#86efac; font-weight:700;
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

  @media (max-width:640px) {
    .nav { padding:1rem 1.5rem; }
    .nav-username { display:none; }
  }
`;

export default function Dashboard({ usuario, token, api, onSelecionarGuild, onLogout }) {
  const [guilds, setGuilds] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(`${api}/painel/guilds`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => { setGuilds(data); setCarregando(false); })
      .catch(() => setCarregando(false));
  }, [token, api]);

  return (
    <>
      <style>{estilos}</style>
      <div className="dash">

        {/* NAV */}
        <nav className="nav">
          <a className="nav-logo" href="#">⬛ Creeper</a>
          <div className="nav-user">
            <img className="nav-avatar" src={usuario.avatar} alt="" />
            <span className="nav-username">{usuario.username}</span>
            <a className="btn-sair" href={`${api}/painel/auth/logout?token=${token}`}>
              Sair
            </a>
          </div>
        </nav>

        {/* CONTEUDO */}
        <div className="conteudo">
          <div className="page-header">
            <span className="page-tag">✦ Painel de Controle</span>
            <h1 className="page-title">Seus Servidores</h1>
            <p className="page-sub">Selecione um servidor para configurar o Creeper Bot.</p>
          </div>

          {carregando ? (
            <div className="loading">
              <div className="spinner" />
              Carregando servidores...
            </div>
          ) : (
            <div className="guild-grid">
              {guilds.length === 0 ? (
                <div className="empty">
                  <span className="empty-icon">⬛</span>
                  <div className="empty-title">Nenhum servidor encontrado</div>
                  <p className="empty-sub">Você precisa ser Administrador em um servidor que tenha o Creeper Bot.</p>
                </div>
              ) : guilds.map(guild => (
                <div className="guild-card" key={guild.id} onClick={() => onSelecionarGuild(guild)}>
                  <div className="guild-header">
                    {guild.icone
                      ? <img className="guild-icon" src={guild.icone} alt={guild.nome} />
                      : <div className="guild-icon-placeholder">{guild.nome[0]}</div>
                    }
                    <div>
                      <div className="guild-name">{guild.nome}</div>
                      <div className="guild-id">{guild.id}</div>
                    </div>
                  </div>

                  <div className="guild-info">
                    <div className={`guild-info-row ${!guild.config.ip ? 'offline' : ''}`}>
                      🌐 {guild.config.ip ? `${guild.config.ip}:${guild.config.porta}` : "IP não configurado"}
                    </div>
                    <div className="guild-info-row">
                      🖥️ {guild.config.nome_servidor || "Meu Servidor"}
                    </div>
                  </div>

                  <button className="btn-config">
                    Configurar →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
