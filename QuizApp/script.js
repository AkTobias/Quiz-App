const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

//let currentQuestionIndex = 0;
//let score = 0;
//let questions = [];

async function fetchQuestions() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();
        startQuiz();
    } catch (error) {
        console.error('Error when loading the questions', error);
    }
}

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
   showQuestion();
    
}

function showQuestion() {
    nextQuestion();
    // fetching current question
    const currentQuestion = questions[currentQuestionIndex]
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`


     // Iterates through the anwser choices of the current question
    currentQuestion.answer.forEach(({ text, correct}) => {
        const button = createButton(text)

        //if rigth, mark rigth anwser
        if(correct) button.dataset.correct = true 
        
        button.addEventListener("click", selectAnswer)
        //add each button to the anwser-buttons container
        answerButtons.appendChild(button)
    })

}

function nextQuestion() {
    nextButton.style.display = "none";
    // innerHTML = empty string to clear the contnets of answerButtons
    answerButtons.innerHTML = "";
}

function createButton(text) {
    //new button element
    const button = document.createElement("button");
    button.innerHTML = text;
    // add 'btn' classen till button
    button.classList.add("btn");
    return button;
}

// User choose button
function selectAnswer(e) {
    const selectedBtn = e.target;
    
    //cheching after atribute data-correct 'true'
    const isCorrect = selectedBtn.dataset.correct === "true";

    //new design for anwerbutton (green) or (red)
    selectedBtn.classList.add(isCorrect ? "btnCorrect" : "btnIncorrect");

    //Iterates through all child elements of the answerButtons container. 
    Array.from(answerButtons.children).forEach(button => {
      
        button.disabled = true;
    });

    // Display the "Next" button
    nextButton.style.display = "block";

    // Increment the score if the answer is correct
    if (isCorrect) {
        score++;
    }
}

function showScore() {
    nextQuestion();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    questionElement.style.textAlign = "center"
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++
    currentQuestionIndex < questions.length ? showQuestion() : showScore()
}

nextButton.addEventListener("click", function () {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})



// Call the function to fetch and start the quiz
fetchQuestions();