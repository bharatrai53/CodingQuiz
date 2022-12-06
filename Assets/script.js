var testQuestions = ["Commonly used Data Types Include:", "Arrays in JavaScript can be used to Store:", "A Value can be Saved to Local Storage", "Coding is Fun"];
var testAnswersOne = ["strings", "numbers", "booleans", "all of the above"];
var testAnswersTwo = ["strings", "cats", "dogs"];
var testAnswersThree = ["True", "False"];
var testAnswersFour = ["True", "False"];
var correctAnswer = [];
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var contentEl = document.getElementById('titleDesc');
var start = document.querySelector('#start');
var scoreList = document.querySelector('.scoreList');
var answerSelection = document.querySelector('ul');
var userNameInput = document.querySelector('textarea');
var submitScore = document.querySelector('#submitScore');
var questionIndex = 0;
var timeLeft = 30;

var questions = [
  {
    question: testQuestions[0],
    answers: { 
      choices: testAnswersOne,
      correct: "all of the above",
      isTrue: false
    }
  }, {
    question: testQuestions[1],
    answers: {
      choices: testAnswersTwo,
      correct: "strings",
      isTrue: false
    }
  }, {
    question: testQuestions[2],
    answers: {
      choices: testAnswersThree,
      correct: "True",
      isTrue: false
    }
  }, {
    question: testQuestions[3],
    answers: {
      choices: testAnswersFour,
      correct: "True",
      isTrue: false
    }
  }
];

//initialize save user details/score object
var userDetails = [
  {
    userName: userNameInput.value,
    userScore: timeLeft
  }
];

//inital start button
start.addEventListener('click', function (event) {
  event.preventDefault();
  countdown();
  displayQuestion();
});

scoreList.addEventListener('click', function (event) {
  event.preventDefault();
  var element = event.target;
//remove all content
  document.getElementById('countdown').innerHTML = "";
  document.getElementById('main').innerHTML = "";
  document.getElementById('titleDesc').innerHTML = "";
  document.querySelector('ul').innerHTML = "";
  document.querySelector('textarea').innerHTML = "";
  document.querySelector('#submitScore').innerHTML = "";
  document.getElementById('answers').innerHTML = "";
  document.querySelector('#submitScore').remove();
  document.querySelector('#start').remove();
  
  displayUserScore();
});

function countdown() {
  // create timer function and store in timeInterval variable
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft + " seconds left.";

    if (timeLeft >= 0) {
      if (questions[3].answers.isTrue == true) {
        clearInterval(timeInterval);
        endGame();
      }
    }
    
    if (timeLeft < 10) {
      timerEl.setAttribute("style", "font-size: 200%; color: red");
    }

    if (timeLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timeInterval);
      mainEl.textContent = "Time is Up!";
      endGame();
    }

    if (timeLeft < 0) {
      timeLeft = 0;
      clearInterval(timeInterval);
      timerEl.textContent = timeLeft + " seconds left.";
      endGame();
    }
  }, 1000);

  return true;
}

function displayQuestion() {
  scoreList.setAttribute("style", "cursor: not-allowed");
  document.getElementById('answers').innerHTML = "";
  start.remove();
  contentEl.remove();
  mainEl.textContent = questions[questionIndex].question; //display sequential order Test Question
  displayAnswers();  //display answers to question
}


function displayAnswers() {
  var testAnswers = questions[questionIndex].answers.choices;
  // Get a refrerence to the UL
  const ul = document.getElementById('answers');

  for (j = 0; j < testAnswers.length; j++) { // replace this with questions[questionIndex].answers.length
    var li = document.createElement("li"); // create li element.
    li.innerText = testAnswers[j]; // assigning text to li using array value.
    ul.appendChild(li); // append li to ul.
  }
}

//dynamically proceses answer selection for right answers, wrong answer, end of the game
answerSelection.addEventListener('click', function (event) {
  console.table(questions[questionIndex])
  if (event.target.matches("li")) {
    //logic for right answer
    if (event.target.textContent === questions[questionIndex].answers.correct) {
      rightAnswer();
      questions[questionIndex - 1].answers.choices.remove();
    }
    //logic for wrong answer
    else if (event.target.textContent !== questions[questionIndex].answers.correct) {
      wrongAnswer();
      document.getElementById("p").style.display = "none";
    }
  }
});

function rightAnswer() {
  console.log("Correct!🏆 ");
  var userMessage1 = document.createElement("p"); // create p element.
  userMessage1.innerText = "Correct!🏆"; 
  mainEl.appendChild(userMessage1);// assigning text to p using array value.
  timeLeft += 10; // increases time by 10 for a right answer, shorthand notation for incrementing
  questionIndex++;
  console.log(questionIndex);
  questions[questionIndex].answers.isTrue = true;
  displayQuestion();
}

function wrongAnswer() {
  console.log("WRONG");
  var userMessage2 = document.createElement("p"); // create li element.
  userMessage2.innerText = "WRONG"; // assigning text to li using array value.
  mainEl.appendChild(userMessage2);
  timeLeft -= 10;
}

function endGame() {
  //Tell user their score
  mainEl.innerHTML = "";
  document.getElementById('answers').innerHTML = "";
  var titleScore = document.createElement("h2");
  titleScore.innerText = "Your Score: ";
  mainEl.append(titleScore);

  var score = document.createElement("li");
  score.setAttribute("style", "list-style: none");
  score.innerText = timeLeft;
  titleScore.append(score);
  
  //handle user initals
  //prompt to ask user for initals 
  var userPrompt = document.getElementById("userPrompt");
  userPrompt.style.display = "block";
  score.appendChild(userPrompt);
  //get the user initals 
  var userInitials = document.getElementById("userName");
  userInitials.style.display = "block";
  userInitials.textContent = userNameInput.value;
  score.appendChild(userInitials);

  //handle user submit button
  var userSubmit = document.getElementById("submitScore");
  userSubmit.setAttribute("style", "display: block");

  var userDetails = [
    {
      userName: userInitials,
      userScore: timeLeft
    }
  ];
  
  function saveUserScore() {
    scoreList.textContent = userDetails;
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    console.table(userDetails);
  }
  //save score after user presses submit score
  submitScore.addEventListener('click', function (event) {
    event.preventDefault();
    var element = event.target;
    //make sure user entered initials
    if (userNameInput.value === "") {
      alert("Please enter your initials!");
      }
    else {
    saveUserScore();
    } 
  });
}



function displayUserScore() {
  var retrievedUser = JSON.parse(localStorage.getItem('userDetails'));
  console.log(localStorage.getItem(retrievedUser));
  console.table(retrievedUser);

  if (retrievedUser === null) {
    scoreList.textContent = "No saved scores";
  }
  else {
    scoreList = retrievedUser;
  }
  scoreList.textContent = retrievedUser;
}












/*function saveHighScore() {
  var userScore = [
    {
      userName: userNameInput.value,
      latestScore: score
    }];
}

    else {
      if (storedLosses === null) {
        loseCounter = 0;
    } else {
        loseCounter = storedLosses;
    }
    lose.textContent = loseCounter;

function displayHighScore() {
  var userScore = [
    {
      userName: userNameInput.value,
      latestScore: score
    }];
}





/*function displayAnswers(randomNum){    
    var answerBank[] = {testAnswersOne,testAnswersTwo,testAnswersThree};
    // Get a refrerence to the UL
    const ul = document.getElementById('answers');

        for (i = 0; i < testAnswers.length; i++) {
          const li = document.createElement("li"); // create li element.
          li.innerText = testAnswers[i]; // assigning text to li using array value.
          ul.appendChild(li); // append li to ul.
        }
      }

           answerSelection.addEventListener('click', function(event) {
          event.preventDefault();
          if(answerSelection.textContent == "all of the above"){
            console.log("nice");
            mainEl.textContent = "wrong!";
          }
  
          //displayQuestion();
        });
//for (i = 0; i < questions.length; i++) { //decalre a variable and initialize and make index 0, increment i+1, conditional statement to ensure length
function displayQuestion() {
  start.remove();
  contentEl.remove();
  //scoreList.remove();
  //choose random question
  //var randomNum = Math.floor(Math.random()*testQuestions.length);
  //display answers to question
  displayAnswers();
  //display Random Test Question
  //mainEl.textContent = testQuestions[randomNum];
  //display sequential order Test Question
  for (i = 0; i < testQuestions.length;) {
  mainEl.textContent = testQuestions[i];
  testQuestions.setAttribute("style", "background-color:#333333; margin-top: 20px;");
  mainEl.appendChild(testQuestions);
  li.addEventListener('click', function(event)){
    if (event)
    }
}
}


   /* for (let key in questions) {
      let value;
      value = questions[key];
    

      console.log(key + " - " + value);
      mainEl.textContent = value;
      value.setAttribute("style", "background-color:#333333; margin-top: 20px;");
      mainEl.appendChild(value);
  
  li.addEventListener('click', function(event){
      event.preventDefault();
      var element = event.target;
      if (click == )
    )}
    }

  /*for (let key in questions) { // replace this with questions[questionIndex].answers.length if (questions.hasOwnProperty(key)) {console.log(key + " " + value);}
    let value;
    value = questions[key];
    //console.log(key + " - " + value);
    localStorage.setItem('answers1', JSON.stringify(value));
    //console.log(localStorage.getItem('answers1'));
    console.log(JSON.parse(localStorage.getItem('answers1')));

  }*/
