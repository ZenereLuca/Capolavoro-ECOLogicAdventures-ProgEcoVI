const numRighe = window.localStorage.getItem('grandezza'); // Righe della griglia prese dal localStorage
const numColonne = window.localStorage.getItem('grandezza'); // Colonne della griglia prese dal localStorage
const tempo = 650; // Tempo in ms di attesa per le varie funzione
const tipiSpazzatura = [1, 2, 3, 5]; // Array contenente i tipi di rifiuti disponibili
const tutorial = document.getElementById('tutorial'); // Valore del bottone del tutorial
const suono = document.getElementById('suono'); // Valore del bottone del suono
var audio = new Audio("./EFX3/backgroundmusic.m4a"); // Crea elemento audio per musica di sottofondo
let mosseInutili = 0; // Contatore per le mosse inutili
let griglia = [];

// Funzione per creare una pausa nell'esecuzione del codice
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Funzione per controllare se ci sono tre o più rifiuti consecutivi in una riga o colonna
function controllaElemConseg() {
    for (let i = 0; i < numRighe; i++) {
        for (let j = 0; j < numColonne; j++) {
            // Controlla i rifiuti consecutivi orizzontalmente
            if (j < numColonne - 2 && griglia[i][j] === griglia[i][j + 1] && griglia[i][j] === griglia[i][j + 2]) {
                return true; // Tre rifiuti consecutivi trovati
            }
            // Controlla i rifiuti consecutivi verticalmente
            if (i < numRighe - 2 && griglia[i][j] === griglia[i + 1][j] && griglia[i][j] === griglia[i + 2][j]) {
                return true; // Tre rifiuti consecutivi trovati
            }
        }
    }
    return false; // Altrimenti falso
}

// Funzione per controllare se un movimento è valido 
function isMossaValida(riga1, col1, riga2, col2) {
    // Verifica se le celle sono adiacenti orizzontalmente o verticalmente
    if ((Math.abs(riga1 - riga2) === 1 && col1 === col2) || (riga1 === riga2 && Math.abs(col1 - col2) === 1)) {
        return true; // Il movimento è valido
    }
    return false; // Il movimento non è valido
}

// Inizializza la griglia di gioco
function inizializzagriglia() {
    for (let i = 0; i < numRighe; i++) {
        griglia[i] = []; // Crea un array vuoto per ogni riga
        for (let j = 0; j < numColonne; j++) {
            // Riempie ogni cella della griglia con un tipo di rifiuto casuale
            griglia[i][j] = tipiSpazzatura[Math.floor(Math.random() * tipiSpazzatura.length)];


        }
    }
}

// Genera la griglia di gioco nell'HTML
function rendergriglia() {
    const contenitoreGioco = document.getElementById('contenitoreGioco'); // Ottiene il riferimento al contenitore del gioco nell'HTML
    contenitoreGioco.innerHTML = ''; // Cancella il contenuto del contenitore del gioco
    for (let i = 0; i < numRighe; i++) {
        for (let j = 0; j < numColonne; j++) {
            const pulsante = document.createElement('pulsante'); // Crea un elemento bottone per rappresentare una cella del gioco
            pulsante.classList.add('cellaGioco'); // Aggiunge una classe all'elemento bottone
            const tipoSpazzatura = griglia[i][j]; 
            const img = document.createElement('img'); // Crea un elemento immagine per rappresentare il rifiuto
            img.src = `./IMAGES3/immagine${tipoSpazzatura}.png`; // Imposta il percorso dell'immagine basato sul numero
            img.alt = `rifiuto ${tipoSpazzatura}`;
            pulsante.dataset.riga = i; // Imposta l'attributo 'data-riga' dell'elemento bottone con il numero di riga della cella
            pulsante.dataset.col = j; // Imposta l'attributo 'data-col' dell'elemento bottone con il numero di colonna della cella
            pulsante.appendChild(img); // Inserisce l'elemento immagine come figlio del bottone
            contenitoreGioco.style.gridTemplateColumns = 'repeat(' + numColonne + ', 78px)'; // Imposta nel css la disposizione delle colonne 
            contenitoreGioco.style.gridTemplateRows = 'repeat(' + numRighe + ', 78px)'; // Imposta nel css la disposizione delle righe

            // Aggiungi un gestore di eventi click al bottone
            pulsante.addEventListener('click', () => {
                cellaSpeciale(i, j); // Controlla se è una cella speciale
            });
            contenitoreGioco.appendChild(pulsante); // Aggiunge l'elemento bottone al contenitore del gioco nell'HTML
        }
    }
}

let cellaSelezionata = null; // Variabile per memorizzare la cella selezionata per lo scambio

// Funzione per gestire il click sulla cella speciale
async function cellaSpeciale(riga, col) {
    if (griglia[riga][col] === 6) { // Controlla se è una cella "potere del riciclo"
        mosseInutili = 0; // Se lo è, azzerqa il contatore delle mosse inutili
        document.getElementById("counter-value").innerHTML = mosseInutili; // Aggiorna il contatore nell'HTML
        griglia[riga][col] = 7; // La fa diventare una cella 7, per poi poterla eliminare
        const celleDaRimuovere = [[riga, col]]; // Inizializza l'array con la cella speciale
        // Controlla se la cella sopra esiste e la aggiunge all'array delle celle da rimuovere
        if (riga - 1 >= 0 && griglia[riga - 1][col] !== 10) {
            celleDaRimuovere.push([riga - 1, col]);
        }
        // Controlla se la cella sotto esiste e aggiunge all'array delle celle da rimuovere
        if (riga + 1 < numRighe && griglia[riga + 1][col] !== 10) {
            celleDaRimuovere.push([riga + 1, col]);
        }
        // Controlla se la cella a sinistra esiste e aggiunge all'array delle celle da rimuovere
        if (col - 1 >= 0 && griglia[riga][col - 1] !== 10) {
            celleDaRimuovere.push([riga, col - 1]);
        }
        // Controlla se la cella a destra esiste e aggiunge all'array delle celle da rimuovere
        if (col + 1 < numColonne && griglia[riga][col + 1] !== 10) {
            celleDaRimuovere.push([riga, col + 1]);
        }
        // Rimuovi i rifiuti nelle celle indicate
        rimuovirifiuti(celleDaRimuovere);
        await sleep(tempo); 
        rendergriglia(); 
        spostaSpazzatura();
    }
    else if (griglia[riga][col] === 9) { // Controlla se è una cella "amore della natura"
        mosseInutili = 0; 
        document.getElementById("counter-value").innerHTML = mosseInutili;
        griglia[riga][col] = 7; 
        const celleDaRimuovere = []; // Array per memorizzare le celle da rimuovere
        for (let i = riga - 1; i <= riga + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < numRighe && j >= 0 && j < numColonne) { 
                    celleDaRimuovere.push([i, j]);// Rimuovi le 8 celle adiacenti
                }
            }
        }
        rimuovirifiuti(celleDaRimuovere); // Rimuovi i rifiuti nelle celle indicate
        await sleep(tempo);
        rendergriglia(); // Renderizza la griglia dopo la rimozione dei rifiuti
        spostaSpazzatura(); // Sposta i rifiuti verso il basso
    } else {
        selectCell(riga, col); // Se non è una cella speciale chiama la funzione selectCell()
    }
}

// Funzione per selezionare una cella
function selectCell(riga, col) {
    if (griglia[riga][col] === 10) { // Controlla se la cella è un rifiuto tossico
        shakeSchermo(); // Esegue un'animazione di shake
        return; // Esce dalla funzione senza fare alcuna azione
    }

    if (!cellaSelezionata) { // Se viene selezionata una cella per la prima volta
        cellaSelezionata = { riga, col }; // Memorizza la cella selezionata
    } else {
        
        if (isMossaValida(cellaSelezionata.riga, cellaSelezionata.col, riga, col)) {// Verifica se lo spostamento è valido
            scambiaCelle(cellaSelezionata.riga, cellaSelezionata.col, riga, col); // Effettua lo scambio di celle
        }
        cellaSelezionata = null; // Reimposta la variabile per la selezione a null
    }
}


// Funzione per scambiare due celle
function scambiaCelle(riga1, col1, riga2, col2) {

    const temp = griglia[riga1][col1]; // Memorizza il contenuto di una cella in una variabile temporanea
    griglia[riga1][col1] = griglia[riga2][col2]; // Effettua lo scambio del contenuto tra le celle
    griglia[riga2][col2] = temp; // Ripristina il contenuto temporaneo nella seconda cella
    rendergriglia(); // Renderizza nuovamente la griglia dopo lo scambio
    controllaMatches(); // Controlla se ci sono corrispondenze dopo lo scambio
}

// Funzione per controllare se ci sono corrispondenze di rifiuti
function controllaMatches(aggRiff) {
    let matches = false; // Inizializza la variabile dei matches a falso
    let quartina = false; // Inizializza la variabile di individuazione quartina a false
    let posizioneQuartina = null; // Inizializza la variabile della posizione quartina a null
    let cinquina = false; // Inizializza la variabile di individuazione cinquina a false
    let posizioneCinquina = null; // Inizializza la variabile della posizione cinquina a null
    let tTrovata = false; // Inizializza la variabile di individuazione cinquina a T a false
    let posizioneT = null; // Inizializza la variabile della posizione cinquina a T a null

    // Controlla cinquine
    for (let i = 0; i < numRighe; i++) {
        for (let j = 0; j < numColonne - 4; j++) {
            const rifiuto = griglia[i][j];
            if (rifiuto !== 0 && griglia[i][j] !== 10 && rifiuto === griglia[i][j + 1] && rifiuto === griglia[i][j + 2] && rifiuto === griglia[i][j + 3] && rifiuto === griglia[i][j + 4]) {
                rimuovirifiuti([[i, j], [i, j + 1], [i, j + 2], [i, j + 3], [i, j + 4]]); // Rimuove le celle che compongono la combinazione
                cinquina = true; // Imposta la variabile cinquina a true
                posizioneCinquina = [i, j + 2]; // Imposta le coordinate della cinquina al centro della cinquina
                matches = true; // Indica che è stata individuata una combinazione
            }
        }
    }

    // Controlla quatris
    for (let i = 0; i < numRighe; i++) {
        for (let j = 0; j < numColonne - 3; j++) {
            const rifiuto = griglia[i][j];
            if (rifiuto !== 0 && griglia[i][j] !== 10 && rifiuto === griglia[i][j + 1] && rifiuto === griglia[i][j + 2] && rifiuto === griglia[i][j + 3]) {
                if ((j === 0 || griglia[i][j - 1] !== rifiuto) && (j === numColonne - 4 || griglia[i][j + 4] !== rifiuto)) {
                    rimuovirifiuti([[i, j], [i, j + 1], [i, j + 2], [i, j + 3]]);
                    quartina = true;
                    posizioneQuartina = [i, j + 3];
                    matches = true;
                }
            }
        }
    }
    // Controlla tris
    for (let i = 0; i < numRighe; i++) {
        for (let j = 0; j < numColonne - 2; j++) {
            const rifiuto = griglia[i][j];
            if (rifiuto !== 0 && griglia[i][j] !== 10 && rifiuto === griglia[i][j + 1] && rifiuto === griglia[i][j + 2]) {
                if ((j === 0 || griglia[i][j - 1] !== rifiuto) && (j === numColonne - 3 || griglia[i][j + 3] !== rifiuto)) {
                    rimuovirifiuti([[i, j], [i, j + 1], [i, j + 2]]);
                    matches = true;
                }
            }
        }
    }
    // Controlla cinquine verticali
    for (let j = 0; j < numColonne; j++) {
        for (let i = 0; i < numRighe - 4; i++) {
            const rifiuto = griglia[i][j];
            if (rifiuto !== 0 && griglia[i][j] !== 10 && rifiuto === griglia[i + 1][j] && rifiuto === griglia[i + 2][j] && rifiuto === griglia[i + 3][j] && rifiuto === griglia[i + 4][j]) {
                if ((i === 0 || griglia[i - 1][j] !== rifiuto) && (i === numRighe - 5 || griglia[i + 5][j] !== rifiuto)) {
                    rimuovirifiuti([[i, j], [i + 1, j], [i + 2, j], [i + 3, j], [i + 4, j]]);
                    cinquina = true;
                    posizioneCinquina = [i + 2, j]; 
                    matches = true;
                }
            }
        }
    }

    // Controlla quatris verticali
    for (let j = 0; j < numColonne; j++) {
        for (let i = 0; i < numRighe - 3; i++) {
            const rifiuto = griglia[i][j];
            if (rifiuto !== 0 && griglia[i][j] !== 10 && rifiuto === griglia[i + 1][j] && rifiuto === griglia[i + 2][j] && rifiuto === griglia[i + 3][j]) {
                if ((i === 0 || griglia[i - 1][j] !== rifiuto) && (i === numRighe - 4 || griglia[i + 4][j] !== rifiuto)) {
                    rimuovirifiuti([[i, j], [i + 1, j], [i + 2, j], [i + 3, j]]);
                    matches = true;
                    quartina = true; 
                    posizioneQuartina = [i + 3, j];
                }
            }
        }
    }

    // Controlla tris verticali
    for (let j = 0; j < numColonne; j++) {
        for (let i = 0; i < numRighe - 2; i++) {
            const rifiuto = griglia[i][j];
            if (rifiuto !== 0 && griglia[i][j] !== 10 && rifiuto === griglia[i + 1][j] && rifiuto === griglia[i + 2][j]) {
                if ((i === 0 || griglia[i - 1][j] !== rifiuto) && (i === numRighe - 3 || griglia[i + 3][j] !== rifiuto)) {
                    rimuovirifiuti([[i, j], [i + 1, j], [i + 2, j]]);
                    matches = true;
                }
            }
        }
    }
    // Controlla combinazioni a T
    for (let i = 0; i < numRighe - 2; i++) {
        for (let j = 0; j < numColonne - 2; j++) {
            const rifiuto = griglia[i][j];
            if((griglia[i][j] === griglia[i][j + 1] && griglia[i][j] === griglia[i][j + 2] && griglia[i][j] === griglia[i + 1][j + 1] && griglia[i][j] === griglia[i + 2][j + 1]) || // T orizzontale
                (griglia[i][j] === griglia[i + 1][j] && griglia[i][j] === griglia[i + 1][j + 1] && griglia[i][j] === griglia[i + 1][j + 2] && griglia[i][j] === griglia[i + 2][j + 1]) // T verticale
              ) {
                tTrovata = true; // Indica che è stata trovata una combinazione a T
                posizioneT = [i + 1, j + 1]; // Memorizza la posizione della cella centrale della combinazione a T
            }
        }
    }

    // Se è stata trovata una combinazione a T, imposta una delle caselle come "amore della natura"
    if (tTrovata) {
        const [riga, col] = posizioneT; // Memorizza la posizione della T
        griglia[riga][col] = 9; // Imposta la cella a 9
        cinquina = true; // Imposta cinquina a true 
        posizioneCinquina = [riga, col]; // Posizione centrale della cinquina
        matches = true;
    }

    if (matches) { // Se viene individuata una combinazione
        mosseInutili = 0; // Il contatore delle mosse inutili viene azzerato
        document.getElementById("counter-value").innerHTML = mosseInutili; // Il contatore viene aggiornato nell'HTML

        if (quartina) { // Se è stata individuata una quartina
            const [riga, col] = posizioneQuartina; // Viene memorizzata la posizione della quartina
            griglia[riga][col] = 6; // Il valore della cella viene impostato a 6 per farla diventare "potere del riciclo"
            rendergriglia();
            spostaSpazzatura(); // Sposta i rifiuti verso il basso
        }
        else if (cinquina) { // Se è stata individuata una cinquina
            const [riga, col] = posizioneCinquina;
            griglia[riga][col] = 9;
            rendergriglia();
            spostaSpazzatura(); // Sposta i rifiuti verso il basso
        }
        else {
            rendergriglia(); // Renderizza nuovamente la griglia
            spostaSpazzatura(); // Sposta i rifiuti verso il basso
        }
    }
    if (!matches) { // Se non sono state trovate delle combinazioni
        if (aggRiff) { // Se la funzione controllaMatches è stata chiamata da aggiungiRifiuti
            return; // Non faccio niente
        }
        else {
            mosseInutili++; // Incremento il contatore delle mosse inutili
            document.getElementById("counter-value").innerHTML = mosseInutili; // Aggiorno il suo vaolore nell'HTML
        }
    }
    if (mosseInutili === 3) { // Se il totale delle mosse inutili è 3
        window.location.href = "../6-SCONFITTA/sconfitta.html"; // Rimanda alla pagina di sconfitta

    }

}

// Funzione per spostare i rifiuti verso il basso
async function spostaSpazzatura() {
    await sleep(tempo);
    for (let col = 0; col < numColonne; col++) {// Scorre tutte le colonne nella griglia
        for (let riga = numRighe - 1; riga >= 0; riga--) {// Scorre tutte le righe nella griglia all'interno di ciascuna colonna
            if (griglia[riga][col] === 0) {// Se la griglia è vuota
                for (let rigaSopra = riga - 1; rigaSopra >= 0; rigaSopra--) {// Cerca un rifiuto sopra di essa nella stessa colonna
                    if (griglia[rigaSopra][col] !== 0) {// Se lo trova
                        griglia[riga][col] = griglia[rigaSopra][col]; // Sposta il rifiuto sopra in basso
                        griglia[rigaSopra][col] = 0;// Imposta la cella precedente del rifiuto sopra a vuota
                        break;// Esce dal ciclo 
                    }
                }
            }
        }
    }
    rendergriglia(); // Renderizza  la griglia
    aggiungirifiuti(); // Aggiungi nuovi rifiuti 
}

// Funzione per aggiungere nuove rifiuti nella griglia
async function aggiungirifiuti() {
    await sleep(tempo);
    for (let col = 0; col < numColonne; col++) {
        for (let riga = 0; riga < numRighe; riga++) {
            if (griglia[riga][col] === 0) { // Se la cella è vuota
                const randomNumber = Math.floor(Math.random() * 100); // Genera casualmente un numero tra 0 e 99
                if (randomNumber < 3) { // Se il numero è minore di 3 (probabilità 3%)
                    griglia[riga][col] = 10; // Genera un rifiuto tossico
                } else {
                    griglia[riga][col] = tipiSpazzatura[Math.floor(Math.random() * tipiSpazzatura.length)]; // Genera un rifiuto random
                }
            }
        }
    }
    rendergriglia(); // Renderizza  la griglia dopo l'aggiunta dei nuovi rifiuti
    controllaMatches(true); // Controlla se ci sono nuovi tris dopo l'aggiunta dei nuovi rifiuti, trasmettendo alla funzione il valore true (vedere commenti funzione controllaMatches)
    
}

// Definisce oggetto per i contatori dei tipi di rifiuti
let contatori = {};
// Inizializza i contatori per ogni tipo di rifiuto a zero
tipiSpazzatura.forEach(tipo => {
    contatori[tipo] = 0;
});

// Funzione per rimuovere i rifiuti dalla griglia
async function rimuovirifiuti(celle) {
    await sleep(tempo);

    // Per ogni coppia di coordinate [riga, col] fornite
    celle.forEach(([riga, col]) => {
        const tipoSpazzatura = griglia[riga][col];
        if (tipoSpazzatura !== 6 && tipoSpazzatura !== 9) { // Verifica se il rifiuto non è una cella speciale
            griglia[riga][col] = 0; // Imposta il valore della cella a 0
            contatori[tipoSpazzatura]++; // Incrementa il contatore per il tipo di rifiuto rimosso
            const pulsante = document.querySelector(`pulsante[data-riga='${riga}'][data-col='${col}']`); // Trova il bottone corrispondente nella griglia HTML utilizzando le coordinate [riga, col]
            const img = document.createElement('img'); // Crea un nuovo elemento immagine
            img.src = './IMAGES3/immagine0.png'; // Trova l'immagine0 nella cartella immagini che rappresenta un rifiuto rimosso
            img.alt = 'rifiuto rimossa';
            pulsante.innerHTML = ''; // Rimuove eventuali elementi figli presenti nel bottone
            pulsante.appendChild(img); // Aggiunge l'immagine "immagine0.png" come figlio del bottone per visualizzare il rifiuto rimosso
        }
    });
    aggiornaContHTML(); // Aggiorna i contatori visualizzati nell'HTML
}

// Funzione per aggiornare i contatori dei rifiuti nell'HTML e gestire la fine del gioco
function aggiornaContHTML() {
    let punteggioTotale = 0; // Variabile per memorizzare il punteggio totale del giocatore
    let tutti50 = true; // Variabile per verificare se il giocatore ha raccolto almeno 50 rifiuti per ogni tipo

    // Per ogni tipo di rifiuto, aggiorna i contatori e le skill bar nell'HTML
    tipiSpazzatura.forEach(tipo => {
        const elementoContatore = document.getElementById(`counter-${tipo}`); // Elemento HTML per il contatore del tipo di rifiuto
        const elementoBarra = document.getElementById(`skill-bar-${tipo}`); // Elemento HTML per la skill bar

        // Se gli elementi sono presenti nell'HTML
        if (elementoContatore && elementoBarra) {
            elementoContatore.textContent = contatori[tipo]; // Aggiorna il contatore con il numero di rifiuti raccolti di quel tipo
            const percentuale = (contatori[tipo] / 50) * 100; // Calcola la percentuale di completamento del tipo di rifiuto 
            if(percentuale<=105)
            {
            elementoBarra.style.width = percentuale + '%'; // Aggiorna la larghezza della barra di progresso
            }
            punteggioTotale += tipo * contatori[tipo]; // Calcola il punteggio totale aggiungendo il punteggio di ogni tipo di rifiuto
            if (contatori[tipo] >= 50) {// Verifica se sono stati eliminati almeno 50 rifiuti per ogni tipo
                tutti50 = tutti50 && true;
            } else {
                tutti50 = false;
            }
        }
    });

    
    if (tutti50) {// Se sono stati eliminati almeno 50 rifiuti per ogni tipo 
        fineGioco(punteggioTotale); // Chiama la funzione fineGioco con il punteggio totale
    }

    // Aggiorna il punteggio totale visualizzato nell'HTML
    const elementoPunteggioTotale = document.getElementById('total-score');
    if (elementoPunteggioTotale) {
        elementoPunteggioTotale.textContent = punteggioTotale;
    }
}
function fineGioco(score) {
    let username = localStorage.getItem("username"); // Ottiene l'elemento "username" presente nel localStorage
    let players = JSON.parse(localStorage.getItem("players")) || []; // Recupera l'array dei giocatori dal localStorage
    let trovato = false; // Inizia la variabile utente trovato a false

    // Controlla se il giocatore esiste già
    for (let i = 0; i < players.length; i++) {
        if (players[i].username === username) { // Se l'username del nuovo giocatore è gia presente nel localStorage
            if(players[i].score<score) // Se il nuovo punteggio è maggiore di quello già presente
            {
            players[i].score = score; // Aggiorna il punteggio del giocatore 
            trovato = true; // Il giocatore è stato trovato
            break;}
            else // Se il punteggio è inferiore rispetto a quello già presente
            trovato = true; // Il giocatore è stato trovato
            break;
        }
    }
    // Se il giocatore non è stato trovato
    if (!trovato) {
        players.push({ username: username, score: score }); // Lo aggiunge come nuovo giocatore
    }
    localStorage.setItem("players", JSON.stringify(players)); // Salva l'array aggiornato nel localStorage

    if(localStorage.getItem("grandezza")==5) // Se il giocatore ha giocato al livello facile
    {
        localStorage.setItem("grandezza", 6); // Imposta il livello successivo a medio
        window.location.href = "../5-VITTORIA/vittoria.html"; // Reindirizza alla pagina di vittoria
    }
    else if(localStorage.getItem("grandezza")==6) // Se il giocatore ha giocato al livello medio
    {
        localStorage.setItem("grandezza", 7); // Imposta il livello successivo a difficile
        window.location.href = "../5-VITTORIA/vittoria.html"; // Reindirizza alla pagina di vittoria
    }
    else // Se il giocatore ha giocato al livello difficile
    {  
        localStorage.setItem("grandezza", 7); // Lascia il livello a difficile
        window.location.href = "../5-VITTORIA/vittoria.html"; // Reindirizza alla pagina di vittoria
    }
}

// Funzione di animazione dello schermo quando si tenta di scambiare un rifiuto tossico
function shakeSchermo() { 
    document.body.classList.add('shake'); // Aggiungi la classe shake
    
    setTimeout(() => {
        document.body.classList.remove('shake'); // Rimuovi la classe 'shake' dopo che l'animazione è terminata
    }, 300);
}

tutorial.addEventListener('click', function () { // Se viene premuto il pulsante "tutorial"
    window.location.href = "../2-TUTORIAL/Tutorial.html"; // Renderizzazione al tutorial
});
let suonoRiprodotto = false;
suono.addEventListener('click', function () { // Se viene premuto il pulsante "suono"
    if (suonoRiprodotto) { // Se il suono è attualmente riprodotto
        audio.pause(); // Viene messo in pausa il suono
        suonoRiprodotto = false; // Imposta lo stato del suono su disattivato
        
        document.getElementById("suono").innerHTML = '<img src="./IMAGES3/volumeoff.png" alt="suono">'; // Aggiorna l'immagine del pulsante
    } else {
        audio.play(); // Riproduce il suono
        suonoRiprodotto = true; // Imposta lo stato del suono su attivato
        // Aggiorna l'immagine del pulsante
        document.getElementById("suono").innerHTML = '<img src="./IMAGES3/volume.png" alt="suono">';
    }
});


// Inizializza il gioco
let grigliaNonValida = true; // Da' per scontato che la griglia non sia valida
while (grigliaNonValida) {
    inizializzagriglia(); // Inizializza la griglia di gioco
    grigliaNonValida = controllaElemConseg(); // Controlla se ci sono tre o più rifiuti consecutivi
}
rendergriglia(); // Renderizza la griglia di gioco nell'HTML
