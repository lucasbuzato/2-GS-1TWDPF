/* -------------------------------------------------- Criação e Controle dos Cards -------------------------------------------------- */

import { carreiras } from "./arrayCardsGs.js";

const cardsContainer = document.querySelector("#cards-container");
const categoriaBtns = document.querySelectorAll("#carreiras-section a");

let categoriaAtiva = null;

/* -------------------------------------------- Função que cria o card individual -------------------------------------------- */
function criarCard(card) {
  const cardEl = document.createElement("div");
  cardEl.className =
    "flip-card w-full h-[430px] rounded-3xl overflow-hidden cursor-pointer card-box";

  cardEl.innerHTML = `
    <div class="flip-inner relative w-full h-full">

      <div class="flip-front absolute inset-0 bg-cover bg-center flex items-end" style="background-image: url('${card.imagem}')">
  
        <div class="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-sm rounded-b-2xl p-5">

          <span class="bg-Azul-Claro text-xs font-semibold text-white px-3 py-1 rounded-full block w-fit mb-2">
            ${card.area}
          </span>

          <h2 class="font-bold text-lg text-white leading-tight">${card.titulo}</h2>

          <p class="text-sm text-Cinza">${card.area}</p>
          <p class="text-sm text-Cinza">${card.formacao}</p>
        </div>
      </div>

      <div class="flip-back absolute inset-0 bg-Roxo text-white dark:text-white p-6 rounded-3xl overflow-y-auto">

        <h3 class="font-bold text-xl mb-2">${card.titulo}</h3>

        <p class="text-sm mb-2"><strong>Demanda:</strong> ${card.demanda}</p>
        <p class="text-sm mb-2"><strong>Competência:</strong> ${card.competencia}</p>
        <p class="text-sm mb-2"><strong>Formação:</strong> ${card.formacao}</p>
        <p class="text-sm mb-2"><strong>Média Salarial:</strong> R$ ${card.mediaSalarial.toLocaleString("pt-BR")}</p>
        <p class="text-sm mb-2"><strong>Impacto Social:</strong> ${card.impactoSocial}</p>
        <p class="text-sm opacity-80 mb-4">${card.descricao}</p>

        <button class="card-box py-2 px-4 rounded-xl text-sm font-semibold w-fit mx-auto block">
          Ver mais
        </button>
      </div>

    </div>
  `;

  // alterna o flip-front / flip-back
  cardEl.addEventListener("click", () => {
    cardEl.classList.toggle("flipped");
  });

  return cardEl;
}

/* -------------------------------------------- Renderização dos cards -------------------------------------------- */
function renderCards(filtro = null) {
  cardsContainer.innerHTML = "";

  const lista = filtro ? carreiras.filter((c) => c.area === filtro) : carreiras;

  lista.forEach((card) => {
    cardsContainer.appendChild(criarCard(card));
  });
}

/* -------------------------------------------- Controle dos botões de categoria -------------------------------------------- */
categoriaBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const categoria = btn.innerText.trim();

    // Se clicar no botão já ativo → limpa o filtro
    if (categoriaAtiva === categoria) {
      categoriaAtiva = null;
      categoriaBtns.forEach((b) => b.classList.remove("ativo"));
      renderCards();
      return;
    }

    // troca categoria ativa
    categoriaAtiva = categoria;

    categoriaBtns.forEach((b) => b.classList.remove("ativo"));
    btn.classList.add("ativo");

    renderCards(categoria);
  });
});

/* -------------------------------------------- Render inicial dos cards -------------------------------------------- */
renderCards();
