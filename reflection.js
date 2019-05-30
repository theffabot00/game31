

function updateScreen() {
    updatePlayerHand();
    updateDisco();
}

function updateDisco() {
    //im going to play on a really large gamble and pray that the deck never runs otu of cards
    try {
        console.log("trying");
        cardDrop.src = discoPile[0].img;
        cardDrop.style.display = "inline-block";
    } catch(err) {
        console.log("patching");
        cardDrop.style.display = "none";
        cardDrop.src = "";
    }
}

function updatePlayerHand() {
    while (playerZ.childNodes.length) {
        playerZ.removeChild(playerZ.childNodes[0]);
    }
    for (var n = 0; n != players[0].length; n++) {
        var nImg = document.createElement("img");
        nImg.src = players[0][n].img;
        nImg.classList.add("tallCard");
        // cInx is a "parameter"
        nImg.cInx = n;
        nImg.addEventListener("click", playerDiscosACard);
        playerZ.appendChild(nImg);
    }
}

