/*
 * Second most important file here!
 * this is responsible for the sequence of the game
 *      (and has inadvertently become the file thats partially responsible for display)
 *      (because i did a really big oopsie and liked the front end to the back end)
 *      (so ill try explaining it here at 12am on 5/30 (or actually 5/31))
 *      (all bots make their actions instantly, but the display and their animations/glows happen on a clock)
 *      (so a lot of the interactions the user makes are at the mercy of the clock that does the displaying)
 * 
 * FILE FORMAT
 * init() does the initializing (who goes first and then starts the game)
 * queueaction() translates an action into an object (puts the objeect into an array)
 * theres a clock and a clock in that clock; incredibly clunky and inefficient, but the point is, 
 *      the first clock processes the above action and calls the interpret action
 *      ****INTERPRET ACTION IS REALLY IMPORTANT    
 *              IT BREAKS THE ACTION INTO 2 MORE STEPS AND PUTS THOSE STEPS INTO ANOTHER ARRAY
 *      the second clock takes the smaller instructions (3-4 characters) and determines what cards on the board
 *      it should highlight and in what color. It also determines when the screen should update and when it should spit out new 
 *      cards (simulate drawing a card)
 *      NOTE: youll notice a lot of exception making, expecially with plaayer 0; that's intentional;
 * clean cards just verifies that all highlights disappear
 * push turns is actually unnecessary; it just makes sure the game moves along
 * 
 * i know i should really be doing this somewhere else, but i dont have a rubber ducky, so im talking to a keyboard
 * TODO 
 * KNOCK ON WOOD        (todo 5/31-6/1)
 * STRIKE SYSTEM        (todo 6/1 (it doesnt seem that hard))
 * CARD REVEAL          (todo 6/2 - 6/4)
 * PLAYER REMOVAL       (todo 6/4)
 *      
 * i dont intend on doing bots at this given moment because i want to get to level 5 before the end of the year
 * 
 * 
*/ 






actions = [];
miniTask = [];



function init() {
    playerZ = document.getElementById("playerHand");
    cardDrop = document.getElementById("disco");
    startEnd = document.getElementById("endRound");

    updateScreen();

    //set a dealer
    // dealA = drawRando(0,3);
    dealA = 0;
    playerTurn = dealA;

    knockedOn = -6
    canKnock = true;

    //kick off the game
    if (playerTurn)
        players[playerTurn].bot();
    // console.log(bEls);
    // holy smokes im dumb
    // for (var n = 0; n != bEls.length; n++) {
        
    //     if (bEls[n].nodeType == 3) {
    //         console.log("ANNIHILATED " + bEls[n]);
    //         document.body.removeChild(bEls[n]);
    //     }
        
    // }
    //oh lordy this actualyl MAKES SENSE NOW SKSKKSKSKSK
    //more deviating from original plan here
    
    //so step one: get all of the images
    //step 2: organize them so the code becomes easier to deal with
    var piccs = document.getElementsByTagName("img");
    //TIL that images with no display are still images
    onscreenImages = [];
    for (var n = 0; n != 4; n++) {
        var tempAr = [];
        for (var i = 0; i != 3; i++) {
            tempAr.push(piccs[(n * 3) + i]);
        }
        onscreenImages.push(tempAr)
    }
    onscreenImages.push( [ piccs[12], piccs[13] ]);
}



//reads like
//player [player] [r emove from/add to] [facedown pile/discard pile] [some card (applicable to discard only)]
function queueAction(player, action, stack, card) {
    //each action is two actions
    var aPack = {
        "u":player, //0 - 3
        "a":action, //r (remove) or a (add) I NEED TO ADD A THIRD IM SO SORRY k for knock 
        //this is why i should really think about planning 
        //if i planned for a week i really wouldnt be making dumb comments like this
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
        console.log("im actually running lol");
        if (miniTask.length) {
            //minitasks are in codes such that
            //the first digit represents the player (digit 4 means the game mat)
            //the second digit represents the card number in that player's hand (if the previous digit is 4, 0 is the facedown pile and 1 is the discard pile)
            //due to unforeseen circumstances, i need a third digit to specify the color
            //this project is really quickly falling apart so im adding a 4th digit for whether or not i remove the highlighted card
            var code = miniTask.shift();
            var clas = "";
            var numa = parseInt(code.charAt(0));
            var numb = parseInt(code.charAt(1));
            var col = parseInt(code.charAt(2));
            if (col == 1) {
                clas = "bIlight";
            } 
            if (col == 2) {
                clas = "pIlight";
            }
            if (col == 3) {
                clas = "rIlight";
            }
            console.log("Processing " + code);
            //oof 
            cleanCards();
            //the regret is sinking in now

            //this is for adding cards to hand
            if (numb == 3 && onscreenImages[numa].length != 4) {
                console.log("mysterious function runs");
                var nImg = document.createElement("img");
                if (numa % 2 == 1) {
                    nImg.src = "imgAsset/cardBack1.png";
                    nImg.className += " wideCard";
                } else {
                    nImg.src = "imgAsset/cardBack0.png";
                    nImg.className += " tallCard";
                }
                onscreenImages[numa].push(nImg);
                //THIS IS DISPLAY STUFF THAT I CANT PUT INTO THE DISPLAY FILE
                document.getElementsByTagName("div")[numa].appendChild(nImg);
                
            }


            //discarding cards
            if (code.charAt(3) == "d") {
                var aDiv = document.getElementsByTagName("div")[col];
                var sImgs = aDiv.getElementsByTagName("img");
                aDiv.removeChild(sImgs[3]);
                //this is cheating because im just popping a random card off
                onscreenImages[col].pop();
                
                
            }
            onscreenImages[numa][numb].classList.add(clas);
            //ive separated this from the previous if for a reason
            //checking if the last character is a blank is important
            //because the last action by each player(discarding) has special token d or something
            if (code.charAt(3) == "k") {
                knockedOn = col;
            }
            
            if (knockedOn != -6 && code.charAt(3) != "") {
                for (var n = 0; n != 3; n++) {
                    onscreenImages[col][n].classList.add("setCard");
                }
            }
            if (numa == 4) {
                updateDisco();
            }
            
        } else {
            cleanCards();
            //this is really bad and doesnt really belong here, but it belongs here
            //step one! make sure there arent any more actions queued! once all animation highlights have gone through
            //show the knock option
            //the reason why this isnt the optimal place to put this is because the function to hide the button is going to be 
            //in another castle
            if (players[0].length == 3 && !actions.length && knockedOn == -6)
                startEnd.style.display = "block";
                //please bear with the mental gymnastics here
                //so by this point in the code, we've established that no other player is playing cards (its all user)
                //so basically, we're asking
                    //does the player have 4 cards?
                    //because if the player has 4 cards, theyve alreay drawn
                    //and you shouldnt knock if youve drawn
                //in a surprise twist, it worked
        }
    },1000);
    
}, 2200);


function knock(user) {
    canKnock = false;
    if (user) {
        queueAction(user, "k", "f"); //third param is just a token
    } else {
        for (var n = 0; n != 3; n++) {
            onscreenImages[0][n].classList.add("setCard");
        }
        knockedOn = 0;
    }
    
    //just realizing now!!
    //i have no idea how game flow looks
    //so im doing it impromptu right here
    //at the start of a turn, you can draw or knock
    //if you draw YOU CANT KNOCK LATER (this is jsut to make my life easier lmao)
    pushTurn();
}



function interpretAction(bundle) {
    if (bundle.a == "r") {
        if (bundle.s == "f") {
            miniTask.push("40" + bundle.u);
            players[bundle.u].push(drawPile.shift());
        } else {
            miniTask.push("41" + bundle.u);
            players[bundle.u].push(discoPile.shift());
        }
        miniTask.push(bundle.u.toString() + "3" + bundle.u);
    }  
    if (bundle.a == "a"){
        miniTask.push(bundle.u.toString() + bundle.c.toString() + bundle.u);
        miniTask.push("41" + bundle.u + "d");
        discoPile.unshift(players[bundle.u].splice(bundle.c,1)[0]);

    }
    if (bundle.a == "k") {
        //worth nothing this only happens once a round
        miniTask.push(bundle.u + "1" + bundle.u);
        miniTask.push(bundle.u + "1" + bundle.u + "k");
    }
    if (bundle.u == 0) {
        miniTask.pop();
        miniTask.pop();
        updateScreen();
    }
    //i specifically had to move screen updates
    
}

function notif() {
    
}

function cleanCards() {
    var b = document.getElementsByClassName("bIlight");
    var p = document.getElementsByClassName("pIlight");
    var r = document.getElementsByClassName("rIlight");
    if (b.length) {
        document.getElementsByClassName("bIlight")[0].classList.remove("bIlight");
    }
    if (p.length) {
        document.getElementsByClassName("pIlight")[0].classList.remove("pIlight");
    }
    if (r.length) {
        document.getElementsByClassName("rIlight")[0].classList.remove("rIlight");
    }
}

function pushTurn() {
    playerTurn++;
    if (playerTurn != knockedOn) {
        if (playerTurn == 4) {
            playerTurn = 0;
        }
        if (playerTurn) {
            players[playerTurn].bot();
        }
    } else {
        alert("round  end here pls");
    }
}

