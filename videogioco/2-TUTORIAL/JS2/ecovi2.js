document.addEventListener('DOMContentLoaded', function () {
    // Ottiene i riferimenti agli elementi del DOM
    const startButton = document.getElementById('pulsanteInizio'); 
    const bottoneAvanti = document.getElementById('prossimoTesto');
    const bottoneHome = document.getElementById('home');
    const bottoneSkip = document.getElementById('skip');
    
    // Nasconde i pulsanti all'inizio
    bottoneAvanti.style.display = 'none'; 
    bottoneHome.style.display = 'none';
    bottoneSkip.style.display = 'none';

    // Ottiene il riferimento all'elemento del DOM per il testo
    const testoGenerato = document.getElementById('testoGenerato');

    // Array degli audio
    const audio = [
        document.getElementById('audio1'),
        document.getElementById('audio2'),
        document.getElementById('audio3'),
        document.getElementById('audio4'),
        document.getElementById('audio5'),
        document.getElementById('audio6'),
        document.getElementById('audio7'),
        document.getElementById('audio8')
    ];

    // Array di testi
    const testi = [
        "",
        "Ciao, sono Norindo Nutriarelli, la mascotte di questo videogioco!",
        "Benvenuti al Tutorial di Avventure ECO-Logiche! Seguite attentamente le istruzioni per aiutarmi a raccogliere tutti i rifiuti che LupoFogna ha riversato nel fiume.",
        "Obiettivo del Gioco: L'obbiettivo è eliminare un po' di rifiuti, facendo scambiare le posizioni dei rifiuti adiacenti in modo da creare combinazioni di tre o più rifiuti dello stesso tipo in fila o in colonna.",
        "Come Giocare: Per scambiare due rifiuti adiacenti, basta fare clic su uno dei due rifiuti e poi sul rifiuto che volete scambiare con esso. Ricorda che lo scambio è possibile solo tra rifiuti adiacenti.",
        "Combo di Rifiuti: Quando formate una combinazione di tre o più rifiuti, questi verranno rimossi dalla griglia, e guadagnerete punti. Ma non fermatevi qui! Raccoglietene almeno 50 per ogni tipo.",
        "Cella Speciale: Trovate una cella 'Amore della natura'? Ottimo! È un potenziamento che ottenete quando formate una combinazione di quattro rifiuti.",
        "Punteggio: Il vostro punteggio sarà determinato dalla quantità e dal tipo di rifiuti che rimuovete dalla griglia. Siete pronti a dimostrare le vostre abilità?",
        "Ora che conoscete le basi, siete pronti per iniziare a giocare! Buon divertimento e buona pulizia!"
    ];

    let indiceTesto = 0; // Indice del testo corrente
    let indiceImmagine = 1; // Indice per alternare le immagini di Norindo

    // Funzione per mostrare il testo successivo
    function mostraTestoSucc() {
        if (indiceTesto < testi.length-1) {
            testoGenerato.textContent = ''; // Elimina il testo precedente
            let carattereCorrente = 0;
            bottoneAvanti.disabled = true; // Disabilita il pulsante "Avanti" fino al completamento del testo
            // Mostra il testo carattere per carattere 
            const interval = setInterval(function () {
                testoGenerato.textContent += testi[indiceTesto].charAt(carattereCorrente);
                carattereCorrente++;
                if (carattereCorrente === testi[indiceTesto].length) {
                    clearInterval(interval);
                    bottoneAvanti.disabled = false; // Abilita il pulsante "Avanti" dopo la generazione completa del testo
                }
            }, 50); // Velocità dell'animazione (50 millisecondi per carattere)
            // Riproduci l'audio corrispondente
            if (audio[indiceTesto]) {
                audio[indiceTesto].play();
            }
            indiceTesto++; // Incrementa l'indice del testo
        } else {
            // Se siamo arrivati alla fine del testo, reindirizza al videogioco
            window.localStorage.setItem('grandezza', 5);
            window.location.href = "../3-VIDEOGIOCO/VideoGioco.html";
        }
    }

    // Funzione per alternare le immagini di Norindo
    function norindoParla() {
        const immagine1 = document.getElementById('immagine1');
        const immagine2 = document.getElementById('immagine2');
        if (indiceImmagine === 1) {
            immagine1.style.display = 'none';
            immagine2.style.display = 'block';
            indiceImmagine = 2;
        } else {
            immagine1.style.display = 'block';
            immagine2.style.display = 'none';
            indiceImmagine = 1;
        }
    }

    // Event listener per il pulsante "Inizia"
    startButton.addEventListener('click', function () {
        startButton.style.display = 'none'; // Nascondi il pulsante "Inizia"
        mostraTestoSucc(); // Mostra il primo testo
        bottoneAvanti.style.display = 'block'; // Mostra il pulsante "Avanti"
        bottoneHome.style.display = 'block'; // Mostra il pulsante "Home"
        bottoneSkip.style.display = 'block'; // Mostra il pulsante "Skip"
        norindoParla(); // Inizia ad alternare le immagini di Norindo
        setInterval(norindoParla, 400); // Alterna le immagini ogni 400 millisecondi
    });

    // Event listener per il pulsante "Avanti"
    bottoneAvanti.addEventListener('click', function () {
        mostraTestoSucc(); // Mostra il testo successivo
        bottoneAvanti.disabled = true; // Disabilita il pulsante "Avanti" dopo averlo cliccato
    });

    // Event listener per il pulsante "Home"
    bottoneHome.addEventListener('click', function () {
        window.location.href = "../1-INDEX/index.html"; 
    });
    
    // Event listener per il pulsante "Skip"
    bottoneSkip.addEventListener('click', function () {
        window.localStorage.setItem('grandezza', 5);
        window.location.href = "../3-VIDEOGIOCO/VideoGioco.html"; 
    });
});
