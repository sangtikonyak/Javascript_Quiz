const questions = [
    {
        question: "What is my name",
        answers: [
            { text: "dont know", correct: false },
            { text: "dont know", correct: false },
            { text: "Sangti", correct: true },
            { text: "dont know", correct: false },
        ]
    },
    {
        question: "What is my Last name",
        answers: [
            { text: "dont know", correct: false },
            { text: "dont know", correct: false },
            { text: "Konyak", correct: true },
            { text: "dont know", correct: false },
        ]
    }
];

const questionEle = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    nextButton.innerHTML = " Next"
    showQuiz();
}

function showQuiz() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionEle.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", (e)=>{
            const selectedBtn = e.target;
            const correctAns = selectedBtn.dataset.correct === "true";
            if(correctAns){
                selectedBtn.classList.add("correct");
                score++;
            }else{
                selectedBtn.classList.add("incorrect");
            }
            
            Array.from(answerButton.children).forEach(button =>{
                   if(button.dataset.correct === "true")
                   {
                    button.classList.add("correct");
                   }
                   button.disabled = true;
                   nextButton.style.display = "block";
            })
        })
    });
}

function resetState() {
nextButton.style.display = "none";
while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
}
}

function handleNextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuiz();
    }else{
        showScore()
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextQuestion();
    }else{
        startQuiz();
    }
});

function showScore(){
    resetState();
    questionEle.innerHTML = `Your scored ${score} out of ${questions.length}`;
    retry();
}
function retry(){
    const retryBtn = document.createElement("button");
    retryBtn.innerHTML = "Retry"
    retryBtn.classList.add("btn-next");
    retryBtn.style.display = "block";
    const quizEle = document.getElementById("quiz");
    quizEle.appendChild(retryBtn);
    retryBtn.addEventListener("click",()=>{
        currentQuestionIndex = 0;
        score = 0;
        retryBtn.style.display = "none";
        showQuiz();
    })
}
startQuiz();
