const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const previousButton = document.getElementById('previous');
const playButton = document.getElementById('play');
const forwardButton = document.getElementById('forward');

let isPlaying = false;
let songIndex = 0;
const songs = [
    {
        name: 'Fog-Lake',
        displayName: 'Push',
        artist: 'Fog-Lake'
    },
    {
        name: 'General-Vibe',
        displayName: 'Miss Emeli',
        artist: 'General-Vibe'
    },
    {
        name: 'XNOVA',
        displayName: 'All I Know',
        artist: 'XNOVA'
    },
    {
        name: 'DIZARO',
        displayName: 'Aurora-Borealis',
        artist: 'DIZARO'
    },
    {
        name: 'Extan',
        displayName: 'Meteor',
        artist: 'Extan'
    },
];

const playSong = () => {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', "Pause")
    audio.play();
}

const pauseSong = () => {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', "Play")
    audio.pause();
}

playButton.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
})

const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    audio.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

const previousSong = () => {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex])
    playSong()
}

const nextSong = () => {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex])
    playSong()
}

loadSong(songs[songIndex])

const updateProgressBar = (e) => {
    if(isPlaying){
        const { duration, currentTime} = e.srcElement;
        const progressPrecent = (currentTime / duration) * 100;
        progress.style.width = `${progressPrecent}%`;

        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }

        //Delay switching duration element to avoid NaN element
        if (durationSeconds){
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`
        }

        //calculate display for currentTime
        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if(currentTimeSeconds < 10){
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }

        currentTimeElement.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`
    }
}

const setProgressBar = (e) => {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;

    const { duration } = audio;

    audio.currentTime = (clickX / width) * duration;
}

previousButton.addEventListener('click', previousSong);
forwardButton.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong)
audio.addEventListener('timeupdate', updateProgressBar)

progressContainer.addEventListener('click', setProgressBar);
