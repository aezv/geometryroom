function loadCursor() {
    var cursor_on = false;
    transmit_cursor.addEventListener('click', function () {
        if (!cursor_on) {
            transmit_cursor.style.background = '#313438';
            cursor_on = true;
            socket.emit('cursor', { idRoom: idRoom, status: true, x: 0, y: 0 });
        }
        else {
            transmit_cursor.style.background = '#41464b';
            cursor_on = false;
            socket.emit('cursor', { idRoom: idRoom, status: false, x: 0, y: 0 });
        }
    });
    window.addEventListener('mousemove', function (event) {
        if (permission && cursor_on)
            socket.emit('cursor', { idRoom: idRoom, status: true, x: event.x, y: event.y });
    });
    socket.on('cursor', function (msg) {
        if (!permission && msg.status) {
            cursor.style.display = 'block';
            cursor.style.left = msg.x + 'px';
            cursor.style.top = msg.y + 'px';
        }
        else
            cursor.style.display = 'none';
    });
}