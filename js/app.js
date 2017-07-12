//checks to see if page is ready
$(function() {
  console.log("page is ready");
});

//uses 3rd party jQuery library to apply style to the inside of my
//colored blocks resulting in the empty circle in the middle
$("#block1").corner("bite, br 60px");
$("#block2").corner("bite, bl 60px");
$("#block3").corner("bite, tr 60px");
$("#block4").corner("bite, tl 60px");


//creates a computer variable to track the computer's sequence
var computer = {
  sequence: [],
};

//creates a player variable to track their stats, as well as
//the sequence they respond with
var player = {
  streak: 0,
  attempts: 0,
  response: [],
};


//generates a random number between 1 and 4
function generateRandomNumber() {
  return Math.floor(Math.random() * 4 + 1);
}

// function doesMatch(){
//   if
// }

//makes a colored box flash according to the number passed into the function
function flashColor(boxNumber) {
  $("#block" + boxNumber).fadeOut(100).fadeIn(100);
}

function resetPlayerStats() {
  player.streak = 0;
  player.attempts = 0;
}

function resetComputerSequence() {
  computer.sequence = [];
}

function resetPlayerResponse() {
  player.response = [];
}

function createComputerSequence() {
  computer.sequence.push(generateRandomNumber());
  player.attempts++
}
