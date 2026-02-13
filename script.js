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

/* BANCO DE PERGUNTAS */
const perguntas = [
  {
    q: "Qual planeta é conhecido como o Planeta Vermelho?",
    a: [
      "Marte, por causa da sua superfície avermelhada",
      "Júpiter, por ser o maior planeta",
      "Vênus, por ser o mais quente",
      "Saturno, por causa dos seus anéis"
    ],
    correta: 0
  },

  {
    q: "Qual é o maior oceano do planeta Terra?",
    a: [
      "Oceano Atlântico",
      "Oceano Índico",
      "Oceano Pacífico",
      "Oceano Ártico"
    ],
    correta: 2
  },

  {
    q: "Quem pintou a obra Mona Lisa?",
    a: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo"
    ],
    correta: 2
  },

  {
    q: "Qual país é conhecido como a Terra do Sol Nascente?",
    a: [
      "China",
      "Coreia do Sul",
      "Japão",
      "Tailândia"
    ],
    correta: 2
  },

  {
    q: "Qual é o maior órgão do corpo humano?",
    a: [
      "O coração",
      "A pele",
      "O fígado",
      "O pulmão"
    ],
    correta: 1
  },

  {
    q: "Qual é a montanha mais alta do mundo?",
    a: [
      "Monte Kilimanjaro",
      "Monte Everest",
      "Monte Fuji",
      "Monte Aconcágua"
    ],
    correta: 1
  },

  {
    q: "Em que continente fica o Egito?",
    a: [
      "África",
      "Ásia",
      "Europa",
      "América"
    ],
    correta: 0
  },

  {
    q: "Qual é a capital do Canadá?",
    a: [
      "Toronto",
      "Vancouver",
      "Ottawa",
      "Montreal"
    ],
    correta: 2
  },

  {
    q: "Qual gás é essencial para a respiração humana?",
    a: [
      "Oxigênio",
      "Nitrogênio",
      "Gás Carbônico",
      "Hélio"
    ],
    correta: 0
  },

  {
    q: "Quem foi o descobridor do Brasil em 1500?",
    a: [
      "Cristóvão Colombo",
      "Pedro Álvares Cabral",
      "Vasco da Gama",
      "Fernão de Magalhães"
    ],
    correta: 1
  },

  {
    q: "Qual é o maior animal terrestre do mundo?",
    a: [
      "Elefante africano",
      "Rinoceronte branco",
      "Girafa",
      "Hipopótamo"
    ],
    correta: 0
  },

  {
    q: "Qual é a capital da Itália?",
    a: [
      "Milão",
      "Veneza",
      "Roma",
      "Florença"
    ],
    correta: 2
  },

  {
    q: "Qual instrumento mede a temperatura?",
    a: [
      "Barômetro",
      "Termômetro",
      "Higrômetro",
      "Altímetro"
    ],
    correta: 1
  },

  {
    q: "Qual é o maior planeta do Sistema Solar?",
    a: [
      "Terra",
      "Marte",
      "Júpiter",
      "Saturno"
    ],
    correta: 2
  },

  {
    q: "Qual é o idioma oficial do Brasil?",
    a: [
      "Espanhol",
      "Inglês",
      "Português",
      "Francês"
    ],
    correta: 2
  },

  {
    q: "Qual é o país com maior população do mundo atualmente?",
    a: [
      "Estados Unidos",
      "Índia",
      "China",
      "Indonésia"
    ],
    correta: 1
  },

  {
    q: "Qual é a capital da Espanha?",
    a: [
      "Barcelona",
      "Sevilha",
      "Madri",
      "Valência"
    ],
    correta: 2
  },

  {
    q: "Qual é o principal gás responsável pelo efeito estufa?",
    a: [
      "Oxigênio",
      "Hidrogênio",
      "Gás Carbônico (CO₂)",
      "Hélio"
    ],
    correta: 2
  },

  {
    q: "Qual é o rio mais volumoso do mundo?",
    a: [
      "Rio Nilo",
      "Rio Amazonas",
      "Rio Yangtzé",
      "Rio Mississippi"
    ],
    correta: 1
  },

  {
    q: "Quem escreveu o livro 'O Pequeno Príncipe'?",
    a: [
      "Antoine de Saint-Exupéry",
      "J. K. Rowling",
      "George Orwell",
      "Ernest Hemingway"
    ],
    correta: 0
  }
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




