let jogadores = [];
let avatarAtual = "";
let perguntaAtual = 0;
let perguntasJogo = [];

/* INICIAR */
function iniciarJogo() {
  // embaralha todas as perguntas
  perguntasJogo = [...perguntas].sort(() => 0.5 - Math.random());

  // pega apenas as 10 primeiras
  perguntasJogo = perguntasJogo.slice(0, 10);

  perguntaAtual = 0;

  cadastro.classList.add("hidden");
  quiz.classList.remove("hidden");

  carregarPergunta();
}

/* BANCO DE PERGUNTAS (adicione quantas quiser) */
const perguntas = [
  { q: "Qual é o menor país do mundo?", a: ["Mônaco", "Vaticano", "Malta", "San Marino"], correta: 1 },
  { q: "Quem escreveu Dom Quixote?", a: ["Machado de Assis", "Cervantes", "Camões", "Shakespeare"], correta: 1 },
  { q: "Qual é o metal líquido em temperatura ambiente?", a: ["Mercúrio", "Ferro", "Alumínio", "Prata"], correta: 0 },
  { q: "Qual é o animal mais rápido do mundo?", a: ["Leopardo", "Guepardo", "Falcão-peregrino", "Cavalo"], correta: 2 },
  { q: "Qual é a capital da Argentina?", a: ["Buenos Aires", "Córdoba", "Rosário", "Mendoza"], correta: 0 },
  { q: "Quantos segundos tem um minuto?", a: ["60", "100", "30", "120"], correta: 0 },
  { q: "Quem foi o primeiro homem a pisar na Lua?", a: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], correta: 1 },
  { q: "Qual é o maior deserto do mundo?", a: ["Saara", "Gobi", "Antártida", "Kalahari"], correta: 2 },
  { q: "Qual é o idioma mais falado no mundo?", a: ["Inglês", "Mandarim", "Espanhol", "Hindi"], correta: 1 },
  { q: "Qual é o símbolo químico da água?", a: ["O2", "H2O", "CO2", "HO"], correta: 1 },
  { q: "Qual é o maior país do mundo em território?", a: ["China", "Canadá", "Rússia", "EUA"], correta: 2 },
  { q: "Quem foi o primeiro presidente do Brasil?", a: ["Deodoro da Fonseca", "Getúlio Vargas", "Pedro II", "Floriano Peixoto"], correta: 0 },
  { q: "Qual é o rio mais longo do mundo?", a: ["Nilo", "Amazonas", "Yangtzé", "Mississippi"], correta: 1 },
  { q: "Qual é a moeda oficial do Japão?", a: ["Yuan", "Won", "Iene", "Dólar"], correta: 2 },
  { q: "Quem escreveu 'Hamlet'?", a: ["Shakespeare", "Cervantes", "Goethe", "Camões"], correta: 0 },
  { q: "Qual é o maior mamífero do mundo?", a: ["Elefante", "Baleia Azul", "Girafa", "Orca"], correta: 1 },
  { q: "Qual é a capital de Portugal?", a: ["Lisboa", "Porto", "Coimbra", "Braga"], correta: 0 },
  { q: "Quantos estados tem o Brasil?", a: ["24", "25", "26", "27"], correta: 3 },
  { q: "Qual é o elemento químico representado por 'Au'?", a: ["Prata", "Cobre", "Ouro", "Alumínio"], correta: 2 },
  { q: "Quem criou a teoria da relatividade?", a: ["Newton", "Einstein", "Galileu", "Tesla"], correta: 1 },
];

/* AVATARES */
document.querySelectorAll(".avatares img").forEach(img => {
  img.onclick = () => {
    document.querySelectorAll(".avatares img").forEach(i => i.classList.remove("ativo"));
    img.classList.add("ativo");
    avatarAtual = img.src;
  };
});

/* CADASTRO */
function adicionarJogador() {
  const nome = nomeJogador.value.trim();
  if (!nome || !avatarAtual) return alert("Preencha tudo");

  jogadores.push({ nome, avatar: avatarAtual, pontos: 0, resposta: null });
  nomeJogador.value = "";
  renderJogadores();
}

function renderJogadores() {
  cardsJogadores.innerHTML = jogadores.map((j, i) => `
    <div class="card">
      <p>Jogador ${i + 1}</p>
      <img src="${j.avatar}">
      <p>${j.nome}</p>
    </div>
  `).join("");
}

/* INICIAR */
function iniciarJogo() {
  perguntasJogo = [...perguntas].sort(() => 0.5 - Math.random());
  perguntaAtual = 0;

  cadastro.classList.add("hidden");
  quiz.classList.remove("hidden");

  carregarPergunta();
}

/* CARREGAR PERGUNTA */
function carregarPergunta() {
  if (perguntaAtual >= perguntasJogo.length) {
    return mostrarFimDeJogo();
  }

  jogadores.forEach(j => j.resposta = null);

  const p = perguntasJogo[perguntaAtual];
  pergunta.innerText = p.q;

  alternativas.innerHTML = p.a.map((alt, i) => `
    <div class="alternativa">
      <span>${String.fromCharCode(65 + i)}</span>${alt}
    </div>
  `).join("");

  respostasJogadores.innerHTML = jogadores.map((j, i) => `
    <div class="jogador-card">
      <h4>${j.nome}</h4>
      <div class="letras">
        ${["A", "B", "C", "D"].map((l, idx) => `
          <button onclick="responder(${i},${idx},this)">${l}</button>
        `).join("")}
      </div>
    </div>
  `).join("");

  btnRevelar.disabled = true;
  btnRevelar.classList.add("desativado");
}

/* RESPONDER */
function responder(jogador, alt, btn) {
  jogadores[jogador].resposta = alt;
  btn.parentElement.querySelectorAll("button").forEach(b => b.classList.remove("selecionado"));
  btn.classList.add("selecionado");

  if (jogadores.every(j => j.resposta !== null)) {
    btnRevelar.disabled = false;
    btnRevelar.classList.remove("desativado");
    btnRevelar.classList.add("verde");
  }
}

/* REVELAR */
btnRevelar.onclick = () => {
  const correta = perguntasJogo[perguntaAtual].correta;
  const letraCorreta = String.fromCharCode(65 + correta);
  const acertaram = [];

  jogadores.forEach(j => {
    if (j.resposta === correta) {
      j.pontos++;
      acertaram.push(j);
    }
  });

  modal.classList.remove("hidden");

  let html = `
    <h2 class="titulo-resultado">Resultado</h2>
  `;

  // 👉 SE ALGUÉM ACERTOU
  if (acertaram.length > 0) {
    html += `
      <img src="img/emojiJoia.jpg" class="img-resultado">

      <div class="acertos">
        ${acertaram.map(j => `
          <div class="acerto-item">
            <img src="${j.avatar}">
            <p>${j.nome}</p>
          </div>
        `).join("")}
      </div>

      <p class="texto-acerto">
        ${acertaram.map(j => j.nome).join(" e ")} acertaram!
      </p>
    `;
  }
  // 👉 SE NINGUÉM ACERTOU
  else {
    html += `
      <img src="img/emojiPerdeu.jpg" class="img-resultado">

      <p class="texto-erro">
        Ninguém acertou<br>
        Resposta correta: <strong>${letraCorreta}</strong>
      </p>
    `;
  }

  resultado.innerHTML = html;
};




/* FECHAR MODAL */
function fecharModal() {
  modal.classList.add("hidden");
  perguntaAtual++;
  carregarPergunta();
}

/* FIM */
function mostrarFimDeJogo() {
  // ESCONDE O QUIZ
  quiz.classList.add("hidden");

  const ranking = document.getElementById("rankingFinal");
  ranking.innerHTML = "";

  const ordenados = [...jogadores].sort((a, b) => b.pontos - a.pontos);

  ordenados.forEach((j, index) => {
    ranking.innerHTML += `
      <div class="ranking-item ${index === 0 ? "primeiro" : ""}">
        <div class="ranking-esquerda">
          <span class="ranking-posicao">#${index + 1}</span>
          <img src="${j.avatar}">
          <span class="ranking-nome">${j.nome}</span>
        </div>
        <span class="ranking-pontos">${j.pontos} pts</span>
      </div>
    `;
  });

  // MOSTRA A TELA FINAL
  document.getElementById("fimJogo").classList.remove("hidden");
}




