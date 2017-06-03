$(document).ready(function() {

//Global Variables//
var correct = 0;
var wrong = 0;
var unanswered = 0;
var currentQuestion = 0;
var intervalId;
var clockRunning = false;

var triviaQuestions = [{ question: "What year was the National Park Trail System established?",
    choices: ['1914', '1942', '1965', '1981'], correctAnswer: 2}, //what is the index position of the correct choice

    {question: "What is the longest hiking trail in the USA?", choices: ["Appalachian Trail", "Continental Divide Trail", "Ozark Highlands Trail", "Pacific Crest Trail"], correctAnswer: 1},
    
    {question: 'What is another term used for "hiking" in other countries?',
    choices: ["Trekking", "Bush walking", "Tramping", "Hill walking", "All of the above."],
    correctAnswer: 4},
    
    {question: "What does a trail sign tell you?", choices: ["The difficulty of the hike.","The expected trail conditions.", "The trail name and most often mileage as well.","The expected weather conditions"], correctAnswer: 2},
    
    {question: "What is something a hiker should always have before going on his first hike?", choices: ["Hiking clothing", "Hiking boots", "Sunscreen", "Sunglasses"], correctAnswer: 1}
    ];

//DEFINE FUNCTIONS
//Initialize Game
function Initialize() {
	$("#question").html("<button id='startBtn'>Start Game</button>");
	$("#choices").html("");
	console.log ("Initialize was called")
};

//Clear divs function
function clearScreen() {
  $("#question").html("");
  $("#choices").html("");
}

//Display correct answer and image 
function displayCorrect() {
  clearScreen();
    var selectedChoice = triviaQuestions[currentQuestion].choices
    var theAnswer = triviaQuestions[currentQuestion].correctAnswer
        $("#question").html("Correct! " + selectedChoice[theAnswer]);
        $("#choices").html("Display picture here");
        console.log("display answer");
  };
//If wrong guess or no guess
function displayIncorrect() {
  clearScreen();
    var selectedChoice = triviaQuestions[currentQuestion].choices
    var theAnswer = triviaQuestions[currentQuestion].correctAnswer
        $("#question").html("Incorrect. The correct answer was: " + selectedChoice[theAnswer]);
        $("#choices").html("Display correct picture here");
        console.log("display answer");
};

//Timer Countdown object. Modeled after stopwatch exercise
var timeCountdown = {
  time: 16,
  reset: function() {
    timeCountdown.time = 16;
    $("#countdown").html("Seconds Remaining: " + timeCountdown.time);
    clearInterval(intervalId);
    clockRunning = false;
  },
  start: function() {
      if (!clockRunning) {
        intervalId = setInterval(timeCountdown.count, 1000) //everything here is in the object timeCountdown
        console.log("clock is working")
        clockRunning = true; //this turns on the clock only once
      }
  },
  stop: function() {
    clearInterval(intervalId);
    console.log("clock is stopped");
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
        displayIncorrect();
        nextQuestion();
      }
    $("#countdown").html("Seconds Remaining: " + currentTime);
  },
};

// This displays the current question and the choices
function displayCurrentQuestion() {
  var question = triviaQuestions[currentQuestion].question;
  var questionArea = $("#question");
  var choiceArea = $("#choices");
  var numChoices = triviaQuestions[currentQuestion].choices.length;

  // Set the questionArea text to the current question
    $(questionArea).html("<p><strong>" + question + "</strong></p>");
    $(choiceArea).html("");

  //assign value to choice button based on index position
  var choice;
    for (i = 0; i < numChoices; i++) {
        choice = triviaQuestions[currentQuestion].choices[i];
        $('<button class="choiceBtn" value=' + i + '>' + choice + '</button>').appendTo(choiceArea);
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
        },5000); //wait 5 seconds
           
      } else {
        displayScore();
      }
};

function displayScore () {
  clearScreen ();
  $("#countdown").html("<p>Correct Answers: "+ correct + "</p>" +"<p>Incorrect Answers: "+ wrong + "</p>" + "<p>Unanswered: "+ unanswered + "</p>")

}

//BEGIN THE GAME!
Initialize();

$(document).on("click", "#startBtn", function() {

timeCountdown.start();

 displayCurrentQuestion();

// On clicking a choice, display if it was the correct answer or not
    $(document).on("click", ".choiceBtn", function () {
      value = $(".choiceBtn").val();

      if (value == triviaQuestions[currentQuestion].correctAnswer) {
        console.log($(".choiceBtn").val())
      
          timeCountdown.stop();
          correct++;
          clearScreen();
          displayCorrect();
          console.log("You guessed correctly!")
      } 
      
      else if (value != triviaQuestions[currentQuestion].correctAnswer) {
        console.log($(".choiceBtn").val())
      
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