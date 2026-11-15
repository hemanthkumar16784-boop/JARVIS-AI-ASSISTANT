
const startBtn = document.getElementById("startBtn");
const status = document.getElementById("status");
const output = document.getElementById("output");

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-IN";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    startBtn.addEventListener("click", () => {
        status.textContent = "LISTENING...";
        output.textContent = "Listening to you, Sir...";
        recognition.start();
    });

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();

        output.textContent = "You said: " + command;

        if (command.includes("hello")) {
            speak("Hello Sir. Jarvis is online.");
        }
        else if (command.includes("time")) {
            const time = new Date().toLocaleTimeString();
            speak("The time is " + time);
        }
        else if (command.includes("date")) {
            const date = new Date().toDateString();
            speak("Today's date is " + date);
        }
        else if (command.includes("who are you")) {
            speak("I am Jarvis, your personal voice assistant.");
        }
        else if (command.includes("search")) {
            speak("Opening Google search.");
            window.open(
                "https://www.google.com/search?q=" +
                encodeURIComponent(command.replace("search", "")),
                "_blank"
            );
        }
        else {
            speak("Sorry Sir. I did not understand.");
        }

        status.textContent = "SYSTEM ONLINE";
    };

    recognition.onerror = () => {
        status.textContent = "VOICE ERROR";
        output.textContent = "Please try again.";
    };

    recognition.onend = () => {
        status.textContent = "SYSTEM ONLINE";
    };

} else {
    status.textContent = "VOICE NOT SUPPORTED";
    output.textContent = "Try a supported browser.";
}
