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
  response: 0,
};


//generates a random number between 1 and 4
function generateRandomNumber() {
  return Math.floor(Math.random() * 4 + 1);
}

//allows the board to be clicked and gives me the number of the
//block that was clicked
function getUserClick() {
  $(".clickMe").on("click", function() {
    console.log("clicked!");
    var tempVar = $(this).attr("id");
    console.log(tempVar);
    player.response = parseInt(tempVar[5]);
  });
}

//makes a colored box flash according to the number passed into the function
function flashColor(boxNumber) {
  $("#block" + boxNumber).fadeOut(100).fadeIn(100);
}

//resets all player stats
function resetPlayerStats() {
  player.streak = 0;
  player.attempts = 0;
}

//resets computer sequence array
function resetComputerSequence() {
  computer.sequence = [];
}

//resets player response array
function resetPlayerResponse() {
  player.response = [];
}

//creates an array of randomly generated numbers that is one element longer than
//the number of times the player has successfully matched the computer
function createComputerSequence() {
  var counter = player.attempts + 1
  while (computer.sequence.length < counter && counter < 21) {
    computer.sequence.push(generateRandomNumber());
  }
//needed to clear the counter in order for my flashTimer function
//to operate
  countTimer = 0;
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
    }
  }, 500);
//resets the computer's array after the function is run
  computer.sequence = [];
}
