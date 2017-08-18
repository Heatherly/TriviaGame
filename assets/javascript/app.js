$(document).ready(function() {

//Global Variables//
var correct = 0;
var wrong = 0;
var unanswered = 0;
var currentQuestion = 0;
var intervalId;
var clockRunning = false;

var triviaQuestions = [{ question: "What year was the National Park Trail System established?",
    choices: ['1914', '1942', '1968', '1981'], correctAnswer: 2, picture: '1968trailsystem.jpg'}, //what is the index position of the correct choice

    {question: "What is the longest hiking trail in the USA?", choices: ["Appalachian Trail", "Continental Divide Trail", "Ozark Highlands Trail", "Pacific Crest Trail"], correctAnswer: 1, picture: 'cdt.jpg'},
    
    {question: 'What is another term used for "hiking" in other countries?',
    choices: ["Trekking", "Bush walking", "Tramping", "Hill walking", "All of the above."],
    correctAnswer: 4, picture: 'trailhiking.jpg'},
    
    {question: "What does a trail sign tell you?", choices: ["The difficulty of the hike.","The expected trail conditions.", "The trail name and most often mileage as well.","The expected weather conditions"], correctAnswer: 2, picture: 'trailsign.jpg'},
    
    {question: "What is something a hiker should always have before going on his first hike?", choices: ["Hiking clothing", "Hiking boots", "Sunscreen", "Sunglasses"], correctAnswer: 1, picture: 'hikingboots.jpg'}
    ];

//DEFINE FUNCTIONS
//Initialize Game
function Initialize() {
  clearScreen();
	$("#question").html("<button id='startBtn'>Start Game</button>");
	$("#countdown").empty();
};

//Display correct answer and image 
function displayCorrect() {
  clearScreen();
    var selectedChoice = triviaQuestions[currentQuestion].choices
    var theAnswer = triviaQuestions[currentQuestion].correctAnswer
        $("#answer").html("Correct! " + selectedChoice[theAnswer]);
        $("#answerPic").html('<img class="answerPic" src="assets/images/' + triviaQuestions[currentQuestion].picture + '">');
        };

//If wrong guess or no guess at all (time ran out)
function displayIncorrect() {
  clearScreen();
    var selectedChoice = triviaQuestions[currentQuestion].choices
    var theAnswer = triviaQuestions[currentQuestion].correctAnswer
        $("#answer").html("Incorrect. The correct answer was: " + selectedChoice[theAnswer]);
        $("#answerPic").html('<img class="answerPic" src="assets/images/' + triviaQuestions[currentQuestion].picture + '">');
};

//If wrong guess or no guess at all (time ran out)
function displayTimesUp() {
  clearScreen();
    var selectedChoice = triviaQuestions[currentQuestion].choices
    var theAnswer = triviaQuestions[currentQuestion].correctAnswer
        $("#answer").html("Time's up! The correct answer was: " + selectedChoice[theAnswer]);
        $("#answerPic").html('<img class="answerPic" src="assets/images/' + triviaQuestions[currentQuestion].picture + '">');
};

//Clear divs function
function clearScreen() {
  $("#answer").empty()
  $("#answerPic").empty();
  $("#question").empty();
  $("#choices").empty();
};

//Timer Countdown object. Modeled after stopwatch exercise
var timeCountdown = {
  time: 15,
  reset: function() {
    timeCountdown.time = 15;
    $("#countdown").html("Seconds Remaining: " + timeCountdown.time);
    clearInterval(intervalId);
    clockRunning = false;
  },
  start: function() {
      if (!clockRunning) {
        intervalId = setInterval(timeCountdown.count, 1000) //everything here is in the object timeCountdown
        // console.log("clock is working")
        clockRunning = true; //this turns on the clock only once
      }
  },
  stop: function() {
    clearInterval(intervalId);
    // console.log("clock is stopped");
    clockRunning = false;
  },

  count: function() {
      timeCountdown.time--;
      currentTime = timeCountdown.time;
      //when time runs out...
      if (currentTime === 0) {
        timeCountdown.stop();
        unanswered++;
        clearScreen();
        displayTimesUp();
        nextQuestion();
      }
    $("#countdown").html("Seconds Remaining: " + currentTime);
  },
};

// This displays the current question and the choices
function displayCurrentQuestion() {
  // $("#answer").empty()
  // $("#answerPic").empty();
clearScreen();
  var question = triviaQuestions[currentQuestion].question;
  var questionArea = $("#question");
  var choiceArea = $("#choices");
  var numChoices = triviaQuestions[currentQuestion].choices.length;

  // Set the questionArea text to the current question
    $(questionArea).html("<p><strong>" + question + "</strong></p>");

  //assign value to choice button based on index position
  var choice;
    for (i = 0; i < numChoices; i++) {
        choiceNum = triviaQuestions[currentQuestion].choices[i];
        var choicesBtn = $("<button>")
        choicesBtn.addClass("choiceBtn");
        choicesBtn.attr("data-value", i);
        choicesBtn.text(choiceNum);
        $(choiceArea).append(choicesBtn);
    }
};

//Display next question
function nextQuestion() {
  currentQuestion++;
     if (currentQuestion < triviaQuestions.length) {
        setTimeout(function(){
        displayCurrentQuestion()//runs first
        timeCountdown.reset();//runs second
        timeCountdown.start();//runs third
        },4000); //wait 5 seconds

     } else {
        setTimeout(function(){
        displayScore();
        },4000); //wait 5 seconds
    }
};

//Display score at the end of game
function displayScore () {
  clearScreen ();
  $("#countdown").html("<p>Correct Answers: "+ correct + "</p>" +"<p>Incorrect Answers: "+ wrong + "</p>" + "<p>Unanswered: "+ unanswered + "</p>")
  newGame();
};

function newGame() {
  $("#answer").html('<button id="newGameBtn">Try Again?</button>')
  $("#newGameBtn").on("click", function() {
      $("#countdown").empty();
      correct = 0;
      wrong = 0;
      unanswered = 0;
      currentQuestion = 0;
      intervalId;
      clockRunning = false;
      timeCountdown.time = 15;
      displayCurrentQuestion();
      timeCountdown.start();
    });
};

//BEGIN THE GAME!
Initialize();

$(document).on("click", "#startBtn", function() {

timeCountdown.start();

 displayCurrentQuestion();

// On clicking a choice, display if it was the correct answer or not
    $(document).on('click', '.choiceBtn', function () {

    var getValue = $(this).attr('data-value');
      
        // console.log(getValue)
        // console.log(triviaQuestions[currentQuestion].correctAnswer)
      if (getValue == triviaQuestions[currentQuestion].correctAnswer) {
          timeCountdown.stop();
          correct++;
          clearScreen();
          displayCorrect();
          console.log("You guessed correctly!")
      } 
      else if (getValue !== triviaQuestions[currentQuestion].correctAnswer) {
          timeCountdown.stop();
          wrong++;
          clearScreen();
          displayIncorrect();
          console.log("Incorrect guess.")
      };
      
      nextQuestion();

    });         
      
}); //document.onclick Start Button
}); // document.ready closing brackets