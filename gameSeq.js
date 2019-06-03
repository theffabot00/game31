/*
 *
 * glad you could join me in the rebirth of the universe
 * i annihilated all of hte old code
 * its 5:57 and i have no starting ideas
 * 
 * update: its 847 and i have an idea 
 * 
 * lets make it our goal to keep the highlight display stuff in reflection
 * and the movement of objects in the background here
 * 
 * 
*/

//dont ask me why ive named it this and not init
function inYourSights() {
    faceDown = document.getElementById('fd');
    discoUp = document.getElementById('disco');

    dealerA = drawRando(0,3);
    playerTurn = dealerA;
    pushTurn(dealerA);
    
}

//i was all like
//"yea im going to redo this project without all the sub sub functinos and all the sub functions!"
//"its going to be completely linear and easy to read"
//lol




//read as "draw a card, yugiboy!" (from this pile, of course) (it takes 0 or 1 (facedown or disco))
function drawACard(user, pile) { //2000 MS TO COMPLETE
    if (user) {
        //step one highlight the deck
        appraiseCard(user, {
            // I DEADASS JUST REALIZED PROVINCE AND CITY COULD STAND FOR PLAYER AND CARD
            //MY DUMB THOUGHTS AND ABBREVIATIONS ARE JUSTIFIED
            "p":4,
            "c":pile
        });
        //step two delay everything and then call the next thing
        var someDel = setTimeout(function() {
            //after the boxshadow vanishes
            if (pile == 0) {
                players[user].push(drawPile.shift());
            } else {
                players[user].push(discoPile.shift());
            }
            updateDisco();
            updateHand(user, false);
            appraiseCard(user, {
                "p":user,
                "c":3
            });
        },1000)
    }
}

//not read in any particular way
//card is NOT THE ACTUAL CARD
//it is the index for the card in the player's hand
function discardACard(user, card) { //2000 MS TO COMPLETE
    if (user) {
        //this is ok because theres no reason for anyone to appraise anyone else's card
        appraiseCard(user, {
            "p":user,
            "c":card
        });
        var someDel = setTimeout(function() {
            discoPile.unshift(players[user].splice(card,1)[0]);
            updateDisco();
            updateHand(user,false);
            appraiseCard(user,{
                "p":4,
                "c":1
            });
        },1000);
    }
}




//what in the name of shenanigans is happening here??
function pushTurn(previousTurnIndex = playerTurn) {
    playerTurn = previousTurnIndex + 1;
    if (playerTurn == 4) {
        playerTurn = 0;
    } else {
        players[playerTurn].bot();
    }
}

