var mute_voice = true;

microphone.addEventListener('click', function () {
    if (mute_voice) {
        mute_voice = false;
        microphone.innerHTML = 'Отключить микрофон';
    }
    else {
        mute_voice = true;
        microphone.innerHTML = 'Включить микрофон';
    }
});

socket.on('voice', function (msg) {
    var audio = new Audio(msg);
    audio.play();
});

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    var madiaRecorder = new MediaRecorder(stream);
    madiaRecorder.start();

    var audioChunks = [];

    madiaRecorder.addEventListener("dataavailable", function (event) {
        audioChunks.push(event.data);
    });

    madiaRecorder.addEventListener("stop", function () {
        var audioBlob = new Blob(audioChunks);

        audioChunks = [];

        var fileReader = new FileReader();
        fileReader.readAsDataURL(audioBlob);
        fileReader.onloadend = function () {
            if (!mute_voice) {
                var base64String = fileReader.result;
                socket.emit('voice', {idRoom: idRoom, data: base64String});
            }
        };

        madiaRecorder.start();


        setTimeout(function () {
            madiaRecorder.stop();
        }, 1000);
    });

    setTimeout(function () {
        madiaRecorder.stop();
    }, 1000);
});
