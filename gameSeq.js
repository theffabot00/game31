
actions = [];
miniTask = [];



function init() {
    playerZ = document.getElementById("playerHand");
    cardDrop = document.getElementById("disco");

    updateScreen();

    //set a dealer
    dealA = drawRando(0,3);
    playerTurn = dealA;

    //kick off the game
    if (playerTurn)
        players[playerTurn].bot();
    // console.log(bEls);
    // holy smokes im dumb
    // for (var n = 0; n != bEls.length; n++) {
        
    //     if (bEls[n].nodeType == 3) {
    //         console.log("ANNIHILATED " + bEls[n]);
    //         document.body.removeChild(bEls[n]);
    //     }
        
    // }
    //oh lordy this actualyl MAKES SENSE NOW SKSKKSKSKSK
    //more deviating from original plan here
    
    //so step one: get all of the images
    //step 2: organize them so the code becomes easier to deal with
    var piccs = document.getElementsByTagName("img");
    //TIL that images with no display are still images
    onscreenImages = [];
    for (var n = 0; n != 4; n++) {
        var tempAr = [];
        for (var i = 0; i != 3; i++) {
            tempAr.push(piccs[(n * 3) + i]);
        }
        onscreenImages.push(tempAr)
    }
    onscreenImages.push( [ piccs[12], piccs[13] ]);
}



//reads like
//player [player] [r emove from/add to] [facedown pile/discard pile] [some card (applicable to discard only)]
function queueAction(player, action, stack, card) {
    //each action is two actions
    var aPack = {
        "u":player, //0 - 3
        "a":action, //r (remove) or a (add)
        "s":stack, //this is either f (facedown) or d (disco)
        "c":card //this can be und, but if it isnt, it refers to an index
    }
    actions.push(aPack);
}

//dumb initilaizing
miniTaskClock = setInterval(function(){},999);

globalClock = setInterval( function() {
    clearInterval(miniTaskClock);
    if (actions.length) {
        var bundle = actions.shift();
        interpretAction(bundle);

    }
    //im not sure why im doing this other than my brain tells me to
    miniTaskClock = setInterval(function() {
       
        //minitasks are in codes such that
        //the first digit represents the player (digit 4 means the game mat)
        //the second digit represents the card number in that player's hand (if the previous digit is 4, 0 is the facedown pile and 1 is the discard pile)
        var code = miniTask.shift();
        var clas = "";
        switch (playerTurn) {
            case(1):
                clas = "bIlight";
                break;
            case(2):
                clas = "gIlight";
                break;
            case(3):
                clas = "rIlight";
                break;
            default:
                clas = "yIlight";
                break;
        }
        //oof 
        cleanCards();
        //the regret is sinking in now
        var numa = parseInt(code.charAt(0));
        var numb = parseInt(code.charAt(1));
        if (numb == 3 && onscreenImages[numa].length != 4) {
            var nImg = document.createElement("img");
            if (numa % 2 == 1) {
                nImg.src = "imgAsset/cardBack1.png";
                nImg.className += " wideCard";
            } else {
                nImg.src = "imgAsset/cardBack0.png";
                nImg.className += " tallCard";
            }
            onscreenImages[numa].push(nImg);
        }
        onscreenImages[numa][numb].classList.add(clas);
    },500)
}, 1100);



function interpretAction(bundle) {
    if (bundle.a == "r") {
        if (bundle.s == "f") {
            miniTask.push("40");
            players[bundle.u].push(drawPile.shift());
        } else {
            miniTask.push("41");
            players[bundle.u].push(discoPile.shift());
        }
        miniTask.push(bundle.u.toString() + "3");
    } else {
        miniTask.push(bundle.u.toString() + bundle.c.toString());
        discoPile.unshift(players[bundle.u].splice(bundle.c,1)[0]);
    }
    console.log(bundle);
    updateScreen();
}

function notif() {
    
}

function cleanCards() {
    var b = document.getElementsByClassName("bIlight");
    var g = document.getElementsByClassName("gIlight");
    var r = document.getElementsByClassName("rIlight");
    if (b.length) {
        document.getElementsByClassName("bIlight")[0].classList.remove("bIlight");
    }
    if (g.length) {
        document.getElementsByClassName("gIlight")[0].classList.remove("gIlight");
    }
    if (r.length) {
        document.getElementsByClassName("rIlight")[0].classList.remove("rIlight");
    }
}

function pushTurn() {
    playerTurn++;
    if (playerTurn == 4) {
        playerTurn = 0;
    }
}

