// Game variables
let userScore = 0;
let computerScore = 0;
const choices = ['snake', 'water', 'gun'];

// DOM elements
const userScoreElement = document.getElementById('userScore');
const computerScoreElement = document.getElementById('computerScore');
const userChoiceElement = document.getElementById('userChoice');
const computerChoiceElement = document.getElementById('computerChoice');
const winnerElement = document.getElementById('winner');
const resetButton = document.getElementById('resetBtn');
const choiceButtons = document.querySelectorAll('.btn');

// Initialize the game
function initGame() {
    // Add event listeners to choice buttons
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userChoice = button.getAttribute('data-choice');
            playGame(userChoice);
        });
    });
    
    // Add event listener to reset button
    resetButton.addEventListener('click', resetGame);
}

// Main game logic
function playGame(userChoice) {
    // Computer makes a random choice
    const computerChoice = getComputerChoice();
    
    // Determine the winner
    const result = determineWinner(userChoice, computerChoice);
    
    // Update the UI
    updateUI(userChoice, computerChoice, result);
}

// Get computer's choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Determine the winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    }
    
    // Game rules
    if (
        (userChoice === 'snake' && computerChoice === 'water') ||
        (userChoice === 'water' && computerChoice === 'gun') ||
        (userChoice === 'gun' && computerChoice === 'snake')
    ) {
        userScore++;
        return 'user';
    } else {
        computerScore++;
        return 'computer';
    }
}

// Update the UI with the results
function updateUI(userChoice, computerChoice, result) {
    // Update choice displays
    userChoiceElement.textContent = `You chose: ${userChoice}`;
    computerChoiceElement.textContent = `Computer chose: ${computerChoice}`;
    
    // Update scores
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    
    // Display winner
    if (result === 'draw') {
        winnerElement.textContent = "It's a Draw!";
        winnerElement.style.color = '#00d4ff';
    } else if (result === 'user') {
        winnerElement.textContent = "You Win!";
        winnerElement.style.color = '#4caf50';
    } else {
        winnerElement.textContent = "Computer Wins!";
        winnerElement.style.color = '#ff004c';
    }
    
    // Trigger the pulse animation
    winnerElement.style.animation = 'none';
    setTimeout(() => {
        winnerElement.style.animation = 'pulse 0.3s ease-in-out';
    }, 10);
}

// Reset the game
function resetGame() {
    userScore = 0;
    computerScore = 0;
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    userChoiceElement.textContent = 'Make your choice!';
    computerChoiceElement.textContent = 'Computer is waiting...';
    winnerElement.textContent = '';
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);