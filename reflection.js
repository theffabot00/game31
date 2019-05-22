

function init() {
    playerZ = document.getElementById("playerHand");
    cardDrop = document.getElementById("disco");

    updateScreen();

    //set a dealer
    dealA = drawRando(0,3);
    playerTurn = dealA;


    
}

function updateScreen() {
    updatePlayerHand();
    try {
        cardDrop.src = discoPile[0].img;
        cardDrop.style.display = "block";
    } catch(err) {
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
        playerZ.appendChild(nImg);
    }
}



