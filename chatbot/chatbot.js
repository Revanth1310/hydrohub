// chatbot.js
const qaData = [
  {
    "question":"hi",
    "answer":"hello"
  },
    {
        "question": "What traditional structure is used in Rajasthan for rainwater harvesting and groundwater recharge?",
        "answer": "Johads (Check Dams) are used in Rajasthan for rainwater harvesting and groundwater recharge."
      },
      {
        "question": "Which irrigation methods are promoted in Rajasthan to minimize water wastage?",
        "answer": "Drip and sprinkler irrigation systems are promoted in Rajasthan to minimize water wastage."
      },
      {
        "question": "What type of crops are farmers in Rajasthan adopting to save water?",
        "answer": "Farmers in Rajasthan are adopting drought-resistant crops such as millet to save water."
      },
      {
        "question": "What mandatory water conservation practice has been implemented in Chennai, Tamil Nadu?",
        "answer": "Rainwater harvesting has been made mandatory for all buildings in Chennai, Tamil Nadu."
      },
      {
        "question": "How does Tamil Nadu address water demand in coastal cities?",
        "answer": "Tamil Nadu has set up desalination plants to convert seawater into potable water to address water demand in coastal cities."
      },
      {
        "question": "What is the focus of Maharashtra's watershed development programs?",
        "answer": "Maharashtra's watershed development programs focus on building check dams and reservoirs to collect and store rainwater, improving groundwater levels."
      },
      {
        "question": "Which initiative in Maharashtra aims to increase water availability by capturing runoff rainwater?",
        "answer": "The 'Water for All' initiative aims to increase water availability by capturing runoff rainwater in Maharashtra."
      },
      {
        "question": "What project in Gujarat focuses on constructing water storage structures such as check dams and farm ponds?",
        "answer": "The Sujalam Sufalam Yojana focuses on constructing water storage structures such as check dams and farm ponds in Gujarat."
      },
      {
        "question": "What ancient water management system is used in Karnataka?",
        "answer": "The Karez system, an ancient subterranean water channel system, is used in parts of Karnataka."
      },
      {
        "question": "Which scheme in Karnataka focuses on groundwater recharge and enhancing the storage capacity of tanks and ponds?",
        "answer": "The Jalamrutha Scheme focuses on groundwater recharge and enhancing the storage capacity of tanks and ponds in Karnataka."
      },
      {
        "question": "What water-efficient agricultural method is being used in Andhra Pradesh for rice cultivation?",
        "answer": "The System of Rice Intensification (SRI) is being used in Andhra Pradesh for water-efficient rice cultivation."
      },
      {
        "question": "Which department oversees groundwater recharge programs in Andhra Pradesh?",
        "answer": "The Andhra Pradesh State Groundwater Department oversees groundwater recharge programs in the state."
      },
      {
        "question": "What modern technology is Gujarat using to convert seawater into fresh water?",
        "answer": "Gujarat is using desalination plants to convert seawater into fresh water."
      },
      {
        "question": "Which association in Rajasthan is responsible for sustainable water resource management?",
        "answer": "The Rajasthan Water Resources Department is responsible for sustainable water resource management in the state."
      },
      {
        "question": "What role does the Tamil Nadu Water Supply and Drainage Board (TWAD) play?",
        "answer": "The Tamil Nadu Water Supply and Drainage Board oversees water supply, sewerage, and rainwater harvesting projects across Tamil Nadu."
      },
      {
        "question": "Which body in Maharashtra focuses on sustainable groundwater management?",
        "answer": "The Maharashtra State Groundwater Development Corporation focuses on sustainable groundwater management in the state."
      },
      {
        "question": "What does the Karnataka State Natural Disaster Monitoring Centre (KSNDMC) monitor?",
        "answer": "The Karnataka State Natural Disaster Monitoring Centre monitors water levels, rainfall patterns, and manages resources during droughts and water shortages."
      },
      {
        "question": "How are you today?",
        "answer": "I'm doing great! How can I assist you today?"
      },
      {
        "question": "What is your name?",
        "answer": "I am your assistant, here to help with your queries."
      },
      {
        "question": "How can I thank you for your help?",
        "answer": "Your kind words are enough, but you are always welcome!"
      },
      {
        "question": "Can I reach out to you again later?",
        "answer": "Absolutely! Feel free to reach out whenever you need help."
      },
      {
        "question": "Goodbye!",
        "answer": "Goodbye! Have a great day ahead."
      }
];

// Elements
const chatMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.querySelector('.chatbot-container');
const closeChat = document.getElementById('close-chat');

// Functions
function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function findAnswer(question) {
    
    const found = qaData.find(qa => question.toLowerCase().includes(qa.question.toLowerCase()));
    return found ? found.answer : "I'm sorry, I didn't understand that. Could you rephrase?";
}

function handleSend() {
    const userText = userInput.value.trim();
    if (userText) {
        appendMessage('user', userText);
        const botReply = findAnswer(userText);
        setTimeout(() => appendMessage('bot', botReply), 500);
        userInput.value = '';
    }
}

// Event Listeners
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});

chatToggle.addEventListener('click', () => {
  chatContainer.style.display = "flex";
  chatToggle.style.display = "none";
});

closeChat.addEventListener('click', () => {
  chatContainer.style.display = "none";
  chatToggle.style.display = "block";
});
