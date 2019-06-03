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
    discoPile = document.getElementById('disco');
}



//read as "draw a card, yugiboy!" (from this pile, of course) (it takes 'f' or 'd' facedown or disco)
function drawACard(user, pile) {
    if (user) {
        //step one highlight the deck
        if (pile == "f") {
            pile = 0
        } else {
            pile = 1
        }
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
                players[user].psuh(discoPile.shift());
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



