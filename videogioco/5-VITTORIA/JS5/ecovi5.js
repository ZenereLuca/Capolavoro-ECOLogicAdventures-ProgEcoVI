// Funzione per generare coriandoli casuali
const bottoneHome = document.getElementById('home');
const bottoneProssimo = document.getElementById('prossimoLivello');
const bottoneClassifica = document.getElementById('classifica');
function generatecoriandoli() {
    const colori = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']; // Array di colori casuali
    const contenitoreCoriandoli = document.querySelector('.contenitoreCoriandoli');

    for (let i = 0; i < 100; i++) {
        const coriandoli = document.createElement('div');
        coriandoli.classList.add('coriandoli');
        coriandoli.style.backgroundColor = colori[Math.floor(Math.random() * colori.length)]; // Colore casuale
        coriandoli.style.left = Math.random() * window.innerWidth + 'px'; // Posizione casuale sull'asse orizzontale
        coriandoli.style.animationDuration = Math.random() * 3 + 2 + 's'; // Durata casuale dell'animazione
        contenitoreCoriandoli.appendChild(coriandoli);
    }
}
generatecoriandoli(); // Chiamata funzione per generare i coriandoli quando la pagina viene caricata

//Se i pulsanti vengono premuti, si viene rindirizzati ad una pagina
bottoneHome.addEventListener('click', function () { 
    window.location.href = "../1-INDEX/index.html"; 
});

bottoneClassifica.addEventListener('click', function () {
    window.location.href = "../4-CLASSIFICA/classifica.html"; 
});

bottoneProssimo.addEventListener('click', function () {
    window.location.href = "../3-VIDEOGIOCO/VideoGioco.html";
});