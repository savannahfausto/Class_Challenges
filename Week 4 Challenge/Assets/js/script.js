//global scope variables
var scoreBtn = document.querySelector("#highscores");
var timeDisplay = document.querySelector("#timer-count");
var startBtn = document.querySelector("#start-button");
var displayQuestion = document.querySelector("#questions");
var answerContainer = document.querySelector("#answers");
var btnA = document.querySelector("#a");
var btnB = document.querySelector("#b");
var btnC = document.querySelector("#c");
var btnD = document.querySelector("#d");
var answerVer = document.querySelector("#answer-type");
var scoreMsg = document.querySelector("#score-message");
var finalScore = document.querySelector("#final-score");
var initialsForm = document.querySelector("#initials-form");
var initialsInput = document.querySelector("#initials");
var submitScoreBtn = document.querySelector("#submit-score");
var highscoreEntry = document.querySelector("#stored-initials-score");
var restartBtn = document.querySelector("#restart");
var clearHighscoresBtn = document.querySelector("#clear-highscores");
var startPage = document.querySelector(".start-page");
var quizPage = document.querySelector(".quiz-page");
var userScorePage = document.querySelector(".user-score-page");
var highscorePage = document.querySelector(".highscore-page")

var timer;
var timerCount;
var currentQuestionIndex = 0;
var storedInitials =[];

var quizBanks = [{
    question: "1. Commonly used  data types DO NOT include: ",
    options: ["A. strings", "B. booleans", "C. alerts", "D. numbers",
],
answer: "C. alerts",
},
{
    question: "2. The condition in an if / else statement is enclosed within ______.",
    options: ["A. quotes", "B. curly brackets", "C. parentheses", "D. square brackets",
],
answer: "C. parentheses",
},
{
    question: "3. Arrays in JavaScript can be used to store ________.",
    options: ["A. numbers and strings", "B. other arrays", "C. booleans", "D. all of the above",
],
answer: "D. all of the above",
},
{
    question: "4. String values must be enclosed within ________ when being assigned to variables",
    options: ["A. commas", "B. curly brackets", "C. quotes", "D. parentheses",
],
answer: "C. quotes",
},
{
    question: "5. A very useful tool used during development and debugging for printing content to the debugger is: ",
    options: ["A. JavaScript", "B. terminal / bash", "C. for loops", "D. console log",
],
answer: "D. console log",
},
];
var finalQuestionIndex = quizBanks.length - 1;

function startQuiz() {
    timerCount = 75;
    scoreBtn.disabled = true;
    showQuiz();
    startTimer();
}

//The setTimer function starts and stops the timer
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timeDisplay.textContent = timerCount;
        if (timerCount <= 0 ) {
            // stops timer if time runs out and goes to game over page
            clearInterval(timer);
            scoreBtn.disabled = false;
            gameOver();
        }
    }, 1000);
}


//displays quiz container
function showQuiz() {
    quizPage.setAttribute("style", "display: flex");
    startPage.setAttribute("style", "display: none");
    userScorePage.setAttribute("style", "display: none");
    highscorePage.setAttribute("style", "display: none");
    
    showQuestions();
}

//displays questions/answer options and triggers verifyAnswer function
function showQuestions() {
    var currentQuestion = quizBanks[currentQuestionIndex].question
    displayQuestion.textContent = currentQuestion;
    
    btnA.innerHTML = quizBanks[currentQuestionIndex].options[0];
    btnB.innerHTML = quizBanks[currentQuestionIndex].options[1];
    btnC.innerHTML = quizBanks[currentQuestionIndex].options[2];
    btnD.innerHTML = quizBanks[currentQuestionIndex].options[3];
    
}


function gameOver() {

    currentQuestionIndex = 0;
    userScorePage.setAttribute("style", "display: flex");
    startPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    highscorePage.setAttribute("style", "display: none");
    
    scoreBtn.disabled = false;
    
    if (timeDisplay.innerHTML > 0) {
        scoreMsg.innerHTML = "Great Job!"
        finalScore.innerHTML = timeDisplay.innerHTML 
    } else {
        scoreMsg.innerHTML = "Game over! Try Again!"
        finalScore.innerHTML = 0 
        timeDisplay.innerHTML = 0
    }
}

function viewHighscores() {
    highscorePage.setAttribute("style", "display: flex");
    startPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    userScorePage.setAttribute("style", "display: none");
    
    //when click restart button go back to homescreen
    restartBtn.addEventListener("click", function() {
        startPage.setAttribute("style", "display: flex");
        quizPage.setAttribute("style", "display: none");
        userScorePage.setAttribute("style", "display: none");
        highscorePage.setAttribute("style", "display: none");
    }
    );

    var savedInitials = JSON.parse(localStorage.getItem("storedInitials"));
    if (savedInitials !== null) {
        storedInitials = savedInitials;
    }

}

//when click capture initials + score and push to empty array, store array, retrieve array and make each index its own li line that you create
function renderScores() {
    highscoreEntry.innerHTML = "";
    
    for (var i = 0; i < storedInitials.length; i++) {
        var storedInitial = storedInitials[i];
        var li = document.createElement("li");
        li.textContent = storedInitial;

        highscoreEntry.appendChild(li);
    }
   
}


function storeScores() {
    localStorage.setItem("storedInitials",JSON.stringify(storedInitials));
}

initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var inputText = initialsInput.value + " " + finalScore.innerHTML;
    
    console.log("initialsInput.value", initialsInput.value);
    console.log("finalScore.innerHTML", finalScore.innerHTML);
    console.log ("inputText", inputText);

    
    storedInitials.push(inputText);
    initialsInput.value = "";

    storeScores();
    renderScores();
});

function clearHighScores (){
    localStorage.removeItem("storedInitials");
}


scoreBtn.addEventListener("click", viewHighscores);

startBtn.addEventListener("click", startQuiz);

clearHighscoresBtn.addEventListener("click", clearHighScores);

answerContainer.addEventListener("click", function(event) {  
    var answerBtn = event.target;
    if(answerBtn.innerHTML === quizBanks[currentQuestionIndex].answer && currentQuestionIndex !== finalQuestionIndex) {
        answerVer.textContent = "Correct!";
        currentQuestionIndex += 1;
 answerContainer = ""
 showQuiz();

} else if (answerBtn.innerHTML !== quizBanks[currentQuestionIndex].answer && currentQuestionIndex !== finalQuestionIndex){
    answerVer.textContent = "Wrong Answer!";
    timerCount -= 10;
    timeDisplay.textContent = timerCount;  
    
} else if (answerBtn.innerHTML !== quizBanks[currentQuestionIndex].answer && currentQuestionIndex === finalQuestionIndex) {
    answerVer.textContent = "Wrong Answer!";
    timerCount -= 10;
    timeDisplay.textContent = timerCount; 
}  else {
    answerVer.textContent = "Correct!";
    clearInterval(timer);
    gameOver();
}
});


