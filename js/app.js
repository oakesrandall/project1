//checks to see if page is ready
$(function() {
  console.log("Page is ready");
});

//opens rules modal when the rules button is clicked
$("#rulesButton").click(function() {
  console.log("clicked rules");
  $(".modal").css("display", "block");
});

//closes modal when x is clicked
$(".close").click(function () {
  console.log("clicked close");
  $(".modal").css("display", "none");
});

//creates a variable to hold high scores that will survive a browser refresh
function createStorage() {
  localStorage.setItem("currentPlayer", 2);
  localStorage.setItem("streak1", 0);
  localStorage.setItem("streak2", 0);
}

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


//counter variables used in later functions
var countSequences = 0;
var counter = 0;


//function that runs when the play game button is pressed.  Runs the functions
// to get the game started
function playGame() {
   console.log("STARTED NEW GAME");
   resetBoard();
   createMultipleSequences();
   flashArray();
}



//generates a random number between 1 and 4
function generateRandomNumber() {
  console.log("ran generateRandomNumer");
  return Math.floor(Math.random() * 4 + 1);
}

//allows the board to be clicked and gives me the number of the
//block that was clicked

function userClick() {
  console.log("Ran userClick. Waiting for click");
  $(".clickMe").on("click", function() {
//flashes the color of the block that was clicked
    $(this).animate({opacity: 0.1}, 300).animate({opacity: 1}, 200);
    console.log("Click registered");
    var tempVar = $(this).attr("id");
    player.response = (tempVar[5]);
//plays the sound of the block that was clicked
    $("#" + "audio" + player.response)[0].play();
//waits for the sound to play, then checks if right button was clicked
    setTimeout(testCase, 400);
    });
}

//pulls the first element out of the computer's array and
//checks to see if if matches the player's input
//if it does, it puts it into another array
function testCase() {
    computer.testElement = computer.flashedItems.shift();
    if (computer.testElement == player.response) {
      computer.sequence.push(computer.testElement);
//if the computer's array is empty, level up and turn off clicks while
//the computer builds a new sequence and takes its turn flashing it on
//the board
      if (computer.flashedItems.length === 0){
         levelUp();
         noClick();
         createMultipleSequences();
         setTimeout(flashArray, 1000);
      }
    } else {
//if it doesn't match, it runs the youLose function after a brief delay
//to allow the colors and sounds to finish playing
    setTimeout(youLose, 500);
  }
}



//turns off the ability to click the board (to be used while the computer is playing)
function noClick() {
  $(".clickMe").off("click");
  console.log("Ran noClick");
}

//stretch goal, not implemented yet. currently game goes on forever
function youWin(){
  alert("Wow! You made it through 20 levels!");
}

//alerts player that they have lost and plays awful sound.  reloads page.
function youLose() {
  $("#buzz")[0].play();
  if(!alert("You lose! Switch players and click start.")){window.location.reload();}
}

//increases the player's level and changes the player's highest level to their current
//streak, assuming their current score is higher than their past scores.
function levelUp() {
  player.level ++;
  if (player.level > localStorage["streak" + localStorage.currentPlayer]) {
    localStorage["streak" + localStorage.currentPlayer] = player.level;
  }
//resets variables and counters to get ready for the next round
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

//resets all player stats stored in localStorage
function resetPlayerStats() {
  localStorage.streak1 = 0;
  localStorage.streak2 = 0;
  localStorage.currentPlayer = 2;
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
  switchPlayer();
}

//pushes the randomly generated number into the computer's array
function createComputerSequence() {
  console.log("ran createComputerSequence");
  computer.sequence.push(generateRandomNumber());
  console.log("Pushed random number into computer.sequence " + computer.sequence[computer.sequence.length -1]);
}

//determines how many randomly generated numbers should be added into the
//computer's sequence based on how high a player's level is
function createMultipleSequences() {
  console.log("Ran createMultipleSequences");
  if (countSequences < player.level) {
    createComputerSequence();
    countSequences ++;
    createMultipleSequences();
  }
  console.log("Computer.sequence is now " + computer.sequence);
  computer.arrayLength = computer.sequence.length;
}

//switches players
function switchPlayer() {
  console.log("Switching player");
  if (localStorage.currentPlayer === "1") {
    localStorage.currentPlayer = "2";
  } else if (localStorage.currentPlayer === "2"){
    localStorage.currentPlayer = "1";
  }
}

//Takes the computer's randomly generated sequence and outputs a number used
//to make a specific section flash.  This function has a time delay built in so
//the blocks don't flash too quickly
var counter = 0;
function flashArray(){
    flashColor();
    if (counter < computer.arrayLength -1) {
      counter++;
      setTimeout(flashArray, 615);
    }
}

//makes a colored box flash according to the number passed into the function
function flashColor() {
  computer.currentElement = computer.sequence.shift();
  $("#" + "audio" + computer.currentElement)[0].play();
  $("#block" + computer.currentElement).animate({opacity: 0.1}, 300).animate({opacity: 1}, 200);
  computer.flashedItems.push(computer.currentElement);
  if (computer.sequence.length === 0) {
    console.log("computer.sequence array is empty");
    userClick();
  }
}

//uses 3rd party jQuery library to apply style to the inside of my
//colored blocks resulting in the empty circle in the middle
$("#block1").corner("bite, br 60px");
$("#block2").corner("bite, bl 60px");
$("#block3").corner("bite, tr 60px");
$("#block4").corner("bite, tl 60px");

//listens for clicks on the reset player stats button and runs resetPlayerStats
$("button#resetButton").click(function() {
  console.log("clicked reset stats");
  resetPlayerStats();
  if(!alert("Player Stats have been reset")){window.location.reload();}
});

//listens for clicks on the start game button and starts the game
$("button#startButton").click(function() {
  setTimeout(playGame, 600);
});

//displays the longest streaks retrieved from local storage for each player
$("#playerOneScore").text("Player One Longest Streak: " + localStorage.streak1);
$("#playerTwoScore").text("Player Two Longest Streak: " + localStorage.streak2);
