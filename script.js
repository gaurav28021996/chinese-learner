// script.js (Secure Version)

// 1. Get references to our HTML elements
const chineseWordEl = document.getElementById('chinese-word');
const pinyinEl = document.getElementById('pinyin');
const translationEl = document.getElementById('translation');
const cardAnswerEl = document.getElementById('card-answer');
const revealBtn = document.getElementById('reveal-btn');
const nextBtn = document.getElementById('next-btn');
const wordImageEl = document.getElementById('word-image');
const loadingTextEl = document.getElementById('loading-message');

// 2. Keep track of the current state
let currentWordIndex = 0;

// 3. Function to fetch image by calling our own secure serverless function
async function fetchImage(searchTerm) {
    // Reset the view for the new image
    wordImageEl.style.display = 'none';
    wordImageEl.src = ''; // Clear previous image
    loadingTextEl.textContent = 'Loading image...';
    loadingTextEl.style.display = 'block';

    // This URL points to our serverless function. Netlify makes it available here.
    const url = `/.netlify/functions/getImage?q=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Server function returned an error: ${response.statusText}`);
        }
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            wordImageEl.src = data.items[0].link; // Get the URL of the first image
            wordImageEl.style.display = 'block';
            loadingTextEl.style.display = 'none';
        } else {
            throw new Error('No images found for this term');
        }
    } catch (error) {
        console.error("Failed to fetch image:", error);
        loadingTextEl.textContent = 'Image not found.';
    }
}

// 4. Function to load a word onto the card
function loadWord() {
    const currentWord = words[currentWordIndex];

    // Update text content
    chineseWordEl.textContent = currentWord.character;
    pinyinEl.textContent = currentWord.pinyin;
    translationEl.textContent = currentWord.translation;

    // Reset the card view
    cardAnswerEl.style.display = 'none';
    chineseWordEl.style.display = 'block';
    revealBtn.disabled = false;
}

// 5. Function to show the answer
function revealAnswer() {
    cardAnswerEl.style.display = 'block';
    chineseWordEl.style.display = 'none';
    revealBtn.disabled = true;
    
    // Fetch the image only when the user reveals the card
    const currentWord = words[currentWordIndex];
    fetchImage(currentWord.search_term);
}

// 6. Function to move to the next word
function showNextWord() {
    currentWordIndex++;
    if (currentWordIndex >= words.length) {
        currentWordIndex = 0; // Loop back to the start
    }
    loadWord();
}

// 7. Add event listeners and load the first word
revealBtn.addEventListener('click', revealAnswer);
nextBtn.addEventListener('click', showNextWord);

loadWord();
