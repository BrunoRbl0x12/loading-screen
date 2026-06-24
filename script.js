let settings;
let tipsData;
let socialsData;

let videos = [
    "assets/videos/intro1.mp4",
    "assets/videos/intro2.mp4",
    "assets/videos/intro3.mp4"
];

let currentVideo = 0;

const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");

let activeVideo = video1;
let hiddenVideo = video2;

video1.loop = true;

async function loadConfig() {

    settings = await fetch("config/settings.json").then(r => r.json());
    tipsData = await fetch("config/tips.json").then(r => r.json());
    socialsData = await fetch("config/socials.json").then(r => r.json());

    startTips();
    startVideos();
}

function startTips(){

    const tipElement = document.getElementById("tip");

    function nextTip(){

        let random =
        Math.floor(Math.random() * tipsData.tips.length);

        tipElement.innerText =
        tipsData.tips[random];
    }

    nextTip();

    setInterval(nextTip,10000);
}

function startVideos(){

    activeVideo.src = videos[0];

    activeVideo.play();

    setInterval(changeVideo,
        settings.video_change_seconds * 1000);
}

function changeVideo(){

    currentVideo++;

    if(currentVideo >= videos.length)
        currentVideo = 0;

    hiddenVideo.src = videos[currentVideo];

    hiddenVideo.load();

    hiddenVideo.play();

    hiddenVideo.classList.remove("hidden");

    activeVideo.classList.add("hidden");

    let temp = activeVideo;
    activeVideo = hiddenVideo;
    hiddenVideo = temp;
}

setInterval(() => {

    totalFiles = 100;

    if(remainingFiles > 0)
        remainingFiles--;

    updateProgress();

},100);

loadConfig();

//
// GARRY'S MOD HOOKS
//

let totalFiles = 0;
let remainingFiles = 0;

function GameDetails(
serverName,
serverURL,
mapName,
maxPlayers,
steamID,
gamemode
){}

function SetFilesNeeded(needed){

    totalFiles = needed;
    remainingFiles = needed;

    document.getElementById("status").innerText =
    "Total archivos: " + needed;

    updateProgress();
}

function DownloadingFile(file){

    console.log("Downloading:", file);

    document.getElementById("status").innerText =
    "Descargando: " + file;

    remainingFiles--;

    updateProgress();
}

function SetStatusChanged(status){

    document.getElementById("status").innerText =
    status;
}

function updateProgress(){

    if(totalFiles <= 0) return;

    const percent =
        ((totalFiles - remainingFiles) / totalFiles) * 100;

    document.getElementById("progress-bar")
        .style.width = percent + "%";
}

// =====================================
// REDES SOCIALES
// =====================================

let socialIndex = 0;

const socials = [

{
    icon:"icon-discord",
    text:"discord.gg/fCPFvy76jn"
},

{
    icon:"icon-youtube",
    text:"youtube.com/@FrutaBolas"
},

{
    icon:"icon-tiktok",
    text:"tiktok.com/@frutabolas_"
}

];

function startSocialCycle(){

    const text =
    document.getElementById("social-link");

    if(!text){
        console.error("No existe social-link");
        return;
    }

    function update(){

        document
        .querySelectorAll(".social-icon")
        .forEach(icon => {

            icon.classList.remove("active");

        });

        const current =
        socials[socialIndex];

        const icon =
        document.getElementById(current.icon);

        if(icon){

            icon.classList.add("active");

        }

        text.innerText =
        current.text;

        socialIndex++;

        if(socialIndex >= socials.length){

            socialIndex = 0;

        }
    }

    update();

    setInterval(update,4000);
}

window.addEventListener("load",()=>{

    startSocialCycle();

});

// =====================================
// MÚSICA ALEATORIA
// =====================================

const musicFiles = [
    "assets/music/song1.mp3",
    "assets/music/song2.mp3",
    "assets/music/song3.mp3"
];

const musicPlayer = new Audio();

musicPlayer.volume = 0.2; // 20% (0.0 a 1.0)

function playRandomMusic() {

    const randomIndex =
        Math.floor(Math.random() * musicFiles.length);

    musicPlayer.src = musicFiles[randomIndex];

    musicPlayer.play().catch(console.error);
}

// Cuando termina una canción, reproduce otra aleatoria
musicPlayer.addEventListener("ended", playRandomMusic);

// Iniciar música
playRandomMusic();