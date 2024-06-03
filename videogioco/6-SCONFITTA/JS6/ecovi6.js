// Funzione per generare coriandoli casuali
const bottoneHome = document.getElementById('home');
const bottoneRiprova = document.getElementById('riprova');
const bottoneClassifica = document.getElementById('classifica');

bottoneHome.addEventListener('click', function () {
    window.location.href = "../1-INDEX/index.html"; 
});

bottoneClassifica.addEventListener('click', function () {
    window.location.href = "../4-CLASSIFICA/classifica.html"; 
});

// Se viene premuto il pulsante, si viene rindirizzati al videogioco con una grandezza diversa in base al livello in cui ci si trova
bottoneRiprova.addEventListener('click', function () {
    if (localStorage.getItem('grandezza') == 5)
    {
    window.localStorage.setItem('grandezza', 5);
    window.location.href = "../3-VIDEOGIOCO/VideoGioco.html"; 
    }
    else if (localStorage.getItem('grandezza') == 6)
    {
        window.localStorage.setItem('grandezza', 6);
        window.location.href = "../3-VIDEOGIOCO/VideoGioco.html"; 
    }
    else{
        window.localStorage.setItem('grandezza', 7);
        window.location.href = "../3-VIDEOGIOCO/VideoGioco.html"; 
    }
});