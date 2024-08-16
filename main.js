const play = document.getElementById("play-button");
const pause = document.getElementById("pause-button");
const add = document.getElementById("add-button");
const change = document.getElementById("change-button");
const player = document.getElementById("player");
const volBar = document.getElementById("volume-bar");
const seekBar = document.getElementById("seek-bar");

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
// 
    "2-1":   "./songs/2-1.mp3",
    "2-2":   "./songs/2-2.mp3",
    "2-3":   "./songs/2-3.mp3",
    "2-4":   "./songs/2-4.mp3",
// 
    "3-1-1": "./songs/3-1-1.mp3",
    "3-1-2": "./songs/3-1-2.mp3",
    // "3-2-1": "",
    "3-2-2": "./songs/3-2-2.mp3",
// 
    // "4-1":   
    // "4-2":   
    // "4-3":   
    // "4-4":   
// 
    // "5-1":   

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

let startTime = 0;
let addTime = 1;
let songLevel = "";

function chooseSong() {
    let currVol = player.volume;
    songLevel = KEYS[Math.floor(Math.random() * KEYS.length)];

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

chooseSong();
player.volume = 0.2;
player.addEventListener("canplaythrough", setupPlayer, {once: true});

player.addEventListener("timeupdate", () => {
    if (player.currentTime >= startTime + addTime) {
        player.pause();
        player.currentTime = startTime;
    }

    // Avoid console spamming errors
    if (player.readyState == 4)
        seekBar.value = ((player.currentTime - startTime) / 15);
});

// Button logic
play.addEventListener("click", () => {
    player.play();
});

pause.addEventListener("click", () => {
    player.pause();
});

// Change song, reset addTimers, new startTime, etc.
change.addEventListener("click", () => {
    chooseSong();

    addTime = 1;
    add.textContent = `Add +${addTime} seconds`;
    add.disabled = false;

    player.addEventListener("canplaythrough", setupPlayer, {once: true});
});

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


addEventListener("click", (event) => {
    var lvl = ""
    console.log(event.target);
    if (songLevel.length != 3)
        lvl = songLevel.slice(0, -1);
    else 
        lvl = songLevel;

    const choice = event.target.closest(".level")
    if (choice && choice.id == lvl) {
        alert("YOU WIN");
    }
});