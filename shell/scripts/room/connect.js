function loadConnect() {
    socket.emit('connect_room', { idRoom: idRoom, rootIdRoom: rootIdRoom, userName: userName });

    socket.on('connect_room', function (msg) {
        socket.emit('users_list', idRoom);
    });
}
