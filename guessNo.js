let secretNumber;
let attemptsLeft;
let maxNumber = 10; // fixed max number

function setDifficulty() {
    const difficulty = document.getElementById("difficulty").value;

    if (difficulty === "easy") {
        attemptsLeft = 5;
    } 
    else if (difficulty === "normal") {
        attemptsLeft = 3;
    } 
    else if (difficulty === "hard") {
        attemptsLeft = 1;
    }

    // Always generate 1–10 only
    secretNumber = Math.floor(Math.random() * 10) + 1;

    document.getElementById("attempts").textContent =
        "Attempts left: " + attemptsLeft;

    document.getElementById("message").textContent = "";
}

setDifficulty();

function checkGuess() {
    const guess = Number(document.getElementById("guess").value);
    const message = document.getElementById("message");

    if (guess > 10) {
        message.textContent = "❗ The maximum number you can enter is 10.";
        message.style.color = "red";
        return;
    }

    if (attemptsLeft <= 0) {
        message.textContent = "No attempts left! Reset to play again.";
        message.style.color = "red";
        return;
    }

    if (guess === secretNumber) {
        message.textContent = "🎉 Correct! You guessed it!";
        message.style.color = "lightgreen";
        attemptsLeft = 0;
    } 
    else if (guess < secretNumber) {
        message.textContent = "Too low!";
        message.style.color = "orange";
        attemptsLeft--;
    } 
    else {
        message.textContent = "Too high!";
        message.style.color = "orange";
        attemptsLeft--;
    }

    document.getElementById("attempts").textContent =
        "Attempts left: " + attemptsLeft;

    if (attemptsLeft === 0 && guess !== secretNumber) {
        message.textContent =
            "❌ Game Over! The number was " + secretNumber;
        message.style.color = "red";
    }
}

function resetGame() {
    document.getElementById("guess").value = "";
    document.getElementById("message").textContent = "";
    setDifficulty(); // resets attempts + generates new number
}
