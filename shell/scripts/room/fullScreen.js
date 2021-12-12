var fullscreen = document.getElementById('fullscreen');

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        fullscreen.innerHTML = 'Свернуть';
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            fullscreen.innerHTML = 'На весь экран';
            document.exitFullscreen();
        }
    }
}

fullscreen.addEventListener('click', toggleFullScreen);
