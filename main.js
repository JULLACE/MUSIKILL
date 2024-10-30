const play = document.getElementById("play-button");
const add = document.getElementById("add-button");
const change = document.getElementById("change-button");
const player = document.getElementById("player");
const volBar = document.getElementById("volume-bar");
const seekBar = document.getElementById("seek-bar");
const fillBar = document.getElementById("fill-bar");
const barDiv = document.getElementById("bars-holder");
const pointDisplay = document.getElementById("point-display");

const searchBar = document.getElementById("guess-box");
const resultList = document.getElementById("guess-list");

const LEVELS = document.querySelectorAll("div.level");
const LEVELS_P = document.querySelectorAll("div.level > p");


const SONGLIST = {
    "0-1": "./songs/0-1.mp3",   
    "0-2": "./songs/0-2.mp3",    
    "0-3": "./songs/0-1.mp3",  
    "0-4": "./songs/0-2.mp3",  
    "0-5": "./songs/0-5.mp3",   

    "1-1-1": "./songs/1-1-1.mp3", 
    "1-1-2": "./songs/1-1-2.mp3",
    "1-2-1": "./songs/1-1-1.mp3", 
    "1-2-2": "./songs/1-2-2.mp3",
    "1-3":   "./songs/1-3.mp3",
    // "1-4-1": "",
    "1-4-2": "./songs/1-4-2.mp3",

    "2-1":   "./songs/2-1.mp3",
    "2-2":   "./songs/2-2.mp3",
    "2-3":   "./songs/2-3.mp3",
    "2-4":   "./songs/2-4.mp3",

    "3-1-1": "./songs/3-1-1.mp3",
    "3-1-2": "./songs/3-1-2.mp3",
    // "3-2-1": "",
    "3-2-2": "./songs/3-2-2.mp3",

    "4-1": "./songs/4-1.mp3",
    "4-2": "./songs/4-2.mp3",  
    "4-3": "./songs/4-3.mp3",  
    "4-4": "./songs/4-4.mp3", 

    "5-1": "./songs/5-1.mp3", 
    "5-2": "./songs/5-2.mp3", 
    "5-3-1": "./songs/5-3-1.mp3",
    "5-3-2": "./songs/5-3-2.mp3", 
    "5-4": "./songs/5-4.mp3", 

    "6-1-1": "./songs/6-1-1.mp3", 
    "6-1-2": "./songs/6-1-2.mp3", 
    "6-2-1": "./songs/6-2-1.mp3", 
    "6-2-2": "./songs/6-2-2.mp3", 

    // "7-1-1": "./songs/7-1-1.mp3",
    // "7-1-2": "./songs/7-1-2.mp3",
    // "7-1-3": "./songs/7-1-3.mp3",
    // "7-2-1": "./songs/7-2-1.mp3",
    // "7-2-2": "./songs/7-2-2.mp3",
    // "7-3-1": "./songs/7-3-1.mp3",
    // "7-3-2": "./songs/7-3-2.mp3",
    // "7-4":   "./songs/7-4.mp3",
};
const KEYS = Object.keys(SONGLIST);
let songTracker = KEYS;

let startTime = 0;
let addTime = 1;
let songLevel = "";
let points = 0;

function chooseSong() {
    var currVol = player.volume;

    var index = Math.floor(Math.random() * songTracker.length);
    songLevel = songTracker[index];
    songTracker.splice(index, 1);

    player.src = `${SONGLIST[songLevel]}`;
    player.load();
    player.volume = currVol;
}

// Funky event handling for randomly choosing song then loading. 
function setupPlayer() {
    startTime = Math.floor(Math.random() * player.duration);
    player.currentTime = startTime;
    player.removeEventListener("canplaythrough", setupPlayer);
}

function updateBar() {
    if (player.currentTime >= startTime + addTime) {
        player.pause();
        player.currentTime = startTime;

        play.textContent = "Play";
    }

    // Avoid console spamming errors
    if (player.readyState == 4) {
        fillBar.style.width = ((player.currentTime - startTime) / 16) * 100 + "%";
    }
    requestAnimationFrame(updateBar);
}

function changeSong() {
    chooseSong();

    addTime = 1;
    add.textContent = `Add +${addTime} seconds`;
    add.disabled = false;

    player.addEventListener("canplaythrough", setupPlayer, {once: true});
}

chooseSong();
player.volume = 0.2;
player.addEventListener("canplaythrough", setupPlayer, {once: true});

requestAnimationFrame(updateBar);

// Inserts dividers into audio progress bar
for (i = 1; i < 16; i += i) {
    const divider = document.createElement("div");
    divider.className = "division";
    divider.style.left = (i / 16) * 100 + "%";
    divider.id = `d-${i}`;

    barDiv.insertBefore(divider, barDiv.lastElementChild);
}

// Button logic
play.addEventListener("click", () => {
    if (player.paused) {
        player.play();
        play.textContent = "Pause";
    }
    else {
        player.pause();
        play.textContent = "Play";
    }
});

// Change song, reset addTimers, new startTime, etc.
change.addEventListener("click", changeSong);

add.addEventListener("click", () => {
    addTime += addTime;
    if (addTime != 16)
        add.textContent = `Add +${addTime} seconds`
    else
        add.disabled = true;
});

// Volume Bar
volBar.addEventListener("input", () => {
    player.volume = volBar.value / 100;
});

// Song Guess
addEventListener("click", (event) => {
    var lvl = ""
    var boxNum = 0;

    if (songLevel.length != 3) {
        boxNum = parseInt(songLevel.slice(-1)) - 1;
        lvl = songLevel.slice(0, -2);
    }
    else 
        lvl = songLevel;

    const choice = event.target.closest(".level")

    if (choice && choice.id == lvl) {
        choice.scrollIntoView({behavior: "smooth"});
        choice.focus();
        alert("YOU WIN");

        points += Math.round((100 / 33) / addTime);
        pointDisplay.innerText = `${points} / 100`;
    
        const box = choice.querySelectorAll(".song-box")[boxNum];
        box.style.backgroundColor = "white";
        changeSong();
    
        play.focus();
    }
    else if (choice && choice.id != lvl) {
        // Lose --> Add one second?
        choice.scrollIntoView({behavior: "smooth"});
        choice.focus();
    }
});

// Search functionality
searchBar.addEventListener("keyup", () => {
    var list = [];

    if (!searchBar.value.length) {
        resultList.style.display = "none";
    }
    else {
        // Displaying and clearing children
        resultList.style.display = "block";
        resultList.innerHTML = '';

        for (i = 0; i < LEVELS.length; i++) {
            if (LEVELS_P[i].innerText.includes(searchBar.value.toUpperCase())) {
                const validLevel = LEVELS[i];
                var lvlP = LEVELS_P[i];
                list.push(lvlP);

                const res = document.createElement('div');
                res.innerText = lvlP.innerText;
                
                res.addEventListener("click", (e) => {
                    validLevel.click()
                });

                resultList.appendChild(res);
            }

            if (list.length == 5) break;
        }
    }
    
    

});