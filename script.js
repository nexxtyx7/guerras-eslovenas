const apps = {
  bank: {
    title: "Banco Central da Resenha",
    icon: "₿",
    html: `
      <div class="hero">
        <div>
          <div class="muted">Conta principal • ResenhaCoin</div>
          <div class="balance">R$ 12.480,00 <small>RSC</small></div>
          <div class="muted" style="margin-top:5px">≈ 12.480 ResenhaCoins</div>
        </div>
        <span class="pill">● Sistema estável</span>
      </div>
      <div class="cards">
        <div class="card"><label>Inflação</label><strong class="down">3,2%</strong><div class="muted">últimos 30 dias</div></div>
        <div class="card"><label>Taxa básica</label><strong>8,75%</strong><div class="muted">taxa RSC</div></div>
        <div class="card"><label>Câmbio</label><strong>1 RSC</strong><div class="muted">= R$ 1,00</div></div>
      </div>
      <div class="transactions">
        <h3>Últimas movimentações</h3>
        <div class="transaction"><div class="tx-left"><div class="tx-icon">↗</div><div><div class="tx-name">PIX recebido — João</div><div class="tx-date">Hoje, 18:42</div></div></div><div class="tx-value up">+ R$ 250,00</div></div>
        <div class="transaction"><div class="tx-left"><div class="tx-icon">↘</div><div><div class="tx-name">Compra — Lanche</div><div class="tx-date">Hoje, 15:10</div></div></div><div class="tx-value down">− R$ 32,50</div></div>
        <div class="transaction"><div class="tx-left"><div class="tx-icon">↗</div><div><div class="tx-name">Pagamento — Projeto</div><div class="tx-date">Ontem, 20:03</div></div></div><div class="tx-value up">+ R$ 600,00</div></div>
      </div>`
  },
  stats: {
    title: "Indicadores da Resenha",
    icon: "▥",
    html: `
      <div class="hero"><div><h2>Painel econômico</h2><div class="muted">Dados fictícios do universo da Resenha</div></div><span class="pill">Atualizado agora</span></div>
      <div class="dashboard-grid">
        <div class="card big-stat"><div><label>PIB da Resenha</label><strong>R$ 48,7 mil</strong></div><div class="bar-chart"><i class="bar" style="height:42%"></i><i class="bar" style="height:55%"></i><i class="bar" style="height:48%"></i><i class="bar" style="height:70%"></i><i class="bar" style="height:64%"></i><i class="bar" style="height:82%"></i><i class="bar" style="height:92%"></i></div></div>
        <div class="card"><label>Desemprego</label><strong>4,8%</strong><p class="muted" style="margin-top:8px">Força de trabalho ativa</p><hr style="border:0;border-top:1px solid #ffffff0b;margin:18px 0"><label>Confiança</label><strong class="up">82/100</strong></div>
      </div>
      <div class="cards" style="margin-top:14px"><div class="card"><label>População</label><strong>27</strong><div class="muted">cidadãos registrados</div></div><div class="card"><label>Empresas</label><strong>14</strong><div class="muted">ativas</div></div><div class="card"><label>ResenhaCoins em circulação</label><strong>84,2k</strong><div class="muted">RSC</div></div></div>`
  },
  notes: {
    title: "Notas",
    icon: "✎",
    html: `<div class="hero"><div><h2>Bloco de notas</h2><div class="muted">Anotações salvas neste dispositivo</div></div></div><div class="notes"><textarea id="notesArea" placeholder="Escreva alguma coisa..."></textarea></div>`
  },
  settings: {
    title: "Configurações",
    icon: "⚙",
    html: `<div class="hero"><div><h2>Configurações</h2><div class="muted">Personalize sua experiência no Resenha OS.</div></div></div>
      <div class="card"><div class="settings-row"><div><strong>Modo online</strong><div class="muted">Conectar aos serviços da Resenha</div></div><div class="switch"></div></div>
      <div class="settings-row"><div><strong>Notificações</strong><div class="muted">Avisos do sistema</div></div><div class="switch"></div></div>
      <div class="settings-row"><div><strong>Atualizações automáticas</strong><div class="muted">Manter o sistema atualizado</div></div><div class="switch"></div></div></div>`
  }
};

const windows = document.getElementById("windows");
const taskApps = document.getElementById("taskApps");
const startMenu = document.getElementById("startMenu");

function openApp(key){
  const existing = document.querySelector(`[data-window="${key}"]`);
  if(existing){ existing.style.display="block"; return; }
  const app=apps[key];
  const win=document.createElement("section");
  win.className="window";
  win.dataset.window=key;
  win.innerHTML=`<div class="window-head"><div class="window-title"><span>${app.icon}</span>${app.title}</div><div class="window-controls"><button class="min">—</button><button class="close">×</button></div></div><div class="window-body">${app.html}</div>`;
  windows.appendChild(win);
  win.querySelector(".close").onclick=()=>{win.remove(); document.querySelector(`[data-task="${key}"]`)?.remove()};
  win.querySelector(".min").onclick=()=>win.style.display="none";
  const task=document.createElement("button");
  task.className="task-app"; task.dataset.task=key; task.innerHTML=`${app.icon} <span>${app.title.replace("Banco Central da Resenha","Banco Central")}</span>`;
  task.onclick=()=>{win.style.display="block"};
  taskApps.appendChild(task);
  const area=win.querySelector(".window-body");
  const notes=area.querySelector("#notesArea");
  if(notes){
    notes.value=localStorage.getItem("resenha_notes")||"";
    notes.addEventListener("input",()=>localStorage.setItem("resenha_notes",notes.value));
  }
}

document.querySelectorAll("[data-app]").forEach(el=>el.addEventListener("click",()=>{openApp(el.dataset.app);startMenu.classList.add("hidden")}));
document.getElementById("startBtn").onclick=()=>startMenu.classList.toggle("hidden");

function updateClock(){
  const now=new Date();
  const time=now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  document.getElementById("clock").textContent=time;
  document.getElementById("taskClock").textContent=time;
}
setInterval(updateClock,1000); updateClock();

setTimeout(()=>{
  document.getElementById("boot").classList.add("hidden");
  document.getElementById("desktop").classList.remove("hidden");
},1600);
