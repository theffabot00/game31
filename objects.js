/*
 * this project is on my github!
 * https://github.com/theffabot00
 * this is probably the only project im going to finish to date lol
 * 
 * the general format to this file is
 * 1: objects and preinitialize content
 * 2: functions that assist those objects
 * 3: functinos interacting with the above two to make the game work
 * 4: random utils
 * 
 * this is the first time ive encountered this kind of issue with js
 * probably because i threw everything outside of functinos this time
 * really makes you forget the language goes line by line 
 * so not everything is following the above order
 * some stuff will inevitably be below others
 * 
*/  

/*
 *
 *THIS IS THE START OF THE OBJECT FOUNDATION AND CREATION
 *
 */

//in order, players 0 , 1 , 2 , 3
function Card(soot, numbro) {
    this.suit = soot;
    this.val = numbro;
    this.img = "imgAsset/" + this.val + "-" + this.suit + ".png";
}

function Stack() {
}

Stack.prototype = Array.prototype;
//i dont know what to do here;
//I dont hink its most effective to create a new set of objects for ai
//this will serve as the generic ai because its the easiest
Stack.prototype.wildcard = function() {
    var num = this.seat
    if (this.getSum() < 70) {
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
    }
}
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
        var baseVal = this[n].val;
        if (baseVal > 10) {
            baseVal = 10;
        } 
        if (baseVal == 1) {
            baseVal = 11;
        }
        sumBySuit[this[n].suit] += baseVal;
    }

    var max = 0;
    var soit = -1;
    for (var n = 0; n != 3; n++) {
        if (sumBySuit[n] > max) {
            max = sumBySuit[n]
            soit = n;
        }
    }
    return(max);
}


/*
 *
 *THIS IS THE INITIALIZATION OF OBJECTS (stuff outside functions i dont plan on recalling so thats fine)
 *
 */

players = [new Stack(), new Stack(), new Stack(), new Stack()];
players[1].bot = Stack.prototype.wildcard;
players[2].bot = Stack.prototype.wildcard;
players[3].bot = Stack.prototype.wildcard;

for (var n = 0; n != 4; n++) {
    players[n].strikes = 0;
    players[n].seat = n;
}


//im writing this in advance; unsure if this is necessary
function rebootBoard() {
    drawPile = new Stack();
    for (var v = 1; v != 14; v++) {
        for (var s = 0; s != 4; s++) {
            drawPile.push( new Card(s, v) );
        }
    }
    drawPile.shuffle();
    discoPile = new Stack();

    //clean out hands
    for (var aUser = 0; aUser != players.length; aUser++) {
        if (players[aUser].length) {
            for (var n = 0; n != aUser.length; n++) {
                players[aUser].pop();
            }
        }
    }

    //refill
    for (var aUser = 0; aUser != players.length; aUser++) {
        for (var n = 0; n != 3; n++) {
            players[aUser].push(drawPile.shift());
        }
    }

    //not quite belonging here, but it belongs here
    knockingPlayer = -6;
}


//some random untilities 
function drawRando(low, high) {
    var diff = (high - (low - 1));
    var rando = Math.ceil( Math.random() * diff) + (low - 1) ;
    return(rando);
}





