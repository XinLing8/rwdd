let timeElapsed = 0;
let timerInterval;
let currentQuestion = 0;

// Timer Functions
function updateTimer() {
    let minutes = Math.floor(timeElapsed / 60);
    let seconds = timeElapsed % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("time").textContent = `${minutes}:${seconds}`;
    timeElapsed++;
    localStorage.setItem("quizTimer", timeElapsed);
}

function startTimer() {
    localStorage.removeItem("quizTimer");
    timeElapsed = 0;
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    localStorage.removeItem("quizTimer");
}

// Answer Checking Logic
function checkAnswer(input) {
    const correctAnswers = "am";
    const nextButton = document.querySelector(".next");

    let userAnswer = input.value.toLowerCase().trim();

    if (userAnswer !== "") {
        nextButton.disabled = false;

        if (userAnswer === correctAnswers) {
            input.classList.remove("incorrect");
            input.classList.add("correct");

            let correctCount = localStorage.getItem("correctAnswers") || 0;
            correctCount = parseInt(correctCount) + 1;
            localStorage.setItem("correctAnswers", correctCount);
        } else {
            input.classList.remove("correct");
            input.classList.add("incorrect");
        }
    } else {
        nextButton.disabled = true;
    }
}

// Question Navigation
function updateQuestion() {
    document.querySelector(".question").innerHTML = questions[currentQuestion].text;
    document.querySelector(".current").textContent = currentQuestion + 1;
    document.querySelector(".prev").disabled = currentQuestion === 0;
    document.querySelector(".next").disabled = true;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        stopTimer();
        currentQuestion++;
        updateQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
    }
}

// Stop Timer on Last Question
if (currentQuestion === questions.length - 1) {
    stopTimer();
}

// Initialize Quiz
document.addEventListener("DOMContentLoaded", () => {
    updateQuestion();
    startTimer();

    document.querySelector(".next").addEventListener("click", nextQuestion);
    document.querySelector(".prev").addEventListener("click", prevQuestion);
});
