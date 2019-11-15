//Created const variables to link my html
const startButton = document.getElementById ("start-btn");
const nextButton = document.getElementById ("next-btn");
const highScoresButton = document.getElementById ("high-score-btn");
const enterScoresButton = document.getElementById ("enter-score-btn");

const openingText = document.getElementById ("intro");
const questionContainerElement = document.getElementById ("question-container");
const questionElement = document.getElementById ("question");
const answerButtonsElement = document.getElementById ("answer-buttons");
const initialsEnter = document.getElementById ("high-score-page")

//Created empty let variables, to allow for changes throughout the program
let highScore = 0;
let shuffledQuestions;
let currentQuestionIndex;

//Adding in event listeners to trigger the start of the game, next question, or highscore page
startButton.addEventListener ("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})
highScoresButton.addEventListener ("click", highScorePage)
enterScoresButton.addEventListener ("click", enterScoreDisplay)


//Function for starting the game. Hiding initial start screen and removing hide from question screen 
function startGame () {
    startButton.classList.add("hide")
    openingText.classList.add("hide")
//added in a shuffle sort, so that each time the user takes the quiz, the questions will appear in a random order
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion ()
}


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
        // add in event listener so on click it will show highscores
       highScoresButton.classList.remove("hide")

    }
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


//NEED TO ADD: a way to show highscores on the screen with initials, stored in localstorage
//and reset button to bring the user back to the beginning of the quiz
}


function enterScoreDisplay () {

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
        question: "What does a Chicogan NOT put on a hot dog?",
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
                  {text : "Lake Michagin", correct: true},
                  {text : "Lake Ontario", correct: false},
                  {text : "Lake Huron", correct: false}
                ],
                gotcorrect: false
    }
]