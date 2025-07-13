const playerContainer = document.querySelector('.player-container');
const cover = document.getElementById('cover');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');
const songNumberEl = document.getElementById('song-number');

// Zoznam skladieb (uprav podľa svojich súborov!)
const songs = [
    {
        title: 'Dont Let Me Drown',
        artist: 'Burna Boy',
        name: 'Burna Boy - Don t Let Me Drown', // Názov MP3 súboru bez prípony
        cover: 'f1 album.jpg' // Názov obrázku bez prípony
    },
    {
        title: 'Bam Bam',
        artist: 'Camila Cabello',
        name: 'Camila Cabello - Bam Bam',
        cover: 'camila cabello.jpg'
    },
    {
        title: 'Light Switch',
        artist: 'Charlie Puth',
        name: 'Charlie Puth - Light Switch',
        cover: 'light switch.jpg'
    },
    {
        title: 'Something Just Like This',
        artist: 'Coldplay',
        name: 'Coldplay - Something Just Like This',
        cover: 'coldplay.jpg'
    },
    {
        title: 'Lose My Mind',
        artist: 'Don Toliver',
        name: 'Don Toliver - Lose My Mind',
        cover: 'f1 album.jpg'
    },
    {
        title: 'Maria',
        artist: 'Dua Lipa',
        name: 'Dua Lipa - Maria',
        cover: 'dua lipa.jpg'
    },
    {
        title: 'Azizam',
        artist: 'Ed Sheeran',
        name: 'Ed Sheeran - Azizam',
        cover: 'azizam.jpg'
    },
    {
        title: 'End of the World',
        artist: 'Miley Cyrus',
        name: 'Miley Cyrus - End of the World',
        cover: 'end of the world.jpg'
    },
    {
        title: 'Invincible',
        artist: 'One Republic',
        name: 'OneRepublic - Invincible',
        cover: 'invincible.jpg'
    },
    {
        title: 'Drive',
        artist: 'Ed Sheeran',
        name: 'Ed Sheeran - Drive',
        cover: 'f1 album.jpg'
    },
    {
        title: 'Malibu',
        artist: 'Miley Cyrus',
        name: 'Miley Cyrus - Malibu',
        cover: 'malibu.jpg'
    },
    {
        title: 'Runaway',
        artist: 'One Republic',
        name: 'OneRepublic - RUNAWAY',
        cover: 'runaway.jpg'
    },
    {
        title: 'Sapphire',
        artist: 'Ed Sheeran',
        name: 'Ed Sheeran - Sapphire',
        cover: 'sapphire.jpg'
    },
    {
        title: 'Midnight Sky',
        artist: 'Miley Cyrus',
        name: 'Miley Cyrus - Midnight Sky',
        cover: 'midnight sky.jpg'
    },
    {
        title: 'Run',
        artist: 'One Republic',
        name: 'OneRepublic - Run',
        cover: 'run.jpg'
    },
    {
        title: 'Messy',
        artist: 'Rosé',
        name: 'Rosé - Messy',
        cover: 'f1 album.jpg'
    },
    {
        title: 'Prisoner',
        artist: 'Miley Cyrus',
        name: 'Miley Cyrus - Prisoner',
        cover: 'midnight sky.jpg'
    },
    {
        title: 'Just Keep Watching',
        artist: 'Tate McRae',
        name: 'Tate McRae - Just Keep Watching',
        cover: 'f1 album.jpg'
    },
    {
        title: 'Omg!',
        artist: 'Tiësto',
        name: 'Tiësto - OMG!',
        cover: 'f1 album.jpg'
    },
    // Pridaj ďalšie skladby tu
    // {
    //     title: 'Názov Skladby 3',
    //     artist: 'Interpret 3',
    //     name: 'song3',
    //     cover: 'cover3.jpg'
    // }
];

let songIndex = 0; // Index aktuálnej skladby
let isPlaying = false;
let isRepeating = false;
let isShuffling = false;
let shuffledIndices = [];

// Načítanie skladby
function loadSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audio.src = `hudba/${song.name}.mp3`;
    cover.src = `obrazky/${song.cover}`;

    let currentDisplayIndex;
    let totalSongsCount;

    if (isShuffling) {
        // Ak je zapnuté náhodné prehrávanie, nájdeme index aktuálnej skladby
        // v aktuálne zamiešanom poradí (shuffledIndices).
        currentDisplayIndex = shuffledIndices.indexOf(songIndex) + 1;
        totalSongsCount = shuffledIndices.length; // Počet skladieb v zamiešanom poradí
    } else {
        // Ak nie je zapnuté náhodné prehrávanie, používame pôvodný songIndex.
        currentDisplayIndex = songIndex + 1;
        totalSongsCount = songs.length; // Celkový počet skladieb
    }

    // Aktualizuj ukazovateľ skladby
    songNumberEl.textContent = `${currentDisplayIndex}/${totalSongsCount}`;
}

// Prehrať skladbu
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    audio.play();
    playerContainer.classList.add('playing'); // Pridá triedu pre vizuálne efekty (napr. rotácia obalu)
}

// Pozastaviť skladbu
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    audio.pause();
    playerContainer.classList.remove('playing');
}

// Predchádzajúca skladba
function prevSong() {
    if (isShuffling && shuffledIndices.length > 0) {
        let currentShuffledIndex = shuffledIndices.indexOf(songIndex);
        if (currentShuffledIndex > 0) {
            songIndex = shuffledIndices[currentShuffledIndex - 1];
        } else {
            // Ak je prvá skladba v shuffle poradí, presunieme sa na poslednú
            songIndex = shuffledIndices[shuffledIndices.length - 1];
        }
    } else {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Ďalšia skladba
function nextSong() {
    if (isShuffling && shuffledIndices.length > 0) {
        let currentShuffledIndex = shuffledIndices.indexOf(songIndex);
        if (currentShuffledIndex < shuffledIndices.length - 1) {
            songIndex = shuffledIndices[currentShuffledIndex + 1];
        } else {
            // Ak je posledná skladba v shuffle poradí, vrátime sa na prvú
            songIndex = shuffledIndices[0];
        }
    } else {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Aktualizácia priebehu
function updateProgress(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Zobrazenie času
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) { // Zabráni NaN
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Nastavenie priebehu kliknutím
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audio;
    audio.currentTime = (clickX / width) * duration;
}

// Nastavenie hlasitosti
function setVolume(e) {
    audio.volume = e.target.value;
}

// Prepnutie opakovania
function toggleRepeat() {
    isRepeating = !isRepeating;
    repeatBtn.classList.toggle('active', isRepeating);
    if (isRepeating) {
        audio.loop = true;
    } else {
        audio.loop = false;
    }
    console.log('Opakovanie:', isRepeating);
}

// Prepnutie náhodného prehrávania
function toggleShuffle() {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active', isShuffling);
    if (isShuffling) {
        shuffledIndices = Array.from({ length: songs.length }, (_, i) => i);
        shuffleArray(shuffledIndices);
        // Ak aktuálna skladba nie je v shuffle poradí, alebo ak je to prvé zapnutie shufflu,
        // nájdeme jej pozíciu alebo ju pridáme na začiatok shuffle poradia, ak je to možné.
        // Pre jednoduchosť ju prehodíme na náhodnú, aby sa predišlo zamrznutiu na jednej skladbe.
        if (shuffledIndices[0] !== songIndex) {
            const currentSongIdxInShuffled = shuffledIndices.indexOf(songIndex);
            if (currentSongIdxInShuffled > -1) {
                // Prehodíme aktuálnu skladbu na začiatok, aby sa po shuffli hralo od nej
                [shuffledIndices[0], shuffledIndices[currentSongIdxInShuffled]] = [shuffledIndices[currentSongIdxInShuffled], shuffledIndices[0]];
            } else {
                 // Ak aktuálna skladba nie je v shuffledIndices (nemalo by sa stať),
                 // nastavíme ju na prvú v novom shuffle poradí, aby sa znova načítala
                 songIndex = shuffledIndices[0];
                 loadSong(songs[songIndex]);
            }
        }
    } else {
        // Vypnutie shufflu, resetujeme index na pôvodnú pozíciu skladby, ak existuje
        // alebo len na pôvodný index predtým, ako bol shuffle zapnutý
        // Pre jednoduchosť to necháme tak, ako je, a po ďalšej skladbe sa vráti do normálu
        // Alebo môžeme nájsť pôvodný index aktuálnej skladby
        songIndex = songs.indexOf(songs[songIndex]); // Nájde pôvodný index aktuálnej skladby
    }
    console.log('Náhodné prehrávanie:', isShuffling);
    console.log('Shuffled Indices:', shuffledIndices);
}

// Funkcia na zamiešanie poľa (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    if (isRepeating) {
        playSong(); // Znovu prehrať aktuálnu skladbu
    } else {
        nextSong(); // Prejsť na ďalšiu
    }
});
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);
repeatBtn.addEventListener('click', toggleRepeat);
shuffleBtn.addEventListener('click', toggleShuffle);

// Inicializácia prehrávača s prvou skladbou
loadSong(songs[songIndex]);

// Pridanie štýlu pre rotujúci obal albumu pri prehrávaní (do CSS by sa to hodilo)
// Pridajte toto do style.css pre .player-container.playing .song-image img
/*
.player-container.playing .song-image img {
    animation: rotate 10s linear infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
*/
