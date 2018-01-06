$( document ).ready(function() {
	
// object to hold the questions and answers
var game = {
	questions: [
	{
   		question: 'Which is not one of the original six teams?',
   		possibles: ['Detriot Red Wings', 'Chicago Blackhawks', 'Montreal Canadians', 'Minnesota Wild'],
   		id: 'question-one',
   		answer: 3
	}, {
		question: 'Who roared to NHL stardom as "the Golden Jet"?',
		possibles: ['Bobby Orr', 'Wayne Gretsky', 'Gordie Howe', 'Bobby Hull'],
		id: 'question-two',
		answer: 3
	}, {
		question: 'What year was the offsides rule introduced by the NHL?',
		possibles: ['1930', '1950', '1970', '1990'],
		id: 'question-three',
		answer: 0
	}, {
		question: 'Who was the first hockey player to win Sportsman of the Year honors from Sports Illustrated?',
		possibles: ['Eddie Shore', 'Bob Bourne', 'Gordie Howe', 'Wayne Gretsky'],
		id: 'question-four',
		answer: 2
	}
	]}

//message once the game is over
var message = 'Game Over!';

$('#doneButton').hide();

//hides the start button
$(".startGame").on("click", function (){
	$('.wrapper').show();
	$(this).hide();
	run();
	$('#doneButton').show();

});

//timer variable
var number = 31;

$('#timeLeft').on('click', run);

// decrease the amount of time left 
function decrement(){
    number--;
    //update the text for timer
    $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
    
    if (number === 0){

    	stop();
    	//update the user that time is up
    	$('#message').html('time up!');
    	checkAnswers();
    }
}

// the run function sets time interval to one second
function run(){
    counter = setInterval(decrement, 1000);
}

// stop clears the interval
function stop(){
    clearInterval(counter);
}

// Execute the run function.
//run();

// takes inputs and relates back to 'game object'
function formTemplate(data) {
// create a question
	var qString = "<form id='questionOne'>"+ data.question +"<br>";
// array of answers
	var possibles = data.possibles;
// add radio buttons for each of the answers to questions
	for (var i = 0; i < possibles.length; i++) {
		var possible = possibles[i];
		qString = qString + "<input type='radio' name='" + data.id +"' value="+ i +">"+" "+possible+" "+"<br>";

	}
	return qString + "</form>";
}
//window.formTemplate = formTemplate;

// takes the form template and displays in html
function buildQuestions(){
	var questionHTML = ''
	for (var i = 0; i<game.questions.length; i++) {
		questionHTML = questionHTML + formTemplate(game.questions[i]);
	}
	$('#questions-container').append(questionHTML);

}

// function that checks for right answers
function isCorrect(question){
	var answers = $('[name='+question.id+']');
	var correct = answers.eq(question.answer);
	var isChecked = correct.is(':checked');
	return isChecked;
}

buildQuestions();

// check is question was answered
function checkAnswered(question){
	var anyAnswered = false;
	var answers = $('[name='+question.id+']');

// checks if buttons were checked
	for (var i = 0; i < answers.length; i++) {
		if (answers[i].checked) {
			anyAnswered = true;
		}
	}
	return anyAnswered;

}

//displays the results
function resultsTemplate(question){
	var htmlBlock = '<div>'
	htmlBlock = htmlBlock + question.question + ': ' + isChecked;
	return htmlBlock + "</div>";
}

//calculate the users results
function checkAnswers (){

	var resultsHTML = '';
	var guessedAnswers = [];
	var correct = 0;
	var incorrect = 0;
	var unAnswered =0

// check each question against the correct index and increment based on result
	for (var i = 0; i<game.questions.length; i++) {
		if (isCorrect(game.questions[i])) {
			correct++;
		} else {
			if (checkAnswered(game.questions[i])) {
				incorrect++;
			} else {
				unAnswered++;
			}}}

// display the results 
$('.results').html('correct: '+correct+ "<br>" 
					  +'incorrect: '+incorrect+ "<br>" 
					  +'unanswered: '+unAnswered);
}

// create a function with an onclick event for the doneButton that both checks the Answers 
// and stops the clock when "done" button is pressed
$('#doneButton').on('click', function() {
	checkAnswers();
	stop();
	$("#messageDiv").html("Game Over!");
	})
});

//help from catcrooke github