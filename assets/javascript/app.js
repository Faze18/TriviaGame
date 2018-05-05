var questions = [{
    question: "The first personal computer was the:",
    answers: ["Kenbak-1", "Apple 2", "Microsoft Home Comptuer", "The IBM Basic"],
    correctAnswer: "Kenbak-1"
},
{
    question: "The number of lines of code in windows 98 is:",
    answers: ["100,000", "2 million", "18 million", "400 million"],
    correctAnswer: "18 million"
},
{
    question: "Windows was released by Microsoft in the  year:",
    answers: ["1981", "1985", "1990", "1992"],
    correctAnswer: "1985"
},
{
    question: "The first personal computer was: ",
    answers: ["Emaji", "Apple", "IBM", "ENIAC"],
    correctAnswer: "ENIAC"
},
{
    question: "The Nintendo Entertainment Sysem RAM was: ",
    answers: ["256 bits", "2 KB", "512 bits", "16 KB"],
    correctAnswer: "2 KB"
},
{
    question: "The term comptuer graphics was first used in the: ",
    answers: ["1920's", "1960's", "1980's", "1990's"],
    correctAnswer: "1960's"
},
{
    question: "The first year packets were transferred across ARPANET was (a predecessor to the internet):",
    answers: ["1952", "1969", "1975", "1982"],
    correctAnswer: "1969"
},
];
var images = ["assets/images/K1.gif", "assets/images/windows98.gif", "assets/images/gates.gif","assets/images/eniac.gif","assets/images/mario.gif","assets/images/radar.gif","assets/images/arpanet.gif"];
var userAnswer;
var correctA;
var timer = 20;
var intervalId;
var i=0;
var answered=false;
var correct=0;
var incorrect=0;
var imageCount=0;
var timeOut=0;
var timeLeft=0;
var questionNum;
var timeSpent;

function reset(){
    i =0;
    timeLeft=0;
    timeSpent=0;
    correct = 0;
    incorrect=0;
    userAnswer=undefined;
    display();

}
function stats(){
    var totalTime=questions.length * 20; 
    timeSpent=totalTime-timeLeft;
    $("#question").hide();
    $("#answers").hide();
    $("#timer").hide();
    $("#answerSplash").hide();
    $("#gifHolder").hide();
    $("#answerText").hide();
    
    $("#stats").show();
    $("#reset").show();
    $("#stats").html("Statistics:<br><br>Correct: " +correct+" <br>"+"Incorrect: " + incorrect +" <br>" + "Unused Time: " + timeLeft +" seconds"+"<br>" +"Time Spent: "+
timeSpent+" seconds")}

function decrement() {
    //  Decrease number by one.
    timer--;
    //  Show the number in the #show-number tag.
    $( "#timer" ).html( "<h2>" + timer + "</h2>" );
    //  Once number hits zero...
    if ( timer === 0 ) {
        clearInterval(intervalId);

        timer=20;
        $( "#timer" ).html( "<h1>" + timer + "</h1>" );

        //  ...run the stop function.
        answerSplash();
        $( "#answerSplash" ).text( "Sorry, you ran out of time!" );
        $( "#answerText" ).text( "The Correct Answer Was: " + questions[i].correctAnswer );
        timeout++;

        //  Alert the user that time is up.
    }
}

function timerRun() {
    
    timer=20;
    $( "#timer" ).html( "<h2>" + timer + "</h2>" );

    clearInterval( intervalId );
    intervalId = setInterval( decrement, 1000 );
}

function answerSplash(){
    timer=20;
    $("#question-").hide();
    $("#question").hide();
    $("#answers").hide();
    $("#timer").hide();
    $("#answerSplash").show();
    $("#gifHolder").show();
    $("#gifHolder").html("<img src=" + images[i] + " width='auto'>");

    i++;
    if (i<questions.length){
    setTimeout(display, 4500);}
    else{stats();}
    questionNum++;

}
function display(){
    $("#question-").show();
    $("#stats").hide();
    $("#reset").hide();
    $("#gifHolder").hide();

    timer=20;
    timerRun();

    $("#answerText").hide();
    $("#pictureHolder").hide();
    $("#answerSplash").hide();
    $("#answers").show();
    $("#timer").show();
    $("#question").show();

    $( "#question" ).text( questions[i].question );
    for ( var n = 0; n < questions[i].answers.length; n++ ) {
        $("#question-").html("Questions"+"<br>-------------------------------------------------------------");
        $("#answer-").html("Answers"+"<br>-------------------------------------------------------------<br>");
        $( "#answer" + n ).html(questions[i].answers[n] );
        correctA = questions[i].correctAnswer;
    }
}


// SETTING UP THE GAME
$( "#answers" ).hide();
$( "#question" ).hide();
$("#gifHolder").show();
$("#gifHolder").html("<img src= assets/images/background.jpg>");

$( document ).ready( function () {
    //On Start Click 


    $("#reset").hide();
    $( "#start" ).click( function () {
        $( "#start" ).hide();
        $( "#question" ).show();
        $( "#answers" ).show();
        display();

            $( "button" ).on( "click", $( this ), function () {
                timeLeft+=timer; 
                userAnswer = $( this ).text();
                answered=true;
                console.log( "answer selected" );
                //if answer is correct
                if (userAnswer == "reset"){
                    reset();
                                }
                else if ( answered && userAnswer == correctA ) {
                    console.log( i );
                    // answerSplash();
                    $("#answerText").show();

                    $( "#answerSplash" ).text( "You chose the Correct Answer!" );
                    $("#answerText").hide()
                    // display();
                    correct++;
                    answerSplash();

                    answered=false;                    
                    // i++;

                }
                else if ( answered && userAnswer !== correctA ) {
                    $( "#answerSplash" ).text( "Sorry! You chose incorrectly!" );
                    incorrect++;
                    $("#answerText").show();
                    $( "#answerText" ).text( "The Correct Answer Was: " + questions[i].correctAnswer );
                    answerSplash();

                    // display();
                    answered=false;                   
                    // i++;
                }

            } );

            
            
    } );
} );