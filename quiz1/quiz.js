const quizData = [
    {
        question: "What percentage of Earth's surface is covered by water?",
        options: ["50%", "70%", "85%", "90%"],
        answer: "70%",
        background: "quizimg1.jpeg" // Ensure this file exists in the `images` folder
    },
    {
        question: "Which of the following is a major cause of water scarcity?",
        options: ["Overconsumption", "Pollution", "Climate change", "All of the above"],
        answer: "All of the above",
        background: "quizimg2.jpeg" // Ensure this file exists in the `images` folder
    },
    {
        question: "What is desalination?",
        options: ["Purification of water", "Conversion of seawater into freshwater", "Water filtration", "Water recycling"],
        answer: "Conversion of seawater into freshwater",
        background: "quizimg3.jpeg" // Ensure this file exists in the `images` folder
    }
];

let currentQuestion = 0;
let score = 0;
let userName = "";

// HTML Element References
const userDetailsContainer = document.getElementById("user-details-container");
const userForm = document.getElementById("user-form");
const userNameInput = document.getElementById("user-name");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("quiz-question");
const optionsContainer = document.getElementById("quiz-options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreDisplay = document.getElementById("score-display");
const totalQuestionsDisplay = document.getElementById("total-questions");
const userNameDisplay = document.getElementById("user-name-display");
const downloadButton = document.getElementById("download-btn");
// Start the quiz
userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    userName = userNameInput.value.trim();
    if (userName) {
        userDetailsContainer.style.display = "none";
        quizContainer.style.display = "block";
        loadQuestion();
    }
});
function loadQuestion() {
    const currentData = quizData[currentQuestion];
    
    // Update question text
    document.querySelector(".question-text").textContent = currentData.question;

    // Update background image
    document.querySelector(".background-image").src = currentData.background;

    // Clear and populate options
    optionsContainer.innerHTML = "";
    currentData.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => {
            if (option === currentData.answer) {
                score++;
            }
            setTimeout(() => nextButton.click(), 500);
        };
        optionsContainer.appendChild(button);
    });
}
nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});
function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    userNameDisplay.textContent = userName;
    scoreDisplay.textContent = score;
    totalQuestionsDisplay.textContent = quizData.length;

    downloadButton.style.display = "inline-block";
}
downloadButton.addEventListener("click", () => {
    // Import jsPDF from the global window object
    const { jsPDF } = window.jspdf; 

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add text to the PDF
    doc.setFontSize(20);
    doc.text('Water Conservation Quiz Certificate', 20, 30);
    doc.setFontSize(16);
    doc.text(`Congratulations, ${userName}!`, 20, 50);
    doc.text(`You scored ${score} out of ${quizData.length}.`, 20, 70);
    doc.text('Issued by Hydro Hub', 20, 90);

    // Save the PDF
    doc.save('certificate.pdf');
});
