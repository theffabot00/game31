
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
    var opStack = 0; //draw a card by default because why wuld you want a card someone discarded?
    var cVals = this.getSum(2);
    var hasAce = false;
    var theGuarantee = discoPile.slice(0,1)[0];
    var dupe = 0;
    for (key in cVals) {
        if (key == "1") {
            hasAce = true;
        }
        if (cVals[key] >= 2) {
            dupe = parseInt(key);
        }
    }
    if (hasAce && this.getSum() == 31 && knocker == -6) {
        knock(this.seat);
    }
    if (hasAce) {
        //im going to do my own thign here so its not as perfect aggressive thing
        var ind = -1;
        for (var n = 0; n != this.length; n++) {
            if (this[n].val == 1) {
                ind = n;
                break;
            }
        }
        drawACard(this.seat, this.optimalDraw());
        var todisco = optimalDisco(ind);
        var firstDel = setTimeout(function() {
            discardACard(this.seat, todisco);
        }, 2000);
        var secondDel = setTimeout(function() {
            pushTurn();
        }, 4000);


    } else {
        if (dupe) {
            var dVal = 0;
            if (dupe == theGuarantee.val) {
                dVal = 1;
            }
            drawACard(this.seat, dVal);
            
        }

    }


}
if (this.getSum() >= 6 && cycleNum == 1 && knocker == -6) {
    knock(num);
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

Stack.prototype.optimalDraw = function() {
    //lmao im not going to determine the probqability of getting a good card in teh stack
    //that siounds like a card counter thing
    //and im religiously not doing card counter 
    var currentSum = this.getSum();
    var dupeStack = this.slice();
    dupeStack.push(discoPile.slice(0,1)[0]);
    var nSum = dupeStack.getSum();
    if (nSum > currentSum) {
        return(1);
    } else {
        return(0);
    }
    
} 

Stack.prototype.optimalDisco = function(cardBias = []) {
    var sumsByRemoving = [0,0,0,0];
    //this is really bad
    var dClone = new Stack();
    for (var n = 0; n != 4; n++) {
        dClone = this.slice();
        dClone.splice(n,1);
        sumsByremoving[n] = dClone.getSum();
    }
    for (var n = 0; n != cardBias.length; n++) {
        sumsByRemoving[cardBias[n]] = 99;
    }
    var toRemove = getMin(sumsbyRemoving).loc;
    return(toRemove);
}

players[1].bot = Stack.prototype.randomly;
players[2].bot = Stack.prototype.randomly;
players[3].bot = Stack.prototype.randomly;
