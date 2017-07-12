$(function() {
  console.log("page is ready");
});

var player = {
  streak: 0,
  attempts: 0,
  response: [],
};

$("#blockOne").corner("bite, br 60px");
$("#blockTwo").corner("bite, bl 60px");
$("#blockThree").corner("bite, tl 60px");
$("#blockFour").corner("bite, tr 60px");
