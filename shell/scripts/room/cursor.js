function loadCursor() {
    var timer_cursor = null;
    window.addEventListener('mousemove', function (event) {
        if (permission && !timer_cursor) {
            timer_cursor = setTimeout(function () {
                cursor.style.display = 'none';
                socket.emit('cursor', { idRoom: idRoom, x: event.x, y: event.y });
                clearTimeout(timer_cursor);
                timer_cursor = null;
            }, 25);
        }
    });
    socket.on('cursor', function (msg) {
        cursor.style.display = 'block';
        cursor.style.left = msg.x + 'px';
        cursor.style.top = msg.y + 'px';
    });
}