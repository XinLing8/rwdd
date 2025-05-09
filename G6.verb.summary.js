document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("quizTimer");
    let correctAnswers = parseInt(localStorage.getItem("correctAnswers")) || 0;
    let totalQuestions = 3; // Adjust as needed
    let timeElapsed = parseInt(localStorage.getItem("quizTimer")) || 0;

    let minutes = Math.floor(timeElapsed / 60);
    let seconds = timeElapsed % 60;
    let formattedTime = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    document.getElementById("scoreDisplay").textContent = `${correctAnswers} / ${totalQuestions}`;
    document.querySelector(".stat-value").textContent = formattedTime;

    // Retrieve user answers
    let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];

    // Generate question review section
    const reviewSection = document.getElementById("questionsReview");
    reviewSection.innerHTML = '<h3 style="color: #6B4E8B;">Question Overview:</h3>';

    for (let i = 0; i < totalQuestions; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question-item";
        questionDiv.onclick = () => viewQuestion(i + 1);

        let statusIcon = userAnswers[i] ? "✔️" : "❌";
        questionDiv.innerHTML = `
            <span class="question-status">${statusIcon}</span>
            <span>Question ${i + 1}</span>
        `;
        reviewSection.appendChild(questionDiv);
    }

    localStorage.setItem("lastQuizScore", correctAnswers);
    localStorage.setItem("lastQuizTime", formattedTime);

    localStorage.removeItem("correctAnswers");
    localStorage.removeItem("userAnswers");
});

// Retake Quiz
function retakeQuiz() {
    localStorage.clear();
    localStorage.setItem("quizStartTime", new Date().getTime());
    window.location.href = "Q.ReadyMenu.G6.verb.html";
}

// Toggle Question Review Section
function toggleQuestions() {
    const reviewSection = document.getElementById("questionsReview");
    reviewSection.style.display = reviewSection.style.display === "none" ? "block" : "none";
}

// View Individual Question
function viewQuestion(questionNumber) {
    window.location.href = `question${questionNumber}_review.html`;
}
