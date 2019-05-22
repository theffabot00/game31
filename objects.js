


function Card(soot, numbro) {
    this.suit = soot;
    this.val = numbro;
    this.img = "imgAsset/" + this.val + "-" + this.suit + ".png";
}

function Stack() {

}
Stack.prototype = Array.prototype;
Stack.prototype.shuffle = function() {
    var tDeck = new Stack();
    while(this.length) {
        var aCard = this.splice(drawRando(0,this.length - 1),1)[0];
        tDeck.push(aCard);
    }
    this.push.apply(this,tDeck);
}
Stack.prototype.getSum = function() {
    var sumBySuit = [0, 0, 0, 0];
    for (var n = 0; n != this.length; n++) {
        sumBySuit[this[n].suit]++;
    }
    return(sumBySuit);
}

//init but before the page loads
drawPile = new Stack();
for (var v = 1; v != 14; v++) {
    for (var s = 0; s != 4; s++) {
        drawPile.push( new Card(s, v) );
    }
}
drawPile.shuffle();

discoPile = new Stack();


//in order, players 0 , 1 , 2 , 3
players = [new Stack(), new Stack(), new Stack(), new Stack()];
for (var aUser = 0; aUser != players.length; aUser++) {
    for (var n = 0; n != 3; n++) {
        players[aUser].push(drawPile.shift());
    }
}

//i dont know what to do here;
//I dont hink its most effective to create a new set of objects for ai

function wildcard(ind = 1) {
    
        var pile = drawRando(0,1);
        switch(pile) {
            case(0):
                pile = "f";
                break;
            case(1):
                pile = "d";
                break;
        }
        var discord = drawRando(0,3);
        queueAction(ind, "r" ,pile);
        queueAction(ind, "a", , drawRando(0,3));
}

function checkHandVal(someStack) {
    var vals = someStack.getSum;
    var max = 0;
    var soit = -1;
    for (var n = 0; n != vals.length; n++) {
        if (vals[n] > max) {
            max = vals[n]
            soit = n;
        }
    }
    return(max);
}

function drawRando(low, high) {
    var diff = (high - (low - 1));
    var rando = Math.ceil( Math.random() * diff) + (low - 1) ;
    return(rando);
}





