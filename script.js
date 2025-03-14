// Sample exercises
const exercises = [
    "Write a Python function to check if a number is prime.",
    "Write a Python program to reverse a string.",
    "Write a Python function to find the factorial of a number."
];

let submitted = false; // To prevent multiple submissions

// Get elements
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const subscriptionInput = document.getElementById("subscriptionNumber");
const groupInput = document.getElementById("group");
const exerciseText = document.getElementById("exercise");
const solutionTextArea = document.getElementById("solution");
const submitButton = document.getElementById("submit");
const goButton = document.getElementById("go");
const timerElement = document.getElementById("timer");

let timeLeft = 15 * 60; // 15 minutes
let timer;

// Enable exercise only after clicking "Go"
goButton.addEventListener("click", function() {
    if (firstNameInput.value.trim() === "" || 
        lastNameInput.value.trim() === "" || 
        subscriptionInput.value.trim() === "" || 
        groupInput.value.trim() === "") {
        alert("Please fill in all details before proceeding.");
        return;
    }

    // Select a random exercise
    exerciseText.textContent = exercises[Math.floor(Math.random() * exercises.length)];

    // Enable textarea and submit button
    solutionTextArea.disabled = false;
    submitButton.disabled = false;

    // Start the timer
    timer = setInterval(updateTimer, 1000);
});

// Timer function
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    if (timeLeft <= 0) {
        clearInterval(timer);
        submitSolution(); // Auto-submit when time is up
    }
    
    timeLeft--;
}

// Submit function
function submitSolution() {
    if (submitted) return; // Prevent multiple submissions

    submitButton.disabled = true;
    solutionTextArea.disabled = true;
    submitted = true;

    // Stop the timer
    clearInterval(timer);
    timerElement.textContent = "Time is up! Solution submitted.";

    let firstName = firstNameInput.value.trim();
    let lastName = lastNameInput.value.trim();
    let group = groupInput.value.trim();
    let solution = solutionTextArea.value.trim();

    if (!solution) {
        alert("Solution cannot be empty.");
        return;
    }

    let data = {
        firstName,
        lastName,
        group,
        solution
    };

    fetch("https://script.google.com/macros/s/AKfycbxKCCejxpP1XeUbmOBJEW0P9a_Ma__YSa_9MhVQgpzrQ7UfkqhGAVXSe9Iw7K_I1w4f/exec", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        group: document.getElementById("group").value.trim(),
        solution: document.getElementById("solution").value.trim()
    })
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        alert("Error: " + data.error);
    } else {
        alert("Solution submitted successfully!");
    }
})
.catch(error => {
    console.error("Fetch error:", error);
    alert("Error submitting solution.");
});
