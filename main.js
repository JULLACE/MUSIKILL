const play = document.getElementById("play-button");
const pause = document.getElementById("pause-button");
const player = document.getElementById("player");

const SONGLIST = ["7-1-1", "7-1-2", "7-1-3", "7-2-1", 
                  "7-2-2", "7-3-1", "7-3-2", "7-4" ];

let startTime = 0;

player.src = `./songs/${SONGLIST[Math.floor(Math.random() * SONGLIST.length)]}.mp3`
player.load();
player.volume = 0.2;

// Temporary fix for randomly choosing song then loading. Does not seem sustainable
player.addEventListener("canplaythrough", () => {
    startTime = Math.floor(Math.random() * player.duration);
    player.currentTime = startTime;
}, {once: true});

player.addEventListener("timeupdate", (e) => {
    if (player.currentTime >= startTime + 1) {
        player.pause();
        player.currentTime = startTime;
    }
});

// Button logic
play.addEventListener("click", () => {
    player.play();
});

pause.addEventListener("click", () => {
    player.pause();
});