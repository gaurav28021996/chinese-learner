// script.js

// 1. Get references to our HTML elements
const chineseWordEl = document.getElementById('chinese-word');
const pinyinEl = document.getElementById('pinyin');
const translationEl = document.getElementById('translation');
const cardAnswerEl = document.getElementById('card-answer');
const revealBtn = document.getElementById('reveal-btn');
const nextBtn = document.getElementById('next-btn');

// 2. Keep track of the current word
let currentWordIndex = 0;

// 3. Function to load a word onto the card
function loadWord() {
    // Get the current word object from our 'words' array (from words.js)
    const currentWord = words[currentWordIndex];

    // Update the HTML content
    chineseWordEl.textContent = currentWord.character;
    pinyinEl.textContent = currentWord.pinyin;
    translationEl.textContent = currentWord.translation;

    // Reset the view: hide the answer
    cardAnswerEl.style.display = 'none';
    chineseWordEl.style.display = 'block';
    revealBtn.disabled = false; // Re-enable the reveal button
}

// 4. Function to show the answer
function revealAnswer() {
    cardAnswerEl.style.display = 'block'; // Show the answer
    chineseWordEl.style.display = 'none'; // Hide the character to make room
    revealBtn.disabled = true; // Disable the button after revealing
}

// 5. Function to move to the next word
function showNextWord() {
    // Move to the next index
    currentWordIndex++;

    // If we've reached the end of the array, loop back to the start
    if (currentWordIndex >= words.length) {
        currentWordIndex = 0;
    }

    // Load the new word
    loadWord();
}

// 6. Add event listeners to the buttons
revealBtn.addEventListener('click', revealAnswer);
nextBtn.addEventListener('click', showNextWord);

// 7. Load the very first word when the page loads
loadWord();