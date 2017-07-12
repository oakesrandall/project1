//checks to see if page is ready
$(function() {
  console.log("page is ready");
});

//uses 3rd party jQuery library to apply style to the inside of my
//colored blocks resulting in the empty circle in the middle
$("#blockOne").corner("bite, br 60px");
$("#blockTwo").corner("bite, bl 60px");
$("#blockThree").corner("bite, tl 60px");
$("#blockFour").corner("bite, tr 60px");

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
