//Global Variables//


//Question & Answers Objects
function Hike(question, answer) {
  this.question = question;
  this.answer = answer;
};

function Answers(answer, option1, option2, option3) {
  this.answer = answer;
  this.option1 = option1;
  this.option2 = option2;
  this.option3 = option3;
};

var hike1 = new Hike('How much water should you bring on a typical hike?', q1Answers );
var hike2 = new Hike('What is the easiest hiking trail in the Rocky Mountain National Park?', q2Answers);

var q1Answers = new Answers('1 litre', '1 gallon', '8 ounces','16 ounces');
var q2Answers = new Answers('Coyote Valley', 'La Poudre Pass','Granit Falls','Longs Peak');

$("#question").html("<p><strong>"+hike1.question+"</strong></p>");

//From DrinkList exercise, lists all items in object as <li>
// not sure i need this part of the example:  $("#choices").html(q1Answers);

$.each(q1Answers, function(value) {
  var hikeAnswers = $("<button>");
  hikeAnswers.html(q1Answers[value]);
  $("#choices").append(hikeAnswers)
});

//Timer Countdown
var count=16;
var counter=setInterval(timer, 1000); //1000 will run the function timer every 1 second

function timer() {
  count=count-1;
  if (count < 0)
  {
     clearInterval(counter);
     //show correct answer
     //then go onto next question automatically
     return;
  }
	$("#countdown").html(count);
}