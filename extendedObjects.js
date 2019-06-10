
/*
 * welcome to the bots folder
 * i got tired of scrolling through the objects folder
 * so here we are
 * 
 * 
 * 
*/



//i dont know what to do here;
//I dont hink its most effective to create a new set of objects for ai
//this will serve as the generic ai because its the easiest
Stack.prototype.randomly = function() {
    var num = this.seat
    if (this.getSum() < 30 || knocker != -6) {
        if (discoPile.length) {
            drawACard(num, drawRando(0,1) );
        } else {
            drawACard(num, 0 );
        }
        var firstDel = setTimeout(function() {
            discardACard(num, drawRando(0,3));
        }, 2000);
        var nextDel = setTimeout(function(){
            pushTurn();
        }, 4000);
    } else {
        knock(num);
    }
}

Stack.prototype.aggressively = function() {
    var num = this.seat;
    var opStack = 0; //draw a card by default because why wuld you want a card someone discarded?

}

//ok im going to follow through on my idea and make methods for the objects
//objective: determine if you have two cards of the same suit and which card that is
//if you dont, throw a -1 back
Stack.prototype.ofTwo = function() {
    var suits = [0,0,0,0];
    for (var n = 0; n != this.length; n++) {
        suits[this[n].suit] ++;
    }
    var max = Math.max(suits);
    var maxs = [];
    while (Math.max(suits) == max) {
        maxs.push( suits.splice(suits.indexOf(max),1) );
    }
    return(maxs);
}





players[1].bot = Stack.prototype.randomly;
players[2].bot = Stack.prototype.randomly;
players[3].bot = Stack.prototype.randomly;
