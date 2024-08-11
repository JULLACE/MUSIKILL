const play = document.getElementById("play-button");
const pause = document.getElementById("pause-button");
const add = document.getElementById("add-button");
const change = document.getElementById("change-button");
const player = document.getElementById("player");
const volBar = document.getElementById("volume-bar");

const SONGLIST = {
    "0-1": "https://t4.bcbits.com/stream/f47f2c3dc0e0f002954b9685758f8248/mp3-128/3394302523?p=0&ts=1723491395&t=2cd033595cded7fef1108c2821a347a8cd320d85&token=1723491395_243d8ef944f1f4097f1178247d03ec7d81be6cfe",
    "0-2": "https://t4.bcbits.com/stream/d21498b22a7db280c13d8d626575bbc8/mp3-128/3123283150?p=0&ts=1723491395&t=c6983dfdf8ae966c22ea7484ef48aee8a5adf6c7&token=1723491395_811f34476bba2cd4779308fae7f09027740f4a67",
    "0-3": "https://t4.bcbits.com/stream/f47f2c3dc0e0f002954b9685758f8248/mp3-128/3394302523?p=0&ts=1723491395&t=2cd033595cded7fef1108c2821a347a8cd320d85&token=1723491395_243d8ef944f1f4097f1178247d03ec7d81be6cfe",
    "0-4": "https://t4.bcbits.com/stream/d21498b22a7db280c13d8d626575bbc8/mp3-128/3123283150?p=0&ts=1723491395&t=c6983dfdf8ae966c22ea7484ef48aee8a5adf6c7&token=1723491395_811f34476bba2cd4779308fae7f09027740f4a67",
    "0-5": "https://t4.bcbits.com/stream/5d3167a91e76f8320e38d76aa0b9ab20/mp3-128/4005716234?p=0&ts=1723491395&t=b38a5a98c662b6d65b8ea22302b1f1d36f2d0696&token=1723491395_555baf92f473a5eebf115d69ea48a19275a1212f",

    "1-1-1": "https://t4.bcbits.com/stream/4da152a514033b2760320fad3e6cba54/mp3-128/2825819800?p=0&ts=1723492686&t=d32cc43f8597c29ff982ad5650a8056da76ae34e&token=1723492686_0061b3ed2f0624b2ffa4cfe90728be5070503f56",
    "1-1-2": "https://t4.bcbits.com/stream/709c836c4bef255f8bf9b378655239a0/mp3-128/3787997835?p=0&ts=1723492686&t=7e45baaf8b4d4554426e354972fb5e5c121a2aff&token=1723492686_921c87582f57d4e37ee0163999b293ecc0a3c957",
    "1-2-1": "https://t4.bcbits.com/stream/4da152a514033b2760320fad3e6cba54/mp3-128/2825819800?p=0&ts=1723492686&t=d32cc43f8597c29ff982ad5650a8056da76ae34e&token=1723492686_0061b3ed2f0624b2ffa4cfe90728be5070503f56",
    "1-2-2": "https://t4.bcbits.com/stream/92fa45a4df0b4b129543270c5c39e33b/mp3-128/1822041372?p=0&ts=1723492686&t=a58d202a473f1ac8a90c0984afb1723604f57701&token=1723492686_1ad292276e23b456767702d8c5f5a503adc7ecd8",
    "1-3":   "https://t4.bcbits.com/stream/67207aa07f1e54d4b3f0156053f8bf96/mp3-128/1753774158?p=0&ts=1723492686&t=0291209eb630d53dbbd7a4ebe8622c98f5e73473&token=1723492686_798f764392969d167ac9f79648443a8380287aa9",
    "1-4-1": "https://t4.bcbits.com/stream/de042630ee2af5e68c66bfb4e506c06b/mp3-128/2830719548?p=0&ts=1723492686&t=7f91c03319907a96c6bbfb286a6adae99e5dee00&token=1723492686_b872840ed200646d2b995a63c0955feaf9c4fbc7",
    "1-4-2": "https://t4.bcbits.com/stream/c7de3eac4c87f18987d04428ba61cdc1/mp3-128/2470896214?p=0&ts=1723492686&t=68f8ed2c839841d560b27480207da80478d3859b&token=1723492686_e58e4de80dea5777ff2d2258d354ba562b218a72",

    "7-1-1": "./songs/7-1-1.mp3",
    "7-1-2": "./songs/7-1-2.mp3",
    "7-1-3": "./songs/7-1-3.mp3",
    "7-2-1": "./songs/7-2-1.mp3",
    "7-2-2": "./songs/7-2-2.mp3",
    "7-3-1": "./songs/7-3-1.mp3",
    "7-3-2": "./songs/7-3-2.mp3",
    "7-4":   "./songs/7-4.mp3",
};
const KEYS = Object.keys(SONGLIST);

let startTime = 0;
let addTime = 1;
let songLevel = "";

function chooseSong() {
    songLevel = KEYS[Math.floor(Math.random() * KEYS.length)];
    player.src = `${SONGLIST[songLevel]}`;
    player.load();
    player.volume = 0.2;
}

// Funky event handling for randomly choosing song then loading. 
function setupPlayer() {
    startTime = Math.floor(Math.random() * player.duration);
    player.currentTime = startTime;
    player.removeEventListener("canplaythrough", setupPlayer);
}

chooseSong();
player.addEventListener("canplaythrough", setupPlayer, {once: true});

player.addEventListener("timeupdate", () => {
    if (player.currentTime >= startTime + addTime) {
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