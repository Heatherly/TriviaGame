$(document).ready(function() {

//Global Variables//
var correct = 0;
var wrong = 0;
var unanswered = 0;
var currentQuestion = 0;
var quizOver = false;


var triviaQuestions = [{ question: "What year was the National Park Trail System established?",
    choices: ['1965','1942', '1981', '1914'], correctAnswer: 0}, //what is the index position of the correct choice

    {question: "What is the longest hiking trail in the USA?", choices: ["Continental Divide Trail","Appalachian Trail", "Ozark Highlands Trail", "Pacific Crest Trail"], correctAnswer: 0},
    
    {question: 'What is another term used for "hiking" in other countries?',
    choices: ["Trekking", "Bush walking", "Tramping", "Hill walking", "All of the above."],
    correctAnswer: 1},
    
    {question: "What does a trail sign tell you?", choices: ["The difficulty of the hike.","The expected trail conditions.", "The trail name and most often mileage as well.","The expected weather conditions"], correctAnswer: 2},
    
    {question: "What is something a hiker should always have before going on his first hike?", choices: ["Hiking clothing", "Hiking boots", "Sunscreen", "Sunglasses"], correctAnswer: 1}
    ];

//Initialize Game
function Initialize() {
	$("#question").html("<button id='startBtn'>Start Game</button>");
	$("#choices").html("");
	console.log ("Initialize was called")
};

// This displays the current question AND the choices
function displayCurrentQuestion() {
   var question = triviaQuestions[currentQuestion].question;
    var questionArea = $("#question");
    var choiceArea = $("#choices");
    var numChoices = triviaQuestions[currentQuestion].choices.length;

    // Set the questionArea text to the current question
    $(questionArea).html("<p><strong>" + question + "</strong></p>");
    $(choiceArea).html("");

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = triviaQuestions[currentQuestion].choices[i];
        $('<button class="choiceBtn" value=' + i + '>' + choice + '</button>').appendTo(choiceArea);
    }
}

Initialize();
$(document).on("click", "#startBtn", function() {

//Timer Countdown
var count=16;
var counter=setInterval(timer, 1000); //1000 will run the function timer every 1 second

function timer() {
  count=count-1;
  if (count < 0)
  {
     clearInterval(counter);
     // Initialize();
     //then go onto next question automatically
     return;
  }
	$("#countdown").html("Seconds Remaining: " + count);
};

 displayCurrentQuestion();

 // On clicking a choice, display if it was the correct answer or not
    $(document).on("click", ".choiceBtn", function () {
        if (!quizOver) {

            value = $(".choiceBtn").val();

                if (value == triviaQuestions[currentQuestion].correctAnswer) {
                    correct++;
                    console.log("You guessed correctly!")
                } else {
                	console.log("Incorrect guess.")
                }
				
				clearInterval(counter);
                currentQuestion++; // Since the first question was already displayed on the start button click

                if (currentQuestion < triviaQuestions.length) {
 
                    displayCurrentQuestion();
                } else {
                    displayScore();
                }
      		}
      	});         
      
}); //document.onclick Start Button
}); // document.ready closing brackets