// Запрос к API MyRadio24 для отображения текущего трека и альбома
function updateNowPlaying() {
    fetch('https://myradio24.com/getcurrent/fmd')
        .then(response => response.json())
        .then(data => {
            if (data && data.title) {
                document.getElementById('now-playing').textContent = data.artist + " - " + data.title;

                // Обновление обложки альбома
                if (data.albumCover) {
                    document.getElementById('album-cover').src = data.albumCover;
                } 
                else {
                    document.getElementById('album-cover').src = 'img/default-album.png'; // Если нет обложки, показываем дефолтную
                }
            } 
        else {
                document.getElementById('now-playing').textContent = 'Текущий трек недоступен';
            }
        })
        .catch(error => {
            console.error('Ошибка при получении текущего трека:', error);
        });
}

// Play и Pause
const playButton = document.getElementById('play-button');
const audioPlayer = document.getElementById('audio-player'); 

// Обработчик события на клик по изображению
playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play(); // 
        playButton.src = 'path/to/pause-button.png'; 
    } 
    else {
        audioPlayer.pause(); 
        playButton.src = 'img/play.png'; 
    }
});

// Функция управления радио
let isPlaying = false;
const audio = new Audio('https://myradio24.com/fmd');

function toggleRadio() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('play-button').textContent = '▶️';
    } 
    else {
        audio.play();
        document.getElementById('play-button').textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

// Управление громкостью
const volumeControl = document.getElementById('volume-control');
volumeControl.addEventListener('input', function() {
    audio.volume = volumeControl.value / 100;
});

// Обновляем трек каждую минуту
setInterval(updateNowPlaying, 60000);
updateNowPlaying(); 
