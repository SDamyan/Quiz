const startButton = document.getElementById ("start-btn");
const openingText = document.getElementById ("intro");
const questionContainerElement = document.getElementById ("question-container");
const questionElement = document.getElementById ("question");
const answerButtonsElement = document.getElementById ("answer-buttons");

let shuffledQuestions;
let currentQuestionIndex;

startButton.addEventListener ("click", startGame)

function startGame () {
    startButton.classList.add("hide")
    openingText.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion ()
}

function setNextQuestion () {
    showQuestion (shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
}
        
    
function selectAnswer (){

}

const questions = [
    {
      question: "What neighborhood is Wrigley Field in?",
      answers: [
          {text : "Lakeview", correct: false},
          {text : "Pilsen", correct: false},
          {text : "Logan Square", correct: false},
          {text : "Wrigleyville", correct: true}
        ]
    }
]