

// Simple cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
let count = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        count++;
        cartCount.textContent = count;
        
        // Get product info
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        // Alert for demo purposes
        alert ("buy product")
    });
});

const startBtn = document.getElementById('start');
const output = document.getElementById('output');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;

startBtn.onclick = () => {
    recognition.start('');
};

recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    output.textContent = "You said: " + transcript;

    // Call AI backend (OpenAI or your own)
    const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: transcript })
    });
    const data = await response.json();
    speak(data.reply);
};

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

