// Get elements
const chatbox = document.getElementById('chatbox');
const chatToggle = document.getElementById('chatbox-toggle');
const chatInput = document.getElementById('chatbox-input');
const chatSend = document.getElementById('chatbox-send');
const chatMessages = document.getElementById('chatbox-messages');

// Toggle chatbox visibility
chatToggle.addEventListener('click', () => {
    if (chatbox.style.display === 'none' || chatbox.style.display === '') {
        chatbox.style.display = 'flex'; // Show the chatbox
    } else {
        chatbox.style.display = 'none'; // Hide the chatbox
    }
});

// Send message
chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        // Create a new message element
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('message', 'sent');
        chatMessages.appendChild(messageElement);

        // Clear input
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll to the latest message

        // Simulate a bot reply (can be replaced with API or logic to generate a bot reply)
        setTimeout(() => {
            const botReply = document.createElement('div');
            botReply.textContent = 'Thank you for your message! We will get back to you soon.';
            botReply.classList.add('message', 'received');
            chatMessages.appendChild(botReply);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll
        }, 1000);
    }
});

// Style the messages
const style = document.createElement('style');
style.innerHTML = `
    .message.sent {
        background-color: #4CAF50;
        color: white;
        margin: 5px;
        padding: 8px;
        border-radius: 5px;
        text-align: right;
    }
    .message.received {
        background-color: #f1f1f1;
        color: #333;
        margin: 5px;
        padding: 8px;
        border-radius: 5px;
        text-align: left;
    }
`;
document.head.appendChild(style);
