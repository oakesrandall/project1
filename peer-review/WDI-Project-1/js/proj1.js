window.onload = function ready(){
	console.log("WE'RE RUNNING JAVASCRIPT");
    document.getElementById('resetButton').classList.toggle('hideMe',true);
    document.getElementById('clock').classList.toggle('hideMe',true);
    document.getElementById('millisecHand').classList.toggle('milliseconds-container-animate',false);
	document.getElementById('secHand').classList.toggle('seconds-container-animate',false);
	document.getElementById('slowOne').classList.toggle('hideMe',true)
	document.getElementById('slowTwo').classList.toggle('hideMe',true)
};





//--------------------CHARACTER (QUESTION) GENERATOR--------------//

var char = "abcdefghijklmnopqrstuvwxyz1234567890";
var question = "";
var difficulty = 1;

function makeChar(){
	question = '';
  for(var i=0; i < difficulty; i++){
  	question += char.charAt(Math.floor(Math.random()*char.length));
  }
};

function addDifficulty(){
	question = '';
	difficulty += 1;
};

//-------------PLAYER COUNTDOWN TIMER DISPLAYS---------------//

function countOne(){
	setTimeout(timerPOneReady,0)
	setTimeout(timerThree, 2000)
	setTimeout(timerTwo, 3000)
	setTimeout(timerOne, 4000)
	setTimeout(timerPOne, 5000)
}

function countTwo(){
	setTimeout(timerPTwoReady,0)
	setTimeout(timerThree, 2000)
	setTimeout(timerTwo, 3000)
	setTimeout(timerOne, 4000)
	setTimeout(timerPTwo, 5000)
}

//------------------------------count down timer------------------------//
//----ready message p1----//
function timerPOneReady(){
	var oneName=document.getElementById('p1Name').value;
	document.getElementById('winner').innerHTML = "Ready " + oneName;
}
//----ready message p2---//
function timerPTwoReady(){
	var twoName=document.getElementById('p2Name').value;
	document.getElementById('winner').innerHTML = "Ready " + twoName;
}

function timerThree(){
	document.getElementById('winner').innerHTML = "3";
}

function timerTwo(){
	document.getElementById('winner').innerHTML = "2";
}

function timerOne(){
	document.getElementById('winner').innerHTML = "1";
}

//-----p1 start------//
function timerPOne(){
	document.getElementById('winner').innerHTML = "Go!";
	pOneBegin();
  	document.getElementById('answerBox').focus();
  	document.getElementById('pOnePointer').classList.toggle('hideMe',false);
  }

//-------p2 start-----//
function timerPTwo(){
	document.getElementById('winner').innerHTML = "Go!";
	pTwoBegin();
}


//--------------------START BUTTON---------------------------//

function gameStart(){
  //document.getElementById('showQ').classList.toggle('hideMe',false);
  //document.getElementById('showQTwo').classList.toggle('hideMe', false);
  document.getElementById('answerBox').classList.toggle('hideMe',false);
  document.getElementById('answerBoxTwo').classList.toggle('hideMe',false);
  document.getElementById('clock').classList.toggle('hideMe',false);
  document.getElementById('startButton').style.visibility = 'hidden';
  document.getElementById('answerBoxes').classList.toggle("answerInputs",true)
  countOne();
};

//-------------------TRY AGAIN BUTTON APPEAR---------------------//
function resetButton(){
	document.getElementById('resetButton').classList.toggle('hideMe',false);
}

//--------------------TURN START DELAY-----------------------------------//

function startDelay(){
	setTimeout(function(){
		pTwoBegin();
	}, 3000);
}

//--------------------PLAYER ONE BUTTONS AND SCORE-------------------------------//
var pOneScore = 0;
var pOneTime = 0;
var pOneTimer;

function pOneBegin(){
    setQ();
    stopWatchStart();
    pOneTimer = setInterval(function(){
      pOneTime++;
      document.getElementById('pOneTimer').innerHTML = pOneTime;
 }, 50);
}
function pOneStop(){
	clearInterval(pOneTimer);
	pOneScore += pOneTime;
	document.getElementById('pOneScore').innerHTML = pOneScore;
	console.log('button working');
	countTwo();
	stopWatchStop();
};


//-------------------PLAYER TWO BUTTONS AND SCORE-----------------------------------//

var pTwoScore = 0;
var pTwoTime = 0;
var pTwoTimer;

function pTwoBegin(){
	setQTwo();
	stopWatchStart();
    pTwoTimer = setInterval(function(){
		pTwoTime++;
		document.getElementById('pTwoTimer').innerHTML = pTwoTime;
 }, 50);
}
function pTwoStop(){
	stopWatchStop();
	clearInterval(pTwoTimer);
	pTwoScore += pTwoTime;
	document.getElementById('pTwoScore').innerHTML = pTwoScore;
	addDifficulty();
	console.log('button working');
};

//---------------------PLAYER ONE PLACES QUESTIONS IN BOX-------------------//

var pOneQ;

function setQ(){
	makeChar();
	pOneQ=question;
	document.getElementById('qBox').innerHTML = pOneQ;
	
};

//--------------------PLAYER ONE ANSWER CHECK--------------------------//


var answer = document.getElementById('answerBox');
var challenge = document.getElementById('qBox');

function checkAnswer(){
	console.log('checking answer. Thanks!');
	if (answer.value.length >= pOneQ.length){
	if(answer.value == pOneQ){
		console.log('Correct!');
		challenge.innerHTML = '';
		pOneStop();
		document.getElementById('pOnePointer').classList.toggle('hideMe',true);
		document.getElementById('pTwoPointer').classList.toggle('hideMe',false);
		document.getElementById('answerBoxTwo').focus();
		document.getElementById('answerBox').value = '';
		document.getElementById('winner').value = '';

	}else{
		console.log('wrong');
		document.getElementById('answerBox').value = '';
	}
}
};


//-----------------PLAYER TWO PLACES QUESION IN BOX----------//

var pTwoQ;

function setQTwo(){
	makeChar();
	pTwoQ=question;
	document.getElementById('qBox').innerHTML = pTwoQ;
};



//---------------PLAYER 2 ANSWER CHECK----------------// 

var answerTwo = document.getElementById('answerBoxTwo');
var challengeTwo = document.getElementById('qBox'); 

function checkAnswerTwo(){
	console.log('checking answer 2. Thanks!');
	if (answerTwo.value.length >= pTwoQ.length){
	if(answerTwo.value == pTwoQ){
		console.log('P2 Correct!');
		challengeTwo.innerHTML = '';
		document.getElementById('pOnePointer').classList.toggle('hideMe',false);
		document.getElementById('pTwoPointer').classList.toggle('hideMe',true);
		document.getElementById('answerBoxTwo').value = '';
		document.getElementById('answerBox').focus();
		document.getElementById('winner').value = '';
		pTwoStop();
		winState();
	}else{
		console.log('P2 wrong');
		document.getElementById('answerBoxTwo').value = '';
	}
}
};

//----------------WIN STATE-----------------//

var pOneRounds = 0;
var pTwoRounds = 0;
var totalRounds = 0;

function winState(){
	 if(pOneTime < pTwoTime){
	 	var oneName=document.getElementById('p1Name').value;
		document.getElementById("winner").innerHTML= oneName + " wins round!";
		pOneRounds += 1;
		totalRounds = pOneRounds + pTwoRounds;
		document.getElementById('pOneRounds').textContent += "X ";
		setTimeout(function(){
    		document.getElementById('pOneTimer').innerHTML = '';
			document.getElementById('pTwoTimer').innerHTML = '';
			pOneTime = 0;
			pTwoTime = 0;
    	}, 2000);
	    }else{
	      var twoName=document.getElementById('p2Name').value;
		  document.getElementById("winner").innerHTML= twoName + " wins round!";
		  pTwoRounds += 1;
		  totalRounds = pOneRounds + pTwoRounds;
    	  document.getElementById("pTwoRounds").textContent += "X ";
    	  setTimeout(function(){
    		  document.getElementById('pOneTimer').innerHTML = '';
			  document.getElementById('pTwoTimer').innerHTML = '';
			  pOneTime = 0;
			  pTwoTime = 0;
    	  }, 2000);
      
      }if(totalRounds === 5){ //----checks game over condition--------------//
      	 document.getElementById('pOneTimer').innerHTML = '';
	     document.getElementById('pTwoTimer').innerHTML = '';
	     document.getElementById('pOnePointer').classList.toggle('hideMe',true);
	     document.getElementById('pTwoPointer').classList.toggle('hideMe',true);
	     pOneTime = 0;
		 pTwoTime = 0;
		 gameOver();

      }else if (totalRounds < 5){
   	countOne();
   }
};
//-------------------------------gameOver functions-----------------//
function gameOver(){
  document.getElementById('clock').classList.toggle('hideMe',true);
  resetButton();
  if(pOneScore >= pTwoScore*1.2 && pOneRounds > pTwoRounds){
    squishOne();  //-------secondary win state-----//
    console.log("player one squished")
  }else if(pOneRounds > pTwoRounds){
  	rightImgLose();
  	var oneName=document.getElementById('p1Name').value;
    document.getElementById("winner").innerHTML= oneName + " wins the game!";
	document.getElementById('leftArm').classList.toggle('leftArmRotating',true);
    console.log('player one wins by rounds')
}
  if (pTwoScore >= pOneScore*1.2 && pTwoRounds > pOneRounds){
  	squishTwo();  //--------secondary win state-----//
  	document.getElementById("winner").innerHTML="";
    console.log('player two squished')
  }else if( pTwoRounds > pOneRounds){
  	 leftImgLose();
  	 var twoName=document.getElementById('p2Name').value;
     document.getElementById("winner").innerHTML=twoName + " wins the game!";
	 document.getElementById('rightArm').classList.toggle('rightArmRotating',true);
     console.log('player two wins by rounds')
  }
}

//--------------------TRY AGAIN FUNCTION----------------------//
function tryAgain(){
	difficulty=1;
	console.log('tryAgain button working!');
	document.getElementById('pOneRounds').innerHTML = '';
	document.getElementById('pOneScore').innerHTML = '';
	//document.getElementById('pOneWins').innerHTML = '';
	pOneScore = 0;
	pOneRounds = 0;
	//pOneTime = 0;
	
	document.getElementById('pTwoRounds').innerHTML = '';
	document.getElementById('pTwoScore').innerHTML = '';
	//document.getElementById('pTwoWins').innerHTML = '';
	pTwoScore=0;
	pTwoRounds=0;
	//pTwoTime = 0;
	totalRounds = 0;

//---------------------------resets text fields and transition states---------//
	document.getElementById('winner').innerHTML='Your abilities as a warrior are beyond reproach.';
	document.getElementById('resetButton').classList.toggle('hideMe', true)
	document.getElementById('startButton').style.visibility = 'visible';
	document.getElementById('rightArm').classList.toggle('rightArmRotating',false);
	document.getElementById('leftArm').classList.toggle('leftArmRotating',false);
	document.getElementById('pOnePointer').classList.toggle('hideMe',true);
	document.getElementById('pTwoPointer').classList.toggle('hideMe',true);

//--------resets left body---------------//
	document.getElementById('left').classList.toggle('hideMe',false);
	document.getElementById('leftArm').classList.toggle('hideMe',false);
	document.getElementById('leftDead').classList.toggle('hideMe',true);
	document.getElementById('leftDead').classList.toggle('killLeft',false);

//------------resets right body---------//
	document.getElementById('right').classList.toggle('hideMe',false);
	document.getElementById('rightArm').classList.toggle('hideMe',false);
	document.getElementById('rightDead').classList.toggle('hideMe',true);
	document.getElementById('rightDead').classList.toggle('killRight',false);

//-------------resets squish ---------//
    document.getElementById('footDown').classList.toggle('pOneSquish',false);
    document.getElementById('leftDead').classList.toggle('squishLeft',false);
    document.getElementById('footDown').classList.toggle('pTwoSquish',false);
    document.getElementById('rightDead').classList.toggle('squishRight',false);

//--------------resets escape---------//
    document.getElementById('rightDead').classList.toggle('pTwoEscape',false);
    document.getElementById('leftDead').classList.toggle('pOneEscape',false);

 //------------resets "too slow"-----//
    document.getElementById('slowOne').classList.toggle('hideMe',true)
	document.getElementById('slowTwo').classList.toggle('hideMe',true)

}


//----------------------losing image transitions-------------------//
function leftImgLose(){
	document.getElementById('left').classList.toggle('hideMe',true);
	document.getElementById('leftArm').classList.toggle('hideMe',true);
	document.getElementById('leftDead').classList.toggle('hideMe',false);
	setTimeout(function(){
	document.getElementById('leftDead').classList.toggle('killLeft',true);
}, 200);
};

function rightImgLose(){
	document.getElementById('right').classList.toggle('hideMe',true);
	document.getElementById('rightArm').classList.toggle('hideMe',true);
	document.getElementById('rightDead').classList.toggle('hideMe',false);
	setTimeout(function(){
	document.getElementById('rightDead').classList.toggle('killRight',true);
}, 200);
};


//-----------------stop watch start stop functions-----------------//

function stopWatchStart(){
	document.getElementById('millisecHand').classList.toggle('milliseconds-container-animate',true);
	document.getElementById('secHand').classList.toggle('seconds-container-animate',true);
    document.getElementById('millisecHand').classList.toggle('animationPause',false);
	document.getElementById('secHand').classList.toggle('animationPause',false);
}

function stopWatchStop(){
	document.getElementById('millisecHand').classList.toggle('animationPause',true);
	document.getElementById('secHand').classList.toggle('animationPause',true);

}


//--------secondary winstate 'squish' functions----------------------//

function squishOne(){
	document.getElementById('answerBox').classList.toggle('hideMe',true);
    document.getElementById('answerBoxTwo').classList.toggle('hideMe',true);
	document.getElementById('right').classList.toggle('hideMe',true);
	document.getElementById('rightArm').classList.toggle('hideMe',true);
	document.getElementById('rightDead').classList.toggle('hideMe',false);
	document.getElementById('left').classList.toggle('hideMe',true);
	document.getElementById('leftArm').classList.toggle('hideMe',true);
	document.getElementById('leftDead').classList.toggle('hideMe',false);
	document.getElementById('squish').classList.toggle('squishMoveRight',false);
	document.getElementById('footDown').classList.toggle('pOneSquish',true);
	setTimeout(function(){
		document.getElementById('rightDead').classList.toggle('pTwoEscape',true);
		document.getElementById('leftDead').classList.toggle('squishLeft',true);
		document.getElementById('slowTwo').classList.toggle('hideMe',false);
}, 200);
}
function squishTwo(){
	document.getElementById('answerBox').classList.toggle('hideMe',true);
    document.getElementById('answerBoxTwo').classList.toggle('hideMe',true);
	document.getElementById('left').classList.toggle('hideMe',true);
	document.getElementById('leftArm').classList.toggle('hideMe',true);
	document.getElementById('leftDead').classList.toggle('hideMe',false);
	document.getElementById('right').classList.toggle('hideMe',true);
	document.getElementById('rightArm').classList.toggle('hideMe',true);
	document.getElementById('rightDead').classList.toggle('hideMe',false);
	document.getElementById('squish').classList.toggle('squishMoveRight',true);
	document.getElementById('footDown').classList.toggle('pTwoSquish',true);
	setTimeout(function(){
	  document.getElementById('leftDead').classList.toggle('pOneEscape',true);
	  document.getElementById('rightDead').classList.toggle('squishRight',true);
	  document.getElementById('slowOne').classList.toggle('hideMe',false);
}, 200);
}

//-------test functions-----------//
function testArmsUp(){
		document.getElementById('leftArm').classList.toggle('leftArmRotating',true);
		document.getElementById('rightArm').classList.toggle('rightArmRotating',true);
}

function testOneDies(){
	leftImgLose()
	document.getElementById('rightArm').classList.toggle('rightArmRotating',true);

}

function testTwoDies(){
	rightImgLose()
	document.getElementById('leftArm').classList.toggle('leftArmRotating',true);
}



