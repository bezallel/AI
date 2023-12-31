document.addEventListener("DOMContentLoaded", function () {
    const naviButton = document.querySelector(".navi-button");
    const userInput = document.getElementById("textInput");

    // Define the trigger words
    const triggerWords = [
        "sentences", "sentence", "sent", "senten", "sentence structure",
        "more sentences", "more sentence", "sentences", "structure",
        "expression", "expressions", "more expressions", "express", "exp",
        "press", "show me expressions", "teach me expressions", "express positive",
        "show me all expressions", "more expressions", "more expression",
        "traits", "trait", "rait", "tait", "tate", "rate", "positive traits",
        "more traits", "more trait", "show me traits", "teach me traits",
        "trait positive", "show me traits", "action", "more action", "more actions",
        "action", "act", "acts", "actions", "show me action", "pleasantries",
        "pleasantry", "more pleasantries", "pleasant", "plea", "ple", "pleasantries",
        "pleasant", "teach pleasantries", "positive pleasantries", "show me positive pleasantries",
        "teach me pleasantries", "pleasantries positive", "show me positive pleasantries",
        "nigerian facts", "facts", "fas", "fat", "fats", "fact", "slang facts",
        "urban facts", "more facts"
    ];

    let userTypedTriggerWord = false;
    let lastTypedTriggerWord = "";

    // Function to send a message and simulate user interaction
    function sendAndSimulateUserInteraction(message) {
        // Simulate user typing the message
        userInput.value = message;
        
        // Trigger the Enter key press event
        const event = new KeyboardEvent("keydown", {
            key: "Enter",
            keyCode: 13,
            bubbles: true,
            cancelable: true,
        });

        userInput.dispatchEvent(event);
    }

    // Add an input event listener to the chat input for real-time checking
    userInput.addEventListener("input", function () {
        const userMessage = userInput.value.trim().toLowerCase();

        // Check if the user's message matches any trigger words
        if (triggerWords.includes(userMessage)) {
            userTypedTriggerWord = true;
            lastTypedTriggerWord = userMessage;
        } else {
            userTypedTriggerWord = false;
        }
    });

    // Add a keydown event listener to the chat input to handle Enter key
    userInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            if (userTypedTriggerWord) {
                naviButton.style.display = "block"; // Display the navi button
            } else {
                naviButton.style.display = "none"; // Hide the navi button
            }
        }
    });

    // Add a click event listener to the navi button
    naviButton.addEventListener("click", function () {
        if (lastTypedTriggerWord !== "") {
            // Resend the last trigger word and simulate user interaction
            sendAndSimulateUserInteraction(lastTypedTriggerWord);
        }
    });

    function sendMessage(message) {
        // You can replace this with your logic to handle sending the message
        // For this example, we'll just log the message to the console
        console.log("User Message Sent:", message);
    }

    function sendAndReceiveData(userMessage) {
        // Function to handle sending the user message (including trigger words) to the server
        // and updating the UI with the response
        fetch(`/get?msg=${userMessage}`)
            .then((response) => response.text())
            .then((data) => {
                appendBotMessage(data);

                // Add animation or other UI updates as needed
                naviButton.classList.add("animated-icon");

                setTimeout(() => {
                    naviButton.classList.remove("animated-icon");
                }, 1000);
            });
    }

    function appendBotMessage(message) {
        // Function to append the bot's response to the chat interface
        // Implement your logic here to display the response
        console.log("Bot Message:", message);
    }
});

// Function to handle quiz-related phrases and redirect to the quiz section
function goToQuizSection() {
    // You can define the list of phrases that trigger the quiz section navigation
    const quizPhrases = [
        "quiz", "start quiz", "start", "begin quiz", "go to quiz", "quiz me",
        "test me", "test", "take test", "take quiz", "have quiz", "knowledge check", "oya start quiz",
        "carry me go quiz", "open quiz"
    ];

    const userText = textInput.value.trim().toLowerCase();

    if (quizPhrases.includes(userText)) {
        // Redirect to the quiz section URL (use the correct relative URL)
        window.location.href = 'quiz.html'; // Replace with the correct relative URL to quiz.html
    }
}

// Add an event listener to execute goToQuizSection when the user presses Enter
textInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        goToQuizSection();
    }
});

