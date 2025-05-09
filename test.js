let timeElapsed = localStorage.getItem("quizTimer") ? parseInt(localStorage.getItem("quizTimer")) : 0;
let timerInterval;
let currentQuestion = 0;

// 題庫
const questions = [
    { text: "I ___ a student. (is/am/are)", answer: "am" },
    { text: "She ___ my best friend. (is/am/are)", answer: "is" },
    { text: "We ___ happy today. (is/am/are)", answer: "are" }
];

// 啟動計時器
function updateTimer() {
    let minutes = Math.floor(timeElapsed / 60);
    let seconds = timeElapsed % 60;
    document.getElementById("time").textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timeElapsed++;
    localStorage.setItem("quizTimer", timeElapsed);
}

function startTimer() {
    updateTimer();
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    localStorage.removeItem("quizTimer");
}

// 檢查答案
function checkAnswer(input) {
    const correctAnswer = questions[currentQuestion].answer;
    let userAnswer = input.value.toLowerCase().trim();
    const nextButton = document.querySelector(".next");

    if (userAnswer) {
        nextButton.disabled = false;
        if (userAnswer === correctAnswer) {
            input.classList.add("correct");
            input.classList.remove("incorrect");
        } else {
            input.classList.add("incorrect");
            input.classList.remove("correct");
        }
    } else {
        nextButton.disabled = true;
    }
}

// 更新題目
function updateQuestion() {
    document.getElementById("questionText").textContent = questions[currentQuestion].text;
    document.getElementById("currentQuestion").textContent = currentQuestion + 1;
    document.getElementById("totalQuestions").textContent = questions.length;
    
    document.querySelector(".prev").disabled = currentQuestion === 0;
    document.querySelector(".next").disabled = true;

    document.querySelector(".answer-input").value = "";
    document.querySelector(".answer-input").classList.remove("correct", "incorrect");
}

// 下一題
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateQuestion();
    }
    if (currentQuestion === questions.length - 1) {
        stopTimer();
    }
}

// 上一題
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
    }
}

// 初始化測驗
document.addEventListener("DOMContentLoaded", () => {
    updateQuestion();
    startTimer();
});
