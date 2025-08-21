let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");

let nome1 = document.getElementById("nome1");
let nome2 = document.getElementById("nome2");

let btnSalvar1 = document.getElementById("btnSalvar1");
let btnSalvar2 = document.getElementById("btnSalvar2");

let dado1 = document.getElementById("dado");
let dado2 = document.getElementById("dado2");

let pontos1 = 0;
let pontos2 = 0;

let nomePlayer1Definido = false;
let nomePlayer2Definido = false;

// Função para definir o nome do jogador e atualizar a interface
function definirNomeJogador(player, nome, numeroPlayer) {
    if (nome.value.trim() === "") {
        alert(`Por favor, insira o nome do Player ${numeroPlayer}.`);
        return false;
    }
    player.querySelector("h2").innerText = nome.value;
    return true;
}

btnSalvar1.addEventListener("click", () => {
    if (definirNomeJogador(player1, nome1, 1)) {
        nomePlayer1Definido = true;
        alert(`Nome do Player 1 definido: ${nome1.value}`);
    }
});

btnSalvar2.addEventListener("click", () => {
    if (definirNomeJogador(player2, nome2, 2)) {
        nomePlayer2Definido = true;
        alert(`Nome do Player 2 definido: ${nome2.value}`);
    }
});

dado1.addEventListener("click", () => {
    if (!nomePlayer1Definido) {
        alert("Por favor, insira o nome do Player 1 antes de jogar.");
        return;
    }
    let dadoRandom = Math.floor(Math.random() * 20) + 1;
    pontos1 += dadoRandom;
    document.getElementById("pontos1").innerText = pontos1;
    verificaraResultado();
});

dado2.addEventListener("click", () => {
    if (!nomePlayer2Definido) {
        alert("Por favor, insira o nome do Player 2 antes de jogar.");
        return;
    }
    let dadoRandom2 = Math.floor(Math.random() * 20) + 1;
    pontos2 += dadoRandom2;
    document.getElementById("pontos2").innerText = pontos2;
    verificaraResultado();
});

function resetarJogo() {
    pontos1 = 0;
    pontos2 = 0;
    document.getElementById("pontos1").innerText = pontos1;
    document.getElementById("pontos2").innerText = pontos2;
    player1.classList.remove("vencedor", "perdedor");
    player2.classList.remove("vencedor", "perdedor");
    // Não reseta os nomes!
}
function mostrarRanking() {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || {};
    let rankingDiv = document.getElementById("ranking");
    let html = "<h3>Ranking</h3><ol>";

    // Ordena os jogadores pelo número de vitórias (decrescente)
    let rankingArray = Object.entries(ranking).sort((a, b) => b[1] - a[1]);

    // Mostra só o primeiro e o segundo colocado (se existirem)
    if (rankingArray[0]) {
        html += `<li><strong>🥇 ${rankingArray[0][0]}: ${rankingArray[0][1]} vitória(s)</strong></li>`;
    }
    if (rankingArray[1]) {
        html += `<li>🥈 ${rankingArray[1][0]}: ${rankingArray[1][1]} vitória(s)</li>`;
    }
    html += "</ol>";
    rankingDiv.innerHTML = html;
}

function atualizarRanking(nome) {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || {};
    if (ranking[nome]) {
        ranking[nome]++;
    } else {
        ranking[nome] = 1;
    }
    localStorage.setItem("ranking", JSON.stringify(ranking));
    mostrarRanking();
}
function verificaraResultado() {
    if (pontos1 === 20) {
        player1.classList.remove("perdedor", "vencedor");
        player2.classList.remove("perdedor", "vencedor");
        player1.classList.add("vencedor");
        player2.classList.add("perdedor");
        atualizarRanking(nome1.value);
        alert(`${nome1.value} Venceu!`);
        setTimeout(resetarJogo, 1000);
    } 
    else if (pontos2 === 20) {
        player1.classList.remove("perdedor", "vencedor");
        player2.classList.remove("perdedor", "vencedor");
        player2.classList.add("vencedor");
        player1.classList.add("perdedor");
        atualizarRanking(nome2.value); 
        alert(`${nome2.value} Venceu!`);
        setTimeout(resetarJogo, 1000);
    } 
    else if (pontos1 > 20) {
        player1.classList.remove("perdedor", "vencedor");
        player2.classList.remove("perdedor", "vencedor");
        player2.classList.add("vencedor");
        player1.classList.add("perdedor");
        atualizarRanking(nome2.value);
        alert(`${nome1.value} Perdeu, valor maior que 20!`);
        setTimeout(resetarJogo, 1000);
    } 
    else if (pontos2 > 20) {
        player1.classList.remove("perdedor", "vencedor");
        player2.classList.remove("perdedor", "vencedor");
        player1.classList.add("vencedor");
        player2.classList.add("perdedor");
        atualizarRanking(nome1.value);
        alert(`${nome2.value} Perdeu, valor maior que 20!`);
        setTimeout(resetarJogo, 1000);
    }
}
mostrarRanking();
resetarJogo();