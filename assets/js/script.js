// Check for last player
    // Retrieve current item from storage
    var lastPlay = JSON.parse(localStorage.getItem("quizTaker"));
    var $lastPlaySpan = document.getElementById("lastPlay");
    var $lastScoreSpan = document.getElementById("lastScore");
    
    // Check to see if there's an item to display
    function lastGame(){
        if(lastPlay === null){
            return;
        } else {
            $lastPlaySpan.textContent = lastPlay.taker;
            $lastScoreSpan.textContent = lastPlay.score;
        }
    }

    lastGame();

// Start Quiz Button
var $startButton = document.getElementById("startButton");
$startButton.addEventListener("click", startQuiz);

// Timer
var $timer = document.getElementById("timer");
var currentTime = 61;

// Score keeper
var currentScore = 0;

// Check answer response
var $response = document.getElementById("response");

// Header For Quiz Description and Game Over
var $header = document.getElementById("header");

// Questions to ask and their answers
var questions = [
    { q: "Arrays are surrounded by what?", a: ["< >", "[ ]", "( )", "$ $"], cor: "[ ]" },
    { q: "What keyword is used to declare a variable?", a: ["variable", "obj", "arr", "var"], cor: "var" },
    { q: "What do you use to print something to the console?", a: ["console.log()", "var =", "alert()", "confirm()"], cor: "console.log()" },
    { q: "Booleans can be what?", a: ["true", "false", "true or false", "undefined"], cor: "true or false" },
    { q: "Which of the following gives you a pop-up with an input that you can type in?", a: ["prompt()", "alert()", "confirm()", "console.log()"], cor: "prompt()" },
    { q: "What index is 'cat' in this array: var animals = ['mouse', 'dog', 'bird', 'cat']?", a: ["1", "2", "3", "4"], cor: "3" },
    { q: "In this object, how could you retrieve 'taco': 'var user = {a: 'John', b: '40', c: 'taco', d: 'giraffe'}?", a: ["user[2]", "c.taco", "user.c", "user{2}"], cor: "user.c" },
    { q: "When getting a pop-up using confirm, what does clicking 'Cancel' return?", a: ["undefined", "null", "nothing", "false"], cor: "false" },
    { q: "A for loop is composed of an iteration, a iterator, and what?", a: ["a loop condition", "objects", "arrays", "the console"], cor: "a loop condition" },
    { q: "How would you execute this function: function hello() { alert('Hello there!') }?", a: ["hello", "var = hello", "function hello", "hello()"], cor: "hello()" }
]

// Question number tracker
var questionNum = 0;

// Targeting the divs where the questions and answers will go
var $questions = document.getElementById("questions");
var $answersDiv = document.getElementById("answersDiv");

// ========== Functions ==========

// This function will start the quiz when the "Start Quiz" button is pressed
function startQuiz() {

    // 1. This function will start the timer countdown
    var startCountDown = setInterval(function () {
        currentTime--;
        console.log(currentTime);
        $timer.textContent = "Time: " + currentTime;
        $header.textContent = "Your Score: " + currentScore;

        // When to stop the game
        if (currentTime <= 0 || questionNum === questions.length) {
            clearInterval(startCountDown);

            // Show form to input initials
            createForm();

            // Remove header, timer, questions, answers, and answer response
            $header.remove();
            $timer.remove();
            $questions.remove();
            $answersDiv.remove();
            $response.remove();
        }
    }, 1000);

    // 2. "Start Quiz" button disappears 
    $startButton.remove();

    // 3. Display questions and answers
    // Show questions
    showQuestions();
    // Show answers
    showAnswers();
}


// Show questions function
function showQuestions() {
    // Show question
    $questions.textContent = questions[0].q;

    // Add line break
    var addSpace = document.createElement("br");
    $questions.appendChild(addSpace);

}


// Show answers function
function showAnswers() {

    // 1. Generate answer buttons
    for (var i = 0; i <= 3; i++) {
        // 1. Create answer li's
        var createLiAns = document.createElement("li");

        // 2. Add id attribute to li's
        createLiAns.setAttribute("id", `ans${i}`);

        // 3. Append answer li's to ul
        $answersDiv.appendChild(createLiAns);

        // 4. Create answer buttons
        var createAns = document.createElement("button");

        // 5. Add id and classes to answer buttons
        createAns.setAttribute("id", `btn${i}`);
        createAns.setAttribute("type", "button");
        createAns.setAttribute("class", "btn btn-dark btn-sm mt-2");

        // 6. Add text to answer buttons
        createAns.textContent = questions[0].a[i];

        // 7. Target answer li's
        var $ans = document.getElementById(`ans${i}`);

        // 8. Append answer buttons to li's
        $ans.appendChild(createAns);
    }

    // 2. Add event listener to answers' parent element (the ul element)
    // Add event listener to div containing the answer buttons
    $answersDiv.addEventListener("click", function (event) {
        // Check answers (if right, else wrong)
        if (event.target.textContent === questions[questionNum].cor) {
            $response.textContent = "Correct!";
            currentScore++;  // Increase score
        } else {
            $response.textContent = "Wrong!";
            currentTime = currentTime - 10;  // Decrease time
        }

        // 3. Change question and answers
        // Increase question number by 1
        questionNum++;

        // New question will be questions[newnumber]
        $questions.textContent = questions[questionNum].q;

        // Change answer button text to match new question
        for (var j = 0; j <= 3; j++) {
            // Target the answer buttons
            var $btn = document.getElementById(`btn${j}`);

            // Change answer button text to new answers
            $btn.textContent = questions[questionNum].a[j];
        }

    });
}


// Create form function

// 1. Target form in HTML
var $form = document.getElementById("form");

// 2. Create form
function createForm() {
    // 1. Create form tag
    var showForm = document.createElement("form");
    $form.appendChild(showForm);

    // 2. Create header for form and append to form
    var gameOverHeader = document.createElement("h2");
    $form.appendChild(gameOverHeader);
    gameOverHeader.textContent = "Game over!";

    // 3. Create h3 to display score and append to form
    var showFinalScore = document.createElement("h3");
    $form.appendChild(showFinalScore);
    showFinalScore.textContent = "Final Score: " + currentScore;

    // 4. Create label for input box and append to form
    var inputLabel = document.createElement("label");
    $form.appendChild(inputLabel);

    // 5. Create input box and append to form
    var showInputInitials = document.createElement("input");
    showInputInitials.setAttribute("type", "text");
    showInputInitials.setAttribute("class", "form-control w-25 float-left");
    $form.appendChild(showInputInitials);

    // 6. Add placeholder to input box
    showInputInitials.setAttribute("placeholder", "Enter your initials.");
    showInputInitials.setAttribute("id", "inputvalue");

    // 7. Create submit button and append to form
    var submitButton = document.createElement("button");
    $form.appendChild(submitButton);
    submitButton.setAttribute("id", "submit");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("class", "btn btn-dark ml-2");
    submitButton.textContent = "Submit";

    // 8. Prepare to add to local storage
    // Target submit button
    var $submitButton = document.getElementById("submit");

    // Add event listener to submit button
    $submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        // Save initials from input
        var initials = document.getElementById("inputvalue").value

        // Save initials and score into an object
        var quizTaker = {
            taker: initials,
            score: currentScore
        };

        // Initials input checker
        while (quizTaker.taker === "") {
            alert("Please enter your initials.");
            return;
        }

        // 9. Store initials and score to local storage
        localStorage.setItem("quizTaker", JSON.stringify(quizTaker));

        // 10. Retrieve info from the last quiz taker
        var lastQuizTaker = JSON.parse(localStorage.getItem("quizTaker"));
        var displayLastPlayer = "Your Initials: " + lastQuizTaker.taker;
        var displayLastScore = "Your Score: " + lastQuizTaker.score;

        // 11. Display the current player's initials and score
        gameOverHeader.textContent = displayLastPlayer + " " + displayLastScore;

        // 12. Get rid of final score, initials, input, and button
        showFinalScore.remove();
        showInputInitials.remove();
        inputLabel.remove();
        submitButton.remove();

        // 13. Create play again button and append to form
        var playAgainButton = document.createElement("button");
        playAgainButton.setAttribute("type", "button");
        playAgainButton.setAttribute("class", "btn btn-dark mb-1");
        var addBreak = document.createElement("br");
        $form.appendChild(addBreak);
        $form.appendChild(playAgainButton);
        playAgainButton.textContent = "Play Again?";

        // 14. Add event listener to play again button
        playAgainButton.addEventListener("click", function () {
            // Refreshing the page to play again:  https://stackoverflow.com/questions/5480945/refreshing-page-on-click-of-a-button
            window.location.reload();
        });

        // 15. Clear scores button and append to form
        var clearScoresButton = document.createElement("button");
        var addBreak = document.createElement("br");
        clearScoresButton.setAttribute("type", "button");
        clearScoresButton.setAttribute("class", "btn btn-dark");
        $form.appendChild(addBreak);
        $form.appendChild(clearScoresButton);
        clearScoresButton.textContent = "Clear Scores";

        // 16. Add event listener to clear scores
        clearScoresButton.addEventListener("click", function () {
            gameOverHeader.textContent = "";

            // https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
            // Remove quizTaker from localStorage
            localStorage.removeItem("quizTaker");
        });
    });
}