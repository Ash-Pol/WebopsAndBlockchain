async function joke() {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();
    return data;
}

async function quote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    return data.content;
}

 function Sound() {
    const audio = new Audio('sound.mp3');
    Sound.currentTime = 0;
    audio.play();
    setTimeout(() => {
        Sound.pause();
    }, 2000);
}

function cards(card) {
    if (card.dataset.showingJoke === "true") {
        quote().then(quote => {
            card.textContent = quote;
            card.dataset.showingJoke = "false";
        });
    } else {
        joke().then(joke => {
            card.textContent = joke.setup + " " + joke.punchline;
            card.dataset.showingJoke = "true";
        }
        );
    }
}

const cardContainer = document.getElementById("cardContainer");

for (let i = 0; i < 8; i++) {
    const card = document.createElement("div");
    card.className = "card";

    card.dataset.showingJoke = "true";
    joke().then(joke => {
        card.textContent = joke.setup + " " + joke.punchline;
    });

    card.addEventListener('click', () => {
        cards(card);
        card.classList.add('textcontent')
        Sound();
        card.classList.add('flipped');
       
});

    cardContainer.appendChild(card);
}
const modeToggle = document.getElementById('modeToggle');

modeToggle.addEventListener('change', () => {
if (modeToggle.checked) {
document.body.classList.add('dark-mode');
document.body.classList.remove('light-mode');
} else {
document.body.classList.add('light-mode');
document.body.classList.remove('dark-mode');
}
});

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
modeToggle.checked = prefersDarkMode;
if (prefersDarkMode) {
document.body.classList.add('dark-mode');
} else {
document.body.classList.add('light-mode');
}
