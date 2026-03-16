const API_RAILWAY = "https://apiminecraft-production.up.railway.app";

export default function Home({ erro, api }) {
  const estilos = `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Outfit:wght@400;600;700;800;900&display=swap');

    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#050f05; }

    .home {
      min-height: 100vh;
      background: #050f05;
      color: #f0fdf4;
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
      position: relative;
    }
    .home::before {
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
      padding:1.2rem 3rem;
      background:rgba(5,15,5,0.85);
      backdrop-filter:blur(20px);
      border-bottom:1px solid #1a3a1a;
    }
    .nav-logo {
      font-family:'Press Start 2P',monospace;
      font-size:0.8rem; color:#4ade80;
      text-shadow:0 0 30px rgba(74,222,128,0.5);
      text-decoration:none;
    }
    .nav-links { display:flex; gap:2rem; list-style:none; }
    .nav-links a {
      color:#86efac; text-decoration:none;
      font-weight:700; font-size:0.95rem;
      transition:color 0.2s;
    }
    .nav-links a:hover { color:#4ade80; }
    .nav-add {
      background:#4ade80; color:#000;
      padding:0.6rem 1.4rem; border-radius:8px;
      font-weight:800; font-size:0.9rem;
      text-decoration:none; transition:all 0.2s;
      box-shadow:0 0 20px rgba(74,222,128,0.25);
    }
    .nav-add:hover { background:#86efac; transform:translateY(-2px); }

    /* HERO */
    .hero {
      min-height:100vh;
      display:flex; align-items:center; justify-content:center;
      flex-direction:column; text-align:center;
      padding:8rem 2rem 5rem;
      position:relative; z-index:1;
    }
    .glow {
      position:absolute; top:35%; left:50%;
      transform:translate(-50%,-50%);
      width:700px; height:700px;
      background:radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 65%);
      pointer-events:none;
      animation:pulse 4s ease-in-out infinite;
    }
    @keyframes pulse {
      0%,100% { opacity:1; transform:translate(-50%,-50%) scale(1); }
      50%      { opacity:0.5; transform:translate(-50%,-50%) scale(1.1); }
    }

    /* Creeper face */
    .face {
      display:grid;
      grid-template-columns:repeat(10,1fr);
      gap:4px; width:min(180px,45vw);
      margin:0 auto 2.5rem;
      animation:fadeUp 0.8s 0.2s both;
      filter:drop-shadow(0 0 25px rgba(74,222,128,0.5));
    }
    .fp { width:100%; aspect-ratio:1; border-radius:2px; }
    .fg { background:#4ade80; }
    .fm { background:#16a34a; }
    .fk { background:#030a03; }
    .fe { background:transparent; }

    .tag {
      font-family:'Press Start 2P',monospace;
      font-size:0.55rem; color:#16a34a;
      letter-spacing:5px; margin-bottom:1.2rem;
      animation:fadeUp 0.7s 0.4s both;
    }
    .hi {
      font-size:clamp(1rem,2.5vw,1.4rem);
      font-weight:600; color:#86efac;
      margin-bottom:0.3rem;
      animation:fadeUp 0.7s 0.5s both;
    }
    .title {
      font-family:'Press Start 2P',monospace;
      font-size:clamp(2rem,7vw,5rem);
      color:#4ade80; line-height:1.3;
      text-shadow:6px 6px 0 #14532d, 0 0 60px rgba(74,222,128,0.3);
      margin-bottom:1.5rem;
      animation:fadeUp 0.7s 0.6s both;
    }
    .sub {
      font-size:clamp(1rem,2vw,1.2rem);
      color:#86efac; max-width:560px;
      line-height:1.8; margin-bottom:3rem;
      animation:fadeUp 0.7s 0.8s both;
    }
    .btns {
      display:flex; gap:1rem; flex-wrap:wrap; justify-content:center;
      animation:fadeUp 0.7s 1s both;
    }

    .btn-g {
      display:inline-flex; align-items:center; gap:0.6rem;
      background:#4ade80; color:#000;
      padding:1rem 2.2rem; border-radius:10px;
      font-weight:900; font-size:1.05rem;
      text-decoration:none;
      box-shadow:0 4px 30px rgba(74,222,128,0.3);
      transition:all 0.2s; border:none; cursor:pointer;
    }
    .btn-g:hover { background:#86efac; transform:translateY(-4px); box-shadow:0 10px 40px rgba(74,222,128,0.5); }

    .btn-o {
      display:inline-flex; align-items:center; gap:0.6rem;
      background:transparent; color:#f0fdf4;
      padding:1rem 2.2rem; border-radius:10px;
      font-weight:800; font-size:1.05rem;
      text-decoration:none; border:2px solid #1a3a1a;
      transition:all 0.2s; cursor:pointer;
    }
    .btn-o:hover { border-color:#4ade80; color:#4ade80; transform:translateY(-4px); }

    .btn-d {
      display:inline-flex; align-items:center; gap:0.6rem;
      background:#5865F2; color:#fff;
      padding:1rem 2.2rem; border-radius:10px;
      font-weight:800; font-size:1.05rem;
      text-decoration:none;
      box-shadow:0 4px 20px rgba(88,101,242,0.3);
      transition:all 0.2s; border:none; cursor:pointer;
    }
    .btn-d:hover { background:#4752c4; transform:translateY(-4px); }

    .arrow {
      position:absolute; bottom:2.5rem; left:50%;
      transform:translateX(-50%);
      color:#86efac; font-size:1.5rem;
      animation:bounce 2s infinite; opacity:0.4;
    }
    @keyframes bounce {
      0%,100% { transform:translateX(-50%) translateY(0); }
      50%      { transform:translateX(-50%) translateY(10px); }
    }

    /* STATS */
    .stats {
      position:relative; z-index:1;
      display:flex; justify-content:center;
      padding:0 2rem 5rem; gap:1px; flex-wrap:wrap;
    }
    .st {
      flex:1; max-width:220px; min-width:120px;
      background:#0d1f0d; border:1px solid #1a3a1a;
      padding:2rem 1.5rem; text-align:center;
    }
    .st:first-child { border-radius:14px 0 0 14px; }
    .st:last-child  { border-radius:0 14px 14px 0; }
    .stn { font-family:'Press Start 2P',monospace; font-size:1.4rem; color:#4ade80; display:block; margin-bottom:0.5rem; }
    .stl { color:#86efac; font-size:0.85rem; font-weight:700; }

    /* FEATURES */
    .features {
      position:relative; z-index:1;
      max-width:1100px; margin:0 auto;
      padding:3rem 2rem 6rem;
    }
    .eyebrow {
      font-family:'Press Start 2P',monospace;
      font-size:0.5rem; color:#16a34a;
      letter-spacing:4px; display:block; margin-bottom:1rem;
    }
    .sec-title { font-size:clamp(1.8rem,4vw,3rem); font-weight:900; line-height:1.2; margin-bottom:1rem; }
    .sec-sub { color:#86efac; font-size:1.05rem; line-height:1.7; max-width:560px; margin-bottom:3.5rem; }

    .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(310px,1fr)); gap:1.5rem; }
    .card {
      background:#0d1f0d; border:1px solid #1a3a1a;
      border-radius:18px; padding:2rem;
      transition:all 0.3s;
    }
    .card:hover { border-color:#16a34a; transform:translateY(-6px); box-shadow:0 20px 50px rgba(74,222,128,0.1); }
    .card:hover .icon { transform:scale(1.15) rotate(-5deg); }
    .icon { font-size:2.8rem; display:block; margin-bottom:1.2rem; transition:transform 0.3s; }
    .card-title { font-size:1.15rem; font-weight:900; margin-bottom:0.6rem; }
    .card-desc { color:#86efac; font-size:0.9rem; line-height:1.65; }

    /* CTA */
    .cta { position:relative; z-index:1; text-align:center; padding:6rem 2rem 8rem; }
    .cta::before {
      content:''; position:absolute; top:50%; left:50%;
      transform:translate(-50%,-50%);
      width:800px; height:400px;
      background:radial-gradient(ellipse, rgba(74,222,128,0.06) 0%, transparent 70%);
      pointer-events:none;
    }

    /* FOOTER */
    footer {
      position:relative; z-index:1;
      border-top:1px solid #1a3a1a;
      padding:2.5rem 3rem;
      display:flex; align-items:center;
      justify-content:space-between; flex-wrap:wrap; gap:1rem;
    }
    .flogo { font-family:'Press Start 2P',monospace; font-size:0.7rem; color:#4ade80; text-decoration:none; }
    .flinks { display:flex; gap:2rem; list-style:none; }
    .flinks a { color:#86efac; text-decoration:none; font-size:0.85rem; font-weight:600; transition:color 0.2s; }
    .flinks a:hover { color:#4ade80; }
    .fcopy { color:#2d5a2d; font-size:0.8rem; font-weight:600; }

    /* ERRO */
    .erro-box {
      background:#2a0a0a; border:1px solid #ED4245;
      border-radius:10px; padding:0.8rem 1.2rem;
      color:#ED4245; font-size:0.9rem; font-weight:600;
      margin-bottom:1.5rem; animation:fadeUp 0.5s both;
    }

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes floatUp {
      0%   { transform:translateY(0) rotate(0deg); }
      100% { transform:translateY(-110vh) rotate(360deg); }
    }

    @media (max-width:640px) {
      .nav { padding:1rem 1.5rem; }
      .nav-links { display:none; }
      .st { flex:1 1 40%; }
      .st:first-child, .st:last-child { border-radius:14px; }
      footer { flex-direction:column; text-align:center; }
      .flinks { justify-content:center; }
    }
  `;

  return (
    <>
      <style>{estilos}</style>
      <div className="home">

        {/* NAV */}
        <nav className="nav">
          <a className="nav-logo" href="#">⬛ Creeper</a>
          <ul className="nav-links">
            <li><a href="#recursos">Recursos</a></li>
            <li><a href={`${api}/painel/auth/discord`}>Painel</a></li>
          </ul>
          <a className="nav-add" href="https://discord.com/oauth2/authorize?client_id=1482572584431390772&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noreferrer">
            ⛏️ Adicionar
          </a>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="glow" />

          {/* Creeper face */}
          <div className="face">
            <div className="fp fe"/><div className="fp fe"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fe"/><div className="fp fe"/>
            <div className="fp fe"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fe"/>
            <div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/>
            <div className="fp fg"/><div className="fp fg"/><div className="fp fk"/><div className="fp fk"/><div className="fp fg"/><div className="fp fg"/><div className="fp fk"/><div className="fp fk"/><div className="fp fg"/><div className="fp fg"/>
            <div className="fp fg"/><div className="fp fg"/><div className="fp fk"/><div className="fp fk"/><div className="fp fg"/><div className="fp fg"/><div className="fp fk"/><div className="fp fk"/><div className="fp fg"/><div className="fp fg"/>
            <div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fk"/><div className="fp fk"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/>
            <div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fk"/><div className="fp fk"/><div className="fp fk"/><div className="fp fk"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/>
            <div className="fp fg"/><div className="fp fg"/><div className="fp fk"/><div className="fp fk"/><div className="fp fg"/><div className="fp fg"/><div className="fp fk"/><div className="fp fk"/><div className="fp fg"/><div className="fp fg"/>
            <div className="fp fg"/><div className="fp fg"/><div className="fp fk"/><div className="fp fk"/><div className="fp fg"/><div className="fp fg"/><div className="fp fk"/><div className="fp fk"/><div className="fp fg"/><div className="fp fg"/>
            <div className="fp fg"/><div className="fp fm"/><div className="fp fm"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fg"/><div className="fp fm"/><div className="fp fm"/><div className="fp fg"/>
          </div>

          <p className="tag">🌿 Bot Minecraft para Discord</p>
          <p className="hi">Olá, eu sou o</p>
          <h1 className="title">Creeper</h1>
          <p className="sub">
            O bot feito pra servidores Minecraft no Discord.<br />
            Status de servidores, perfis de jogadores, receitas de itens e muito mais!
          </p>

          {erro && <div className="erro-box">{erro}</div>}

          <div className="btns">
            <a className="btn-g" href="https://discord.com/oauth2/authorize?client_id=1482572584431390772&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noreferrer">
              ⛏️ Me adicione!
            </a>
            <a className="btn-o" href="#recursos">★ Saiba Mais</a>
            <a className="btn-d" href={`${api}/painel/auth/discord`}>
              ⚙️ Painel de Controle
            </a>
          </div>

          <div className="arrow">↓</div>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="st"><span className="stn">4</span><span className="stl">Comandos</span></div>
          <div className="st"><span className="stn">∞</span><span className="stl">Servidores</span></div>
          <div className="st"><span className="stn">24/7</span><span className="stl">Online</span></div>
          <div className="st"><span className="stn">Free</span><span className="stl">Gratuito</span></div>
        </div>

        {/* FEATURES */}
        <div className="features" id="recursos">
          <span className="eyebrow">✦ Funcionalidades</span>
          <h2 className="sec-title">Tudo que o seu<br />servidor precisa</h2>
          <p className="sec-sub">Do status em tempo real até perfis de jogadores — o Creeper tem tudo integrado e pronto pra usar.</p>
          <div className="grid">
            {[
              { icon: "🌐", title: "Status do Servidor", desc: "Consulte qualquer servidor Minecraft em tempo real. Jogadores online, versão, MOTD e muito mais." },
              { icon: "🎮", title: "Perfil de Jogadores", desc: "UUID, skin em 3D, head e histórico de nomes de qualquer jogador Java Edition." },
              { icon: "📦", title: "Enciclopédia de Itens", desc: "Receitas de craft, IDs e informações de qualquer item do Minecraft 1.20. Suporta português!" },
              { icon: "⚙️", title: "Painel Web", desc: "Configure o bot pelo navegador. IP, alertas, cor dos embeds e cargo admin facilmente." },
              { icon: "🔔", title: "Alertas Automáticos", desc: "Notificações no canal quando o servidor entrar ou sair do ar. Nunca perca nada!" },
              { icon: "🎨", title: "Totalmente Customizável", desc: "Cores, nome, canal e cargo por servidor. Cada Discord com a sua identidade." },
            ].map((f, i) => (
              <div className="card" key={i}>
                <span className="icon">{f.icon}</span>
                <div className="card-title">{f.title}</div>
                <p className="card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta">
          <span className="eyebrow" style={{display:"block"}}>✦ Pronto para começar?</span>
          <h2 className="sec-title">Adicione o Creeper<br />agora mesmo!</h2>
          <p className="sec-sub" style={{margin:"0 auto 2.5rem"}}>Gratuito, fácil de configurar e sempre online.</p>
          <div className="btns" style={{opacity:1,animation:"none"}}>
            <a className="btn-g" href="https://discord.com/oauth2/authorize?client_id=1482572584431390772&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noreferrer">
              ⛏️ Adicionar ao Discord
            </a>
            <a className="btn-d" href={`${api}/painel/auth/discord`}>
              ⚙️ Acessar Painel
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <footer>
          <a className="flogo" href="#">⬛ Creeper Bot</a>
          <ul className="flinks">
            <li><a href="#recursos">Recursos</a></li>
            <li><a href={`${api}/painel/auth/discord`}>Painel</a></li>
          </ul>
          <span className="fcopy">© 2026 Creeper Bot</span>
        </footer>

      </div>
    </>
  );
}
