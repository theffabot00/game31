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
//update: its 6/9
//the longer i read this document the more i realize i havent finished readingit
//i i currently have to implement
//2
//more fringe cases




dealer = drawRando(0,3);
roundNum = 1;
//dont ask me why ive named it this and not init
function inYourSights() {
    faceDown = document.getElementById('fd');
    discoUp = document.getElementById('disco');

    
    playerTurn = dealer;
    pushTurn(dealer);
    
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
            if (knocker != -6) {
                greenify(user);
            }
        },1000);
    }
}

//im realizing now that 
//since i keep using user as a param so much
//i honestly couldve made all of the functions within classes
//but im not motivated to restart a third time
function knock(user) {
    if (knocker == -6) {
        knocker = user;
        playerKnock.style.display = "none";
    }
    var someDel = setTimeout(function() {
        greenify(user);
        pushTurn();
    }, 1000);
}


//what in the name of shenanigans is happening here??
function pushTurn(previousTurnIndex = playerTurn) {
    if (players[previousTurnIndex].getSum() == 31) {
        alert('WHHEEAAOOOO GOLDEN THIRTY ONE');

        endRound(previousTurnIndex, true);
            

        return;

    }

    playerTurn = previousTurnIndex + 1;
    //repeat code but idk how to compress so its going to stay here
    if (playerTurn == 4) {
        playerTurn = 0;
    }
    while (players[playerTurn].strikes == 3) {
        playerTurn++;
        if (playerTurn == 4) {
            playerTurn = 0;
        }
        
    }

    if (playerTurn == knocker) {
        //end the round here
        notif("ROUND END!");

        endRound();
            
        return;

    }
    if (playerTurn) {
        players[playerTurn].bot();
    } 
    if (playerTurn == 0 && knocker == -6) {
        playerKnock.style.display = 'block';
    }
}

//i decide to put a user parameter in everything 
//mfw i realize i should restart and make everything a method
//pepeHands
function endRound(user, has31 = false) {
    updateScreen(true);
    var extraTime = 0;
    if (has31) {
        for (var n = 0; n != 4; n++) {
            if (user != n) {
                players[n].strikes ++;
                redden(n);
            }
        }   
    } else {
        //ive very clearly made it not a modular piece so im not going to bother making this modular
        var sums = [
            players[0].getSum(),
            players[1].getSum(),
            players[2].getSum(),
            players[3].getSum()
        ]; 
        var min = 31;
        var idx = [];
        var playersLeft = 0;
        for (var n = 0; n != 4; n++) {
            if (players[n].strikes != 3) {
                playersLeft++;
                if (sums[n] == min) {
                    idx.push(n);
                }
                if (sums[n] < min) {
                    min = sums[n];
                    idx = [n];
                }
            }

        }
        //fringeass cases with a million ands yikes
        if (playersLeft == 2 && idx.length == 2 && players[idx[0]].strikes == 2 && players[idx[1]].strikes == 2) {
            for (var n = 0; n != idx.length; n++) {
                players[idx[n]].strikes--;
                redden(idx[n]);
            }
        } else {
            for (var n = 0; n != idx.length; n++) {
                players[idx[n]].strikes++;
                redden(idx[n]);
            }
        }

        //WHAT???
        extraTime = 5500;
        var awildDel = setTimeout(function() {
            notif("PLAYER 0: " + sums[0] + "; <br/>PLAYER 1: " + sums[1] + "; <br/>PLAYER 2: "+ sums[2] + "; <br/>PLAYER 3: " + sums[3] + ";", 8000 );
        },4000);
    }
    var anotherDel = setTimeout(function() {
        roundNum++;
        dealer++;
        if (dealer == 4) {
            dealer = 0;
        }
        grandStart();
    }, (2500 + extraTime) * 2);
}


