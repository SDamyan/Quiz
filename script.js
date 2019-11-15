const startButton = document.getElementById ("start-btn");
const nextButton = document.getElementById ("next-btn");
const highScoresButton = document.getElementById ("high-score-btn");
const openingText = document.getElementById ("intro");
const questionContainerElement = document.getElementById ("question-container");
const questionElement = document.getElementById ("question");
const answerButtonsElement = document.getElementById ("answer-buttons");
let highScore = 0;

let shuffledQuestions;
let currentQuestionIndex;

startButton.addEventListener ("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})
highScoresButton.addEventListener ("click", highScorePage)

function startGame () {
    startButton.classList.add("hide")
    openingText.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion ()
}

function setNextQuestion () {
    resetState()
    showQuestion (shuffledQuestions[currentQuestionIndex])
}

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

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        //removed place holder answer buttons
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
    
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
    //corrected, wrong formatting 
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        // add in event listener so on click it will show highscores
       highScoresButton.classList.remove("hide")

    }
}
    

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function highScorePage () {
    questionContainerElement.classList.add("hide")
    
}


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