// carousel

const maxWidth = 476;
const mediaQuery = window.matchMedia(`screen and (max-width: ${maxWidth}px)`);

if (mediaQuery.matches) {
    document.addEventListener("DOMContentLoaded", function () {
        const carouselItems = document.querySelectorAll(".carousel-item");
        const indicators = document.querySelectorAll(".carousel-indicators li");

        let currentIndex = 0;

        function showSlide(index) {
            carouselItems[currentIndex].classList.remove("active");
            indicators[currentIndex].classList.remove("active");

            currentIndex = index;

            carouselItems[currentIndex].classList.add("active");
            indicators[currentIndex].classList.add("active");
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                showSlide(index);
            });
        });

        setInterval(() => {
            const nextIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(nextIndex);
        }, 5000);
    });
}



// toggle:

const toggleButton = document.getElementById('toggleButton');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    toggleButton.classList.toggle('dark-mode');

    const toggleText = toggleButton.querySelector('.toggle-text');
    toggleText.textContent = body.classList.contains('dark-mode') ? 'DARKMODE' : 'DAYMODE';
});



// scroll

function myFunction() {
    document.documentElement.style.scrollBehavior = "smooth";
}

function slowScroll(id) {
    let offset = 0;
    $("html, body").animate({
        scrollTop: $(id).offset().top - offset,
    });
    return false;
}

// search

const input = document.querySelector('.input_search');
const hiddenVars = document.querySelector('.hidden_vars');
const buttons = hiddenVars.querySelectorAll('.grey_button');
const items = document.querySelectorAll('.services_we_provide__examples__item');

input.addEventListener('input', () => {
    const inputValue = input.value.toLowerCase();

    buttons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.startsWith(inputValue)) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    if (inputValue) {
        hiddenVars.classList.add('show');
    } else {
        hiddenVars.classList.remove('show');
    }

    items.forEach(item => {
        const headerText = item.querySelector('.header').textContent.toLowerCase();
        if (headerText.includes(inputValue)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        input.value = buttonText;
        input.dispatchEvent(new Event('input')); // Simulate input events to actualize hiding
    });
});


// show types

document.addEventListener("DOMContentLoaded", function () {
    let button = document.querySelector(".round_arrow");
    let typesbar = document.querySelector(".typesbar");

    button.addEventListener("click", function () {
        typesbar.classList.toggle("show");
    });
});


// show occupations

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".down_arrow");
    var typesbar = document.querySelector(".hidden_vars");
    var input = document.querySelector(".input_search");
    var occupationAllButton = document.querySelector("#occupation_all");
    var items = document.querySelectorAll(".services_we_provide__examples__item");
    var buttons = document.querySelectorAll(".grey_button");

    button.addEventListener("click", function () {
        typesbar.classList.toggle("show");
    });

    occupationAllButton.addEventListener("click", function () {
        input.value = "";


        buttons.forEach(function (button) {
            button.style.display = "block";
        });


        typesbar.classList.remove("show");


        items.forEach(function (item) {
            item.classList.remove("hidden");
        });
    });

});



// show-block
let activeBlockId = 'swp-gold-bg';
let currentIndex = 0;

function toggleBlock(newBlockId) {
    if (activeBlockId !== newBlockId) {
        const activeBlock = document.getElementById(activeBlockId);
        activeBlock.classList.remove('active');
    }

    const newBlock = document.getElementById(newBlockId);
    newBlock.classList.add('active');
    activeBlockId = newBlockId;
}

function showBlock(index) {
    const blocks = document.querySelectorAll('.services_we_provide__examples');

    blocks.forEach((services_we_provide__examples, i) => {
        if (i === index) {
            services_we_provide__examples.style.display = 'flex';
        } else {
            services_we_provide__examples.style.display = 'none';
        }
    });

    currentIndex = index;
}

const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + blocks.length) % blocks.length;
    toggleBlock(blocks[currentIndex].id);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % blocks.length;
    toggleBlock(blocks[currentIndex].id);
});

// Initial setup
const blocks = document.querySelectorAll('.services_we_provide__examples');
toggleBlock(blocks[currentIndex].id);




// chat

const widget_button = document.getElementById('widget_button');
const chatWidget = document.getElementById('chat-widget');

widget_button.addEventListener('click', () => {
    chatWidget.classList.toggle('show');
    widget_button.classList.toggle('pulse');
});


document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");

    const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
    const TELEGRAM_CHAT_ID = "YOUR_TELEGRAM_CHAT_ID";

    function displayMessage(message, isUser = false) {
        const messageElement = document.createElement("div");
        messageElement.className = isUser ? "chat-message user" : "chat-message operator";

        // Adding a send time without seconds
        const now = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric'
        };
        const timeString = now.toLocaleTimeString('en-US', options);

        messageElement.innerHTML = `
            <span class="message-text">${message}</span>
            <div class="message-time">${timeString}</div>
        `;

        chatMessages.appendChild(messageElement);
    }

    sendButton.addEventListener("click", function () {
        const userMessage = chatInput.value;
        if (userMessage.trim() !== "") {
            displayMessage(userMessage, true);

            const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            const formData = new FormData();
            formData.append("chat_id", TELEGRAM_CHAT_ID);
            formData.append("text", userMessage);

            fetch(telegramUrl, {
                    method: "POST",
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Message sent to Telegram:", data);
                })
                .catch(error => {
                    console.error("Error sending message to Telegram:", error);
                });

            chatInput.value = "";
        }
    });

    // Receiving messages from Telegram and displaying in chat
    function getTelegramMessages() {
        const telegramUpdatesUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;

        fetch(telegramUpdatesUrl)
            .then(response => response.json())
            .then(data => {
                data.result.forEach(update => {
                    if (update.message && update.message.text) {
                        const operatorMessage = update.message.text;
                        displayMessage(operatorMessage);
                    }
                });
            })
            .catch(error => {
                console.error("Error getting Telegram messages:", error);
            });
    }

    setInterval(getTelegramMessages, 3000);
});



// delete

let deleteButtons = document.getElementsByClassName('delete');

for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', function () {

        let product = this.closest('.product');
        product.remove();
    });
}



// form-section

document.getElementById('submitButton').addEventListener('click', function () {

    const form = document.getElementById('myForm');
    form.classList.add('resetting');
    setTimeout(() => {
        form.reset();
        form.classList.remove('resetting');
    }, 300);
});
