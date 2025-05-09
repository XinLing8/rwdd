<?php
session_start();
require('config.php');

$quizID = intval($_GET['quizID']);
$studentID = intval($_GET['studentID']);

if (!isset($_SESSION['attemptID'])) {
    $_SESSION['attemptID'] = uniqid();
    $_SESSION['startTime'] = time();
    $_SESSION['score'] = 0;
    $_SESSION['questionNumber'] = 1;

    $stmt = $con->prepare("
        INSERT INTO attempt (attemptID, quizID, studentID, attemptTimestamp) 
        VALUES (?, ?, ?, NOW())
    ");
    $stmt->bind_param("sii", $_SESSION['attemptID'], $quizID, $studentID);
    $stmt->execute();
}

$questionNumber = $_SESSION['questionNumber'];
$stmt = $con->prepare("
    SELECT questionID, questionText, answer 
    FROM questions 
    WHERE quizID = ? AND questionID = ?
");
$stmt->bind_param("ii", $quizID, $questionNumber);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $questionID = $row['questionID'];
    $questionText = $row['questionText'];
    $correctAnswer = strtolower(trim($row['answer']));
} else {
    $endTime = time();
    $duration = $endTime - $_SESSION['startTime'];
    $score = $_SESSION['score'];

    $stmt = $con->prepare("
        UPDATE attempt 
        SET score = ?, durationTaken = ? 
        WHERE attemptID = ?
    ");
    $stmt->bind_param("iis", $score, $duration, $_SESSION['attemptID']);
    $stmt->execute();

    echo "<h1>Quiz Completed!</h1>";
    echo "<p>Your final score: $score</p>";
    session_destroy();
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $studentAnswer = strtolower(trim($_POST['answer']));
    $isCorrect = ($studentAnswer === $correctAnswer) ? 1 : 0;

    $stmt = $con->prepare("
        INSERT INTO summary (attemptID, questionID, studentAnswer, isCorrect) 
        VALUES (?, ?, ?, ?)
    ");
    $stmt->bind_param("sisi", $_SESSION['attemptID'], $questionID, $studentAnswer, $isCorrect);
    $stmt->execute();

    if ($isCorrect) {
        $_SESSION['score'] += 1;
    }

    $_SESSION['questionNumber']++;
    header("Location: " . $_SERVER['PHP_SELF'] . "?quizID=$quizID&studentID=$studentID");
    exit();
}
?>
