//checks to see if page is ready
$(function() {
  console.log("Page is ready");
});




//creates a computer variable to track the computer's sequence
var computer = {
  sequence: [],
  currentElement: 0,
};

//creates a player variable to track their stats, as well as
//the sequence they respond with
var player = {
  level: 0,
  streak: 0,
  attempts: 0,
  response: 0,
};

function playGame() {
   countTimer = 0;
  //  console.log("Reset countTimer");
   console.log("STARTED NEW GAME");
  //  resetComputerSequence();
  //  console.log("Ran resetComputerSequence");
  //  resetPlayerResponse();
  //  console.log("Ran resetPlayerResponse");
   createMultipleSequences();
   console.log("Ran createMultipleSequences");
   flashTimer(computer.sequence);
   console.log("Ran flashTimer on computer.sequence " + computer.sequence);
   userClick();

}
//generates a random number between 1 and 4
function generateRandomNumber() {
  console.log("Generated random number")
  return Math.floor(Math.random() * 4 + 1);
}

//allows the board to be clicked and gives me the number of the
//block that was clicked
function userClick() {
  console.log("Ran userClick. Waiting for click");
  $(".clickMe").on("click", function() {
    $(this).animate({opacity: .1}, 200).animate({opacity: 1}, 100);
    console.log("Click registered");
    var tempVar = $(this).attr("id");
    player.response = (tempVar[5]);
  });
}


function noClick() {
  $(".clickMe").off("click");
  console.log("Ran noClick");
}

function youWin(){
  alert("Wow! You made it through 20 levels!");
}

function youLose() {
  alert("Sorry, you lose");
}

function levelUp() {
  player.level ++;
  console.log("Went up a level. Now at level " + player.level);
}

//makes a colored box flash according to the number passed into the function
function flashColor(boxNumber) {
  $("#block" + boxNumber).animate({opacity: .1}, 200).animate({opacity: 1}, 100);
  console.log("Flashing color for box " + boxNumber);
}

//resets all player stats
function resetPlayerStats() {
  player.streak = 0;
  player.attempts = 0;
  console.log("Reset player stats")
}

//resets computer sequence array
function resetComputerSequence() {
  countTimer = 0;
  countSequences = 0;
  computer.sequence = [];
  console.log("Reset computer.sequence. It is now " + computer.sequence);
}

//resets player response variable
function resetPlayerResponse() {
  player.response = 0;
  console.log("Reset player.response.  It is now " + player.response)
}

//creates an array of randomly generated numbers that is one element longer than
//the number of times the player has successfully matched the computer
function createComputerSequence() {
  computer.sequence.push(generateRandomNumber());
  console.log("Pushed random number into computer.sequence");
}

var countSequences = 0;
function createMultipleSequences() {
  console.log("Ran createMultipleSequences")
  createComputerSequence();
  if (countSequences <= player.level -1) {
    console.log("Compared countSequences " + countSequences + " to player.level " + player.level);
    countSequences ++;
    console.log("Increased countSequences by 1, it is now " + countSequences);
    createMultipleSequences()
  }
  console.log("Computer.sequence is now " + computer.sequence);
}

//sets the first element in the results array as a variable and removes it from the original array
//then checks it against the player's button press
function doesMatch() {
  computer.currentElement = computer.sequence[0];
  console.log("Ran doesMatch, compared player.response - " + player.response + " to computer.currentElement - " + computer.currentElement);
  if (player.response == computer.currentElement); {
    computer.sequence.shift();
    return true;
  }
  return false;
}

//Takes the computer's randomly generated sequence and outputs a number used
//to make a specific section flash.  This function has a time delay built in so
//the blocks don't flash too quickly
var countTimer = 0;
function flashTimer(array) {
  setTimeout(function() {
    flashColor(array[countTimer]);
    countTimer ++;
    if (countTimer < array.length) {
      flashTimer(array);
    } else {
    }
  }, 1000);
}

//uses 3rd party jQuery library to apply style to the inside of my
//colored blocks resulting in the empty circle in the middle
$("#block1").corner("bite, br 60px");
$("#block2").corner("bite, bl 60px");
$("#block3").corner("bite, tr 60px");
$("#block4").corner("bite, tl 60px");
