//checks to see if page is ready
$(function() {
  console.log("Page is ready");
});

//creates a computer variable to track the computer's sequence
var computer = {
  sequence: [],
  flashedItems: [],
  currentElement: 0,
  arrayLength: 0,
  testElement: 0,
};

//creates a player variable to track their stats, as well as
//the sequence they respond with
var player = {
  level: 1,
  streak: 0,
  attempts: 0,
  response: 0,
};


var countSequences = 0;

var counter = 0;

function playGame() {
   console.log("STARTED NEW GAME");
   resetBoard();
   createMultipleSequences();
   flashArray();

}

//generates a random number between 1 and 4
function generateRandomNumber() {
  console.log("ran generateRandomNumer")
  return Math.floor(Math.random() * 4 + 1);
}

//allows the board to be clicked and gives me the number of the
//block that was clicked
function userClick() {
  console.log("Ran userClick. Waiting for click");
  $(".clickMe").on("click", function() {
    computer.testElement = computer.flashedItems.shift();
    $(this).animate({opacity: .1}, 300).animate({opacity: 1}, 200);
    console.log("Click registered");
    var tempVar = $(this).attr("id");
    player.response = (tempVar[5]);
    $("#" + "audio" + player.response)[0].play();
    if (computer.testElement == player.response) {
      computer.sequence.push(computer.testElement);
      if (computer.flashedItems.length === 0){
         levelUp();
         noClick();
         createMultipleSequences();
         setTimeout(flashArray, 1000);
      }
    } else {
    setTimeout(youLose(), 10000);
  }
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

  if(!alert("You lose!")){window.location.reload();}
}

function levelUp() {
  player.level ++;
  player.streak = player.level;
  countSequences = 0;
  counter = 0;
  player.response = 0;
  computer.sequence = [];
  computer.flashedItems = [];
  computer.currentElement = 0;
  computer.arrayLength = 0;
  computer.testElement = 0;
  console.log("Went up a level. Now at level " + player.level);
}

//resets all player stats
function resetPlayerStats() {
  player.streak = 0;
  player.attempts = 0;
}

//resets variables
function resetBoard() {
  countSequences = 0;
  counter = 0;
  player.level = 1;
  player.response = 0;
  computer.sequence = [];
  computer.flashedItems = [];
  computer.currentElement = 0;
  computer.arrayLength = 0;
  computer.testElement = 0;
}

//resets player response variable
function resetPlayerResponse() {
  player.response = 0;
  console.log("Reset player.response.  It is now " + player.response)
}

//creates an array of randomly generated numbers that is one element longer than
//the number of times the player has successfully matched the computer
function createComputerSequence() {
  console.log("ran createComputerSequence")
  computer.sequence.push(generateRandomNumber());
  console.log("Pushed random number into computer.sequence " + computer.sequence[computer.sequence.length -1]);
}

function createMultipleSequences() {
  console.log("Ran createMultipleSequences")
  if (countSequences < player.level) {
    createComputerSequence();
    countSequences ++;
    createMultipleSequences();
  }
  console.log("Computer.sequence is now " + computer.sequence);
  computer.arrayLength = computer.sequence.length;
}

//Takes the computer's randomly generated sequence and outputs a number used
//to make a specific section flash.  This function has a time delay built in so
//the blocks don't flash too quickly

var counter = 0;
function flashArray(){
    flashColor();
    if (counter < computer.arrayLength -1) {
      counter++
      setTimeout(flashArray, 600);
    }
}

//makes a colored box flash according to the number passed into the function
function flashColor() {
  computer.currentElement = computer.sequence.shift();
  $("#" + "audio" + computer.currentElement)[0].play();
  $("#block" + computer.currentElement).animate({opacity: .1}, 300).animate({opacity: 1}, 200);
  computer.flashedItems.push(computer.currentElement);
  if (computer.sequence.length === 0) {
    console.log("computer.sequence array is empty")
    userClick();
  }
}

//uses 3rd party jQuery library to apply style to the inside of my
//colored blocks resulting in the empty circle in the middle
$("#block1").corner("bite, br 60px");
$("#block2").corner("bite, bl 60px");
$("#block3").corner("bite, tr 60px");
$("#block4").corner("bite, tl 60px");

$("button#startButton").click(function() {
  setTimeout(playGame, 600);
});
