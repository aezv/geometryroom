var root = false;

function loadConnect() {
    socket.emit('connect_room', { idRoom: idRoom, rootIdRoom, userName: userName });

    socket.on('connect_room', function (msg) {
        root = msg;
        socket.emit('users_list', idRoom);
    });
}
