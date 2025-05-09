document.addEventListener("DOMContentLoaded", () => {
    // Get the final time from localStorage
    let timeElapsed = parseInt(localStorage.getItem("quizTimer")) || 0;
    let correctAnswers = parseInt(localStorage.getItem("correctAnswers")) || 0;
    let totalQuestions = 3;

    // Format time for display
    let minutes = Math.floor(timeElapsed / 60);
    let seconds = timeElapsed % 60;
    let formattedTime = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    // Update the display
    document.getElementById("scoreDisplay").textContent = `${correctAnswers} / ${totalQuestions}`;
    
    // Make sure this matches your HTML element for time display
    const timeDisplay = document.querySelector(".stat-value");
    if (timeDisplay) {
        timeDisplay.textContent = formattedTime;
        console.log("Time set to:", formattedTime); // Debug log
    } else {
        console.error("Time display element not found"); // Debug log
    }

    // Log the values for debugging
    console.log("Time elapsed:", timeElapsed);
    console.log("Formatted time:", formattedTime);
    console.log("Correct answers:", correctAnswers);

    // Generate question review section
    const reviewSection = document.getElementById("questionsReview");
    reviewSection.innerHTML = '<h3 style="color: #6B4E8B;">Question Overview:</h3>';

    for (let i = 0; i < totalQuestions; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question-item";
        questionDiv.onclick = () => viewQuestion(i + 1);

        let statusIcon = "❌";
        if (i < correctAnswers) {
            statusIcon = "✔️";
        }
        
        questionDiv.innerHTML = `
            <span class="question-status">${statusIcon}</span>
            <span>Question ${i + 1}</span>
        `;
        reviewSection.appendChild(questionDiv);
    }

    // Clear the timer and store the results
    localStorage.setItem("lastQuizScore", correctAnswers);
    localStorage.setItem("lastQuizTime", formattedTime);
    localStorage.removeItem("quizTimer");
    localStorage.removeItem("correctAnswers");
});

// Retake Quiz function
function retakeQuiz() {
    localStorage.removeItem("quizTimer");
    localStorage.removeItem("correctAnswers");
    window.location.href = "Q.ReadyMenu.G2.grammar.html";
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
