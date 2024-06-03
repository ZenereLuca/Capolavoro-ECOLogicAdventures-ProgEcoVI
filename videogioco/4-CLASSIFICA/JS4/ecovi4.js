// Recupera l'array dei giocatori dal localStorage
let players = JSON.parse(localStorage.getItem("players")) || [];

// Ordina l'array dei giocatori in base al punteggio, in ordine decrescente
players.sort((a, b) => b.score - a.score);

// Visualizza l'array dei giocatori ordinato nella classifica
let classificaDiv = document.getElementById("classifica");
players.forEach((player, index) => {
    classificaDiv.innerHTML += `<p>Posizione ${index + 1}: ${player.username} - Punteggio: ${player.score}</p>`;
});