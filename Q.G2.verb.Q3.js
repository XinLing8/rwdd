function checkCompletion() {
    const totalMatches = Object.keys(correctMatches).length;
    const correctCount = document.querySelectorAll('.matching-box.correct').length / 1;
    if (correctCount === totalMatches) {
        document.querySelector('.nav-button.finish').disabled = false;
    }
}


// Timer Variables
let timeElapsed = localStorage.getItem("quizTimer") ? parseInt(localStorage.getItem("quizTimer")) : 0;
let correctAnswers = localStorage.getItem("correctAnswers") ? parseInt(localStorage.getItem("correctAnswers")) : 0;
let timerInterval;

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
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    startTimer();
});

// Matching Logic
let selectedBox = null;
const correctMatches = {
    'blank1': 'walk',
    'blank2': 'walked'
};

document.querySelectorAll('.matching-box').forEach(box => {
    box.addEventListener('click', () => {
        if (box.classList.contains('correct') || box.classList.contains('incorrect')) {
            return;
        }
        
        if (!selectedBox) {
            if (box.dataset.type === 'subject') {
                selectedBox = box;
                box.classList.add('selected');
            }
        } else {
            if (box.dataset.type === 'verb') {
                const subject = selectedBox.dataset.value;
                const verb = box.dataset.value;

                const isCorrect = correctMatches[subject] === verb;
                const matchClass = isCorrect ? 'correct' : 'incorrect';

                selectedBox.classList.remove('selected');
                selectedBox.classList.add(matchClass);
                box.classList.add(matchClass);

                if (isCorrect) {
                    correctAnswers++;
                    localStorage.setItem("correctAnswers", correctAnswers);
                }

                selectedBox = null;
                checkCompletion();
            }
        }
    });
});

function finishQuiz() {
    localStorage.removeItem("quizTimer");
    window.location.href = "G2.verb.summary.html";
}
