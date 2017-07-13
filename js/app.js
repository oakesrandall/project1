//checks to see if page is ready
$(function() {
  console.log("Page is ready");
});




//creates a computer variable to track the computer's sequence
var computer = {
  sequence: [],
  flashed: [],
  currentElement: 0,
};

//creates a player variable to track their stats, as well as
//the sequence they respond with
var player = {
  streak: 0,
  attempts: 0,
  response: 0,
  numberOfClicks: 0,
};

function playGame() {
   resetComputerSequence();
   console.log("Ran resetComputerSequence");
   resetPlayerResponse();
   console.log("Ran resetPlayerResponse");
   createComputerSequence();
   console.log("Ran createComputerSequence");
   flashTimer(computer.sequence);
   console.log("Ran flashTimer on computer.sequence " + computer.sequence);
//    setTimeout(function() {
//      if (player.response === computer.sequence[player.numberOfClicks -1]) {
//        console.log("winning");
//      } else {
//        alert("you suck")
//      }
//  }, (500));
// }
}
//generates a random number between 1 and 4
function generateRandomNumber() {
  console.log("Generated random number")
  return Math.floor(Math.random() * 4 + 1);
}

//allows the board to be clicked and gives me the number of the
//block that was clicked
function userClick() {
  console.log("Ran userClick. Waiting for clicks");
  $(".clickMe").on("click", function() {
    $(this).animate({opacity: .1}, 200).animate({opacity: 1}, 100);
    console.log("Click registered");
    var tempVar = $(this).attr("id");
    player.response = parseInt(tempVar[5]);
    console.log("Player.response is now " + player.response);
    player.numberOfClicks ++;
    console.log("player.numberOfClicks is now " + player.numberOfClicks);
  });
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
  if (countSequences < player.streak) {
    console.log("Compared countSequences " + countSequences + " to player.streak " + player.streak);
    countSequences ++;
    console.log("Increased countSequences by 1, it is now " + countSequences);
    window.setTimeout(createMultipleSequences(), 100);
  }
}

//sets the first element in the results array as a variable and removes it from the original array
//then checks it against the player's button press
function doesMatch() {
  computer.currentElement = computer.sequence.shift();
  console.log("Ran doesMatch, compared player.response - " + player.response + " to computer.currentElement - " + computer.currentElement);
  return (player.response === computer.currentElement);
}

//Takes the computer's randomly generated sequence and outputs a number used
//to make a specific section flash.  This function has a time delay built in so
//the blocks don't flash too quickly
var countTimer = 0;
function flashTimer(array) {
  setTimeout(function() {
    flashColor(array[countTimer].toString());
    countTimer ++;
    if (countTimer < array.length) {
      flashTimer(array);
    } else {
      userClick();
    }
  }, 500);
}

//uses 3rd party jQuery library to apply style to the inside of my
//colored blocks resulting in the empty circle in the middle
$("#block1").corner("bite, br 60px");
$("#block2").corner("bite, bl 60px");
$("#block3").corner("bite, tr 60px");
$("#block4").corner("bite, tl 60px");
