
actions = [];


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
    console.log(aPack);
}

globalClock = setInterval( function() {
    if (actions.length) {
        var bundle = actions.shift();
        console.log("prepared " + bundle);
        interpretAction(bundle);

    }
    
}, 900);

function interpretAction(bundle) {
    if (bundle.a == "r") {
        if (bundle.s == "f") {
            players[bundle.u].push(drawPile.shift());
        } else {
            players[bundle.u].push(discoPile.shift());
        }
    } else {
        discoPile.unshift(players[bundle.u][bundle.c]);
    }
    updateScreen();
}

function notif() {
    
}

