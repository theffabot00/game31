


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
Stack.prototype.removeFromTop = function() {
    //im missing something here
    this.shift();
}
Stack.prototype.stackOn = function(someCard) {
    //this is liekly rendundant
    this.unshift(someCard);
}


//init but before the page loads
drawPile = new Stack();
for (var v = 1; v != 14; v++) {
    for (var s = 0; s != 4; s++) {
        drawPile.push( new Card(s, v) );
    }
}
drawPile.shuffle();

players = [new Stack(), new Stack(), new Stack(), new Stack()];
for (var aUser = 0; aUser != players.length; aUser++) {
    for (var n = 0; n != 3; n++) {
        players[aUser].push(drawPile.shift());
    }
}


function drawRando(low, high) {
    var diff = (high - (low - 1));
    var rando = Math.ceil( Math.random() * diff) + (low - 1) ;
    return(rando);
}
