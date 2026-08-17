(function () {
    // user data
    const script = document.currentScript;
    const userId = script?.dataset.userId;

    // Auto-detect environment based on where this script is hosted
    const scriptSrc = script?.src || "";
    const isLocal =
        scriptSrc.includes("localhost") || scriptSrc.includes("127.0.0.1");

    const BASE_URL = isLocal
        ? "http://localhost:5173"
        : "https://nayraai.onrender.com";

    const API_URL = isLocal
        ? "http://localhost:8000"
        : "https://nayraaiserver.onrender.com";

    const theme = "dark";
    let assistantConfig = null;

    // load css
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${BASE_URL}/assistant.css`;
    document.head.appendChild(link);

    // create popup
    const popup = document.createElement("div");
    popup.className = `nayra-popup theme-${theme}`;
    popup.style.display = "none";

    popup.innerHTML = `
    <div class="nayra-overlay"></div> 
    <div class="nayra-content">

        <div class="nayra-top">
        
            <div class="nayra-orb-wrap">
            
                <div class="nayra-orb-glow"></div>
                <div class="nayra-orb"></div>
            
            </div>
            <h2 class="nayra-title">Hello I'm Shifra AI</h2>
            <p class="nayra-sub">
                Your smart voice assistant. <br/>
                Ask anything about this website.
            </p>

            <div class="nayra-status">Tap button to Speak</div>

            <div class="nayra-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <!-- User Text -->
                <div class="nayra-user-text"></div>

            <!-- Assistant Text -->
                <div class="nayra-ai-text"></div>

        </div>

        <div class="nayra-bottom">
        
            <button class="nayra-mic">
                <img src="${BASE_URL}/mic.svg" alt="mic" class="nayra-mic-icon" />
            </button>
        
        </div>

    </div>
    `;

    document.body.appendChild(popup);

    // floating button
    const button = document.createElement("button");
    button.className = `nayra-btn theme-${theme}`;
    button.style.opacity = "0";
    button.style.transition = "opacity 0.3s ease";
    button.innerHTML = `
<img src="${BASE_URL}/logo.svg" alt="logo" /> 
`;

    document.body.appendChild(button);

    // toggle popup
    let open = false;
    button.onclick = () => {
        open = !open;
        popup.style.display = open ? "flex" : "none";
    };

    // load Assistant
    const loadAssistant = async () => {
        try {
            const res = await fetch(
                `${API_URL}/api/assistant/config/${userId}`,
            );
            const data = await res.json();
            if (data) {
                assistantConfig = data.user;
                applyConfig();
            }
        } catch (error) {
            console.log("Assistant load error : ", error);
            button.style.opacity = "1"; // fallback: default logo dikhao agar config load na ho
        }
    };

    const applyConfig = () => {
        if (!assistantConfig) return;

        popup.className = `nayra-popup theme-${assistantConfig.theme}`;

        button.className = `nayra-btn theme-${assistantConfig.theme}`;

        const title = popup.querySelector(".nayra-title");
        title.innerHTML = `Hello I'm ${assistantConfig.assistantName}`;

        const subTitle = popup.querySelector(".nayra-sub");
        subTitle.innerHTML = `Welcome to ${assistantConfig.businessName}. <br/> Ask anything about this website.`;

        // Apply custom logo if available (Pro feature)
        if (assistantConfig.customLogoUrl) {
            const btnImg = button.querySelector("img");
            if (btnImg) {
                btnImg.src = assistantConfig.customLogoUrl;
            }
        }

        button.style.opacity = "1";
    };
    loadAssistant();

    // Elements
    const status = popup.querySelector(".nayra-status");
    const wave = popup.querySelector(".nayra-wave");
    const userText = popup.querySelector(".nayra-user-text");
    const aiText = popup.querySelector(".nayra-ai-text");
    const mic = popup.querySelector(".nayra-mic");

    // text-to-speech
    const speak = (text) => {
        window.speechSynthesis.cancel();

        // Show AI response
        aiText.innerText = text;
        status.innerText = "AI Speaking...";
        const speech = new SpeechSynthesisUtterance(text);

        speech.lang = "hi-IN";
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        // Voice end
        speech.onend = () => {
            status.innerText = "Tap button to Speak";
            wave.style.opacity = "0";
        };

        // Start speaking
        window.speechSynthesis.speak(speech);
    };

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        mic.onclick = () => {
            wave.style.opacity = 1;
            status.innerText = "Listening...";
            userText.innerText = "";
            aiText.innerText = "";

            try {
                recognition.start();
            } catch (e) {
                console.log("Recognition already running:", e);
            }
        };
        // recognition.start();

        recognition.onresult = (e) => {
            console.log(e);
            const text = e.results[0][0].transcript;
            userText.innerText = "You : " + text;
            recognition.stop();

            setTimeout(async () => {
                try {
                    status.innerText = "Thinking...";
                    const res = await fetch(`${API_URL}/api/assistant/ask`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            message: text,
                            userId,
                        }),
                    });

                    const data = await res.json();
                    console.log(data);

                    if (data.success) {
                        if (data.action === "navigate") {
                            speak(data.response);
                            setTimeout(() => {
                                window.location.href = data.path;
                            }, 2000);
                        } else {
                            speak(data.aiResponse);
                        }
                    } else {
                        speak("Response Error Check AI Assistant");
                    }
                } catch (error) {
                    console.log(error);
                    speak("Server Error");
                }
            }, 600);
        };

        recognition.onerror = () => {
            status.innerText = "Tap button to Speak";
            wave.style.opacity = "0";
        };
    } else {
        status.innerText = "Speech Recognition not supported";
    }
})();
