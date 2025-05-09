<?php
require('config.php');
session_start();

header("Content-Type: application/json");

if (!isset($_GET['studentID']) || !is_numeric($_GET['studentID'])) {
    echo json_encode(["error" => "Invalid Student ID."]);
    exit;
}

$studentID = $_GET['studentID'];

$sql = "SELECT attemptID, studentID, attemptTimestamp, durationTaken, score, quizID FROM attempt WHERE studentID = ?";
$stmt = $con->prepare($sql);

if ($stmt) {
    $stmt->bind_param("i", $studentID); 
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $attempts = [];

        while ($row = $result->fetch_assoc()) {
            $attempts[] = [
                "attemptID" => $row["attemptID"],
                "studentID" => $row["studentID"],
                "quizID" => $row["quizID"],
                "date" => date("Y-m-d", strtotime($row["attemptTimestamp"])), // Extract date
                "time" => date("H:i:s", strtotime($row["attemptTimestamp"])), // Extract time
                "score" => $row["score"],
                "duration" => $row["durationTaken"],
                "viewLink" => "view.php?id=" . $row["attemptID"]
            ];
        }
        echo json_encode(["success" => true, "data" => $attempts]);
    } else {
        echo json_encode(["success" => false, "message" => "No records found for Student ID: " . htmlspecialchars($studentID)]);
    }
} else {
    echo json_encode(["error" => "Query preparation failed: " . $con->error]);
}

$con->close();
?>
