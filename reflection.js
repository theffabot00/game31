

function reflectedInit() {
    hands = [
        document.getElementById("u0"),
        document.getElementById("u1"),
        document.getElementById("u2"),
        document.getElementById("u3"),
    ];
    cardDrop = document.getElementById("disco");
    startEnd = document.getElementById("endRound");

    updateScreen();
}




function updateScreen() {
    //reserved for the final
    for (var n = 0; n != 4; n++) {
        updateHand(n,true);
    }
    updateDisco();
}

function updateDisco() {
    //im going to play on a really large gamble and pray that the deck never runs otu of cards
    try {
        cardDrop.src = discoPile[0].img;
        cardDrop.style.display = "inline-block";
    } catch(err) {
        cardDrop.style.display = "none";
        cardDrop.src = "";
    }
}

// function updatePlayerHand() {
//     while (playerZ.childNodes.length) {
//         playerZ.removeChild(playerZ.childNodes[0]);
//     }
//     for (var n = 0; n != players[0].length; n++) {
//         var nImg = document.createElement("img");
//         nImg.src = players[0][n].img;
//         nImg.classList.add("card");
//         // cInx is a "parameter"
//         nImg.cInx = n;
//         nImg.addEventListener("click", playerDiscosACard);
//         playerZ.appendChild(nImg);
//     }
// }

//seat takes int 0-3; reveal takes true or false
function updateHand(seat, reveal) {  
    //i mean i guess
    //var rotate = (seat % 2 == 1);
    //glory dumbass, rotate the div
    var field = hands[seat];
    while (field.childNodes.length) {
        field.removeChild(field.childNodes[0]);
    }
    var imgEls = [];
    //not elegant, but i think this is more efficient?
    if (reveal) {
        for (var n = 0; n != players[seat].length; n++) {
            var nImg = document.createElement("img");
            nImg.src = players[seat][n].img;
            nImg.classList.add("card");
            // cInx is a "parameter"
            nImg.cInx = n;
            imgEls.push(nImg);
        }
    } else {
        for (var n = 0; n != players[seat].length; n++) {
            var nImg = document.createElement("img");
            nImg.src = "imgAsset/cardBack0.png";
            nImg.classList.add("card");
            // cInx is a "parameter"
            nImg.cInx = n;
            imgEls.push(nImg);
        }
    }
    //modifiers to base cards
    if (!seat) {
        for (var n = 0; n != imgEls.length; n++) {
            imgEls[n].addEventListener("click", playerDiscosACard);
        }
    }
    // if (rotate) {
    //     for (var n = 0; n != imgEls.length; n++) {
    //         imgEls[n].style.transform = "rotate(90deg)";
    //         imgEls[n].style.display = "inline";
    //     } 
    // }
    for (var n = 0; n != imgEls.length; n++) {
        field.appendChild(imgEls[n]);
        // if (rotate) 
        //     field.appendChild(document.createElement("br"));
    }
    
}


// LETS MAKE THE HIGHLIGHTING SHENANIGANS LIVE HERE

function appraiseCard(user, location, time = 1000) {
    //from the old code!
    //location comes in the form of an object 
    //but with different syntax such that
    // {province, city} or more logically {player 0,1,2,3 or board "4" , card 0 1 2 3 4 (0 and 1 are fd and disco)}

    //note that the human will NEVER RUN THROUGH HERE
    var clas = "";
    switch(user) {
        //im aware that that isnt how you spell highlight, nor is it a good portmanteau
        //but i like it so i dont care about goos pselling
        case(1):
            clas = "bIlight";
            break;
        case(2):
            clas = "pIlight";
            break;
        case(3):
            clas = "rIlight";
            break;
        default:
            //why not
            clas= "yIlight";
            break;
    }
    //the divs are aligned!
    //pray the user isnt a complete fucking dumbass
    //and doesnt accidentally throw a div into it somehow
    var prov = location.p;
    var city = location.c;
    var elInQuestion = document.getElementsByTagName("div")[prov].getElementsByTagName("img")[city];
    elInQuestion.classList.add(clas);
    //im not sure if i can do an anonymous function that refers to the above locals, so im going to try some string building
    //what it is in the scope ok then
    //also string building doesnt work B) 
    var delHigh = setTimeout( function() {
        elInQuestion.classList.remove(clas);
    },time);

}





//weakwilled will here! this is from the old code
//AHAHAHA ME FROM 10 MINUTES AGO
// WEAK PREDICTION! I DIDNT NEED THIS
function cleanCards() {
    var b = document.getElementsByClassName("bIlight");
    var p = document.getElementsByClassName("pIlight");
    var r = document.getElementsByClassName("rIlight");
    if (b.length) {
        document.getElementsByClassName("bIlight")[0].classList.remove("bIlight");
    }
    if (p.length) {
        document.getElementsByClassName("pIlight")[0].classList.remove("pIlight");
    }
    if (r.length) {
        document.getElementsByClassName("rIlight")[0].classList.remove("rIlight");
    }
}


