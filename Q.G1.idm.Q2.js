let timeElapsed = localStorage.getItem("quizTimer") ? parseInt(localStorage.getItem("quizTimer")) : 0;
let timerInterval;

function updateTimer() {
    let minutes = Math.floor(timeElapsed / 60);
    let seconds = timeElapsed % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("time").textContent = `${minutes}:${seconds}`;

    timeElapsed++;
    localStorage.setItem("quizTimer", timeElapsed);
}

function startTimer(){
    if(!timerInterval){
        timerInterval = setInterval(updateTimer, 1000);
    }
}

document.addEventListener("DOMContentLoaded", startTimer);

function stopTimer(){
    clearInterval(timerInterval);
    localStorage.removeItem("quizTimer");
}

function checkAnswer(input) {
    const correctAnswers = "heavily";
    const nextButton = document.querySelector(".next");

    let userAnswer = input.value.toLowerCase().trim();

    if (userAnswer !== "") {
        nextButton.disabled = false;

        if (userAnswer === correctAnswers) {
            input.classList.remove("incorrect");
            input.classList.add("correct");

            if (!input.dataset.answeredCorrectly) {
                correctAnswers++;
                localStorage.setItem("correctAnswers", correctAnswers);
                input.dataset.answeredCorrectly = "true";
            }
        } else {
            input.classList.remove("correct");
            input.classList.add("incorrect");
        }
    } else {
        nextButton.disabled = true;
    }
}

function updateQuestion() {
    document.querySelector(".question").innerHTML = questions[currentQuestion].text;
    document.querySelector(".current").textContent = currentQuestion + 1;
    document.querySelector(".prev").disabled = currentQuestion === 0;
    document.querySelector(".next").disabled = true;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateQuestion();
    }
}

if (currentQuestion === questions.length - 1) {
    stopTimer();
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateQuestion();
    startTimer();

    document.querySelector(".next").addEventListener("click", nextQuestion);
    document.querySelector(".prev").addEventListener("click", prevQuestion);
});
