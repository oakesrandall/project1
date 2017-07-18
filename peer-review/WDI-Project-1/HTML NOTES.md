

player initiates game with start button
	<timer starts counting up for player 1>
game displays challenge eg. "press 'g'"
player 1 presses 'g' then enter to submit <use form submit/action trigger function to check answer>
	if answer is wrong
		reset text field, keep same challenge
	if answer if correct <timer stops, logs elapse time to player 1> 
			player 1 turn ends
				short countdown to player 2 turn
player 2 challenge box populates
	<timer starts counting up for player 2>
player 2 answers challenge
repeat steps
after 10 challenges game stops
scores are displayed
  <player1 score is totaled and compared to player 2's score>
winner is assessed and thusly indicated
reset button will reset board


player switch function
1 count down timer

player 1 count up timer
player 2 count up timer

player 1 answer array 
player 2 answer array 

player 1 question array
player 2 question array



REF trivia http://jsfiddle.net/anthkris/3fnzdnun/
REF timer https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
REF form https://www.w3schools.com/js/js_validation.asp
REF https://stackoverflow.com/questions/13143932/submit-html-form-perform-javascript-function-alert-then-redirect


Answer array eg  q1 = ["a", "e", "i", "the"]
questions eg 


function submitAnswer(answer)

for(i = 0; i < q1.length; i++){
  document.getElementById('questionBox').value = "press " + [i];
	if(answer == q1[i]){
	  (stop timer)
	  document.getElementById('textInput').value ='';
	  playerOne=0
	}else{
	document.getElementById('textInput').value ='';
	document.getElementByid('wrongAnswer').value='Try again!';
	}
}

button start 
begin -- start time
got it -- stop time --> log time to score var




