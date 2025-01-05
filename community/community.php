<?php
session_start();

// Database connection
$host = 'localhost';
$dbname = 'hydrohub';
$user = 'root';
$password = '';
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create table if not exists
$tableCreateQuery = 'CREATE TABLE IF NOT EXISTS community_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT,
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)';
if ($conn->query($tableCreateQuery) === FALSE) {
    die("<script>alert('Error creating table: " . $conn->error . "');</script>");
}

// Ensure the user is logged in
if (!isset($_SESSION['user_id'])) {
    die("<script>alert('User not logged in!');</script>");
}

$user_id = $_SESSION['user_id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $content = $_POST['post-input'];
    $profile_image = null;

    if (isset($_FILES['image-upload'])) {
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["image-upload"]["name"]);
        
        if (move_uploaded_file($_FILES["profile_image"]["tmp_name"], $target_file)) {
            $profile_image = $target_file;
        } else {
            echo "<script>alert('Error uploading file.');</script>";
            $profile_image = null; // Optional: You could exit here if image is required
        }
    }

    // Check if the user already has a post
    $checkQuery = 'SELECT * FROM community_posts WHERE user_id = ?';
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Update existing post
        $updateQuery = 'UPDATE community_posts 
                        SET content = CONCAT(content, " ", ?), image_url = ? 
                        WHERE user_id = ?';
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bind_param("ssi", $content, $profile_image, $user_id);
        
        if ($updateStmt->execute()) {
            echo "<script>alert('Post updated successfully!');</script>";
            echo"<script>window.location.href = '../community.html';</script>";
        } else {
            echo "<script>alert('Error updating post: " . $conn->error . "');</script>";
        }
    } else {
        // Insert new post
        $insertQuery = 'INSERT INTO community_posts (user_id, content, image_url) VALUES (?, ?, ?)';
        $insertStmt = $conn->prepare($insertQuery);
        $insertStmt->bind_param("iss", $user_id, $content, $profile_image);
        
        if ($insertStmt->execute()) {
            echo "<script>alert('Post added successfully!');</script>";
        } else {
            echo "<script>alert('Error adding post: " . $conn->error . "');</script>";
        }
    }

    // Close statements
    $stmt->close();
}

// Close connection
$conn->close();
?>
