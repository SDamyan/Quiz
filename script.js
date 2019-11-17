//Created const variables to link my html

const startButton = document.getElementById ("start-btn");
const nextButton = document.getElementById ("next-btn");
const highScoresButton = document.getElementById ("high-score-btn");
const enterScoresButton = document.getElementById ("enter-score-btn");

const openingText = document.getElementById ("intro");
const questionContainerElement = document.getElementById ("question-container");
const questionElement = document.getElementById ("question");
const answerButtonsElement = document.getElementById ("answer-buttons");
const initialsEnter = document.getElementById ("high-score-page");
const initialsInputVar = document.getElementById ("initialsInput");
const displayNSVar = document.getElementById ("displayNameScore");


//Created empty let variables, to allow for changes throughout the program
var timeVar;
let highScore = 50;
let shuffledQuestions;
let currentQuestionIndex;



//Adding in event listeners to trigger functions: start of the game, next question, highscore page, & entering initials

startButton.addEventListener ("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})
highScoresButton.addEventListener ("click", highScorePage)
enterScoresButton.addEventListener ("click", enterScoreDisplay)



//Function for starting the game. Hiding initial start screen and removing hide from question screen 
  
  function startGame () {
    timeVar = 50;
    startButton.classList.add("hide")
    openingText.classList.add("hide")
    
    /* enterScoresButton.classList.add("hide")
    initialsEnter.classList.add("hide") */

//added in a shuffle sort, so that each time the user takes the quiz, the questions will appear in a random order
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion ()
}



//Function to run the timer
function timer () {
        timeVar = timeVar - 1;
        if (timeVar < 50) {
            time01.innerHTML = timeVar;
        }

        if (timeVar < 1) {
            window.clearInterval(update);
            highScorePage ()
        }
}
update = setInterval("timer()", 1000);




//Function to reset the screen and to trigger to show the next question.

function setNextQuestion () {
    resetState()
    showQuestion (shuffledQuestions[currentQuestionIndex])
}



//Function to set up the page to open the next questions, upon clicking the next button

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}



//Function to reset the page

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        //removed place holder answer buttons
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}



//Function for when the user selects an answer

function selectAnswer (e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct;

    questions[currentQuestionIndex].gotcorrect = Boolean(correct);
    console.log(questions[currentQuestionIndex])

    setStatusClass(document.body, correct)
    //another way to change to an array
    Array.from(answerButtonsElement.children).forEach(button => {
        //set the data set on whether or not that was a correct answer
        setStatusClass(button, button.dataset.correct)
    })
    //if else statement for running the next question, or showing the highscore button 
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        // show highscore's page
       highScoresButton.classList.remove("hide")
    }

    //adding correct responses to keep track of score
    if (!correct) {
        highScore -= 10;
    }

    //adding to local storage
    localStorage.setItem('storeObj', (highScore));

}

  


//Function to denote if the user has selected the correct of wrong answer

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}



//Function to remove style formatting for correct or wrong

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}



//Function to open the high score page

function highScorePage () {
    questionContainerElement.classList.add("hide")
    highScoresButton.classList.add("hide")
    enterScoresButton.classList.remove("hide")
    initialsEnter.classList.remove("hide") 
}

 //Function to get data from local storage   
 
function enterScoreDisplay () {
    var getObject = (localStorage.getItem('storeObj'));
    var value = initialsInputVar.value;
    displayNSVar.innerText = (value + " " + getObject)
    /* startButton.innerText = "Restart"
    startButton.classList.remove("hide")
 */
}


//Added questions in a slightly different format then the one suggested, 
//Here the value of correct is already equalled to true or false for easier data tracking

const questions = [
    {
      question: "What neighborhood is Wrigley Field in?",
      answers: [
          {text : "Lakeview", correct: false},
          {text : "Pilsen", correct: false},
          {text : "Logan Square", correct: false},
          {text : "Wrigleyville", correct: true}
        ],
        gotcorrect: false,
    },
    {
        question: "What does a Chicagoan NOT put on a hot dog?",
        answers: [
            {text : "Ketchup", correct: true},
            {text : "Pickles", correct: false},
            {text : "Mustard", correct: false},
            {text : "Onion", correct: false}
          ],
          gotcorrect: false,
    },
    {
        question: "Which of these movies is NOT based in Chicago?",
        answers: [
              {text : "Home Alone", correct: false},
              {text : "Batman: The Dark Knight", correct: false},
              {text : "Backdraft", correct: false},
              {text : "Crash", correct: true}
            ],
            gotcorrect: false,
    },
    {       
        question: "What holiday does the city dye the river?",
        answers: [
                {text : "Christmas", correct: false},
                {text : "Valentine's Day", correct: false},
                {text : "St. Patrick's Day", correct: true},
                {text : "Forth of July", correct: false}
              ],
              gotcorrect: false,
    },
    {       
        question: "What lake boarders Chicago?",
        answers: [
                  {text : "Lake Superior", correct: false},
                  {text : "Lake Michigan", correct: true},
                  {text : "Lake Ontario", correct: false},
                  {text : "Lake Huron", correct: false}
                ],
                gotcorrect: false
    }
]