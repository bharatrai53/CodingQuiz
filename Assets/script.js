var testQuestions = ["Commonly used Data Types Include:", "Arrays in JavaScript are used to Store:"];
var testAnswersTwo = ["stringsnumbers", "QuestionQuestion 2c"];
var testAnswersThree = ["stringsnumbers", "QuestionQuestion 2c"];
var testAnswersOne = ["stringsnumbers", "QuestionQuestion 2c"];
var correctAnswer = []; 
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var contentEl = document.getElementById('titleDesc');
var start = document.querySelector('#start');
var scoreList = document.querySelector('.highScore');

scoreList.addEventListener('click', function(event){
        event.preventDefault();
        var element = event.target;
        var highestScore = element.getAttribute("data-state");
        console.log(highestScore);
    });

function countdown() {
    var timeLeft = 30;

    // create timer function and store in timeInterval variable
    var timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = timeLeft + " seconds left.";

      if (timeLeft < 10){
        timerEl.setAttribute("style", "font-size: 200%; color: red");
      }
  
      if(timeLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timeInterval);
        mainEl.textContent = "Time is Up!";
      }
    }, 1000);

    return true;

  }

  function displayQuestion() {
    start.remove();
    contentEl.remove();
    //scoreList.remove();
    //choose random question
    var randomNum = Math.floor(Math.random()*testQuestions.length);
    //display answers to question
    displayAnswers();
    //display Random Test Question
    mainEl.textContent = testQuestions[randomNum];
    testQuestions.setAttribute("style", "background-color:#333333; margin-top: 20px;");
    mainEl.appendChild(testQuestions);
  }

  function displayAnswers(){    
    var testAnswers = ["stringsnumbers", "QuestionQuestion 2c"];
    // Get a refrerence to the UL
    const ul = document.getElementById('answers');

        for (i = 0; i < testAnswers.length; i++) {
          const li = document.createElement("li"); // create li element.
          li.innerText = testAnswers[i]; // assigning text to li using array value.
          ul.appendChild(li); // append li to ul.
        }
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
      */


start.addEventListener('click', function(event) {
    event.preventDefault();
    countdown();
    displayQuestion();
});