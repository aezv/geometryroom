input_chat_send.addEventListener('click', function () {
    var message = input_chat_area.value;
    input_chat_area.value = '';
    socket.emit('message', { idRoom: idRoom, userName: userName, body: message });
});
socket.on('message', function (msg) {
    if (Array.isArray(msg)) {
        for (var i = 0; i < msg.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = msg[i];
            chat_container.appendChild(li);
        }
    }
    else {
        var li = document.createElement('li');
        li.innerHTML = msg;
        chat_container.appendChild(li);
    }
    chat_container_renderLaTeX();
    chat_container.scrollTop = chat_container.scrollHeight;
    var tick_hidden_chat = 0;
    var max_tick_hidden_chat = 7; //только нечетные
    function tick() {
        if (tick_hidden_chat % 2 == 0)
            hidden_chat.style.background = '#41464b';
        else
            hidden_chat.style.background = '#313438';
        tick_hidden_chat++;
        if (tick_hidden_chat < max_tick_hidden_chat)
            setTimeout(tick, 500);
    }
    tick();
});
