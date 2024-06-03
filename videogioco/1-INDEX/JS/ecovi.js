document.addEventListener("DOMContentLoaded", function () {
    
    var audio = new Audio("./EFX/backgroundmusic.m4a"); // Recupera l'elemento audio

    
    var suonoRiprodotto = true; // Imposta lo stato del suono su true

    // Funzione per attivare/disattivare il suono e aggiornare l'immagine del suono
    function attivaDisattivaSuono() {
        if (suonoRiprodotto) { // Se il suono è in riproduzione
            audio.pause(); // Mette in pausa il suono
            suonoRiprodotto = false; // Imposta lo stato del suono su disattivato
            document.getElementById("I/OSuono").innerHTML = '<img src="./IMAGES/volumeoff.png" alt="suono">'; // Aggiorna l'immagine del pulsante
        } else {
            audio.play(); // Riproduce il suono
            suonoRiprodotto = true; // Imposta lo stato del suono su attivato
            document.getElementById("I/OSuono").innerHTML = '<img src="./IMAGES/volume.png" alt="suono">'; // Aggiorna l'immagine del pulsante
        }
    }

    // Viene aggiunto l'evento click al pulsante I/OSuono
    document.getElementById("I/OSuono").addEventListener("click", attivaDisattivaSuono);
});


document.getElementById("tutorial").addEventListener("click", function () { // Viene aggiunto l'evento click al pulsante tutorial
    window.location.href = "../2-TUTORIAL/Tutorial.html";
});

document.getElementById("classifica").addEventListener("click", function () { // Viene aggiunto l'evento click al pulsante classifica
    window.location.href = "../4-CLASSIFICA/Classifica.html";
});


document.getElementById("facile").addEventListener("click", function () { // Viene aggiunto l'evento click al pulsante "facile"
    
    var username = document.getElementById("usernameInput").value; // Viene preso lo username del giocatore
    if(username=="") // Se lo username è vuoto 
    {
        alert("INSERIRE NICKNAME!"); // Tramite alert ribadisce di inserirlo
    }
    else{
   
    localStorage.setItem("username", username);  // Memorizza il nome utente in localStorage

    window.localStorage.setItem('grandezza', 5); // Imposta il numero di righe e colonne a 5 nel localStorage
    window.location.href = "../3-VIDEOGIOCO/VideoGioco.html"; // Rimanda alla pagina del videogioco
    }
});

document.getElementById("medio").addEventListener("click", function () {
    var username = document.getElementById("usernameInput").value;
    if(username=="")
    {
        alert("INSERIRE NICKNAME!");
    }
    else{

    var username = document.getElementById("usernameInput").value;
    localStorage.setItem("username", username);

    window.localStorage.setItem('grandezza', 6);
    window.location.href = "../3-VIDEOGIOCO/VideoGioco.html";
}
});

document.getElementById("difficile").addEventListener("click", function () {
    var username = document.getElementById("usernameInput").value;
    if(username=="")
    {
        alert("INSERIRE NICKNAME!");
    }
    else{
    localStorage.setItem("username", username);

    window.localStorage.setItem('grandezza', 7);
    window.location.href = "../3-VIDEOGIOCO/VideoGioco.html";
    }
});