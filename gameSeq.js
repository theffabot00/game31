
actions = [];
miniTask = [];

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
    } else {
        miniTask.push(bundle.u.toString + bundle.c.toString());
        discoPile.unshift(players[bundle.u].splice(bundle.c,1)[0]);
    }
    console.log(bundle);
    updateScreen();
}

function notif() {
    
}

function pushTurn() {
    playerTurn++;
    if (playerTurn == 4) {
        playerTurn = 0;
    }
}

