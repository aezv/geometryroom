const dbRAM = require('../dbRAM.js');

module.exports = function (io, socket, rooms, stats) {
    socket.on('connect_room', function (msg) {
        stats.users++;
        socket.join(msg.idRoom);
        if (!dbRAM.searchRoom(msg.idRoom, rooms))
            dbRAM.readRoom(msg.idRoom, rooms);
        if (msg.roomPermission == dbRAM.getRoomPermission(msg.idRoom, rooms) && msg.roomPermission == 'restricted') {
            if (msg.rootIdRoom == dbRAM.getRootIdRoom(msg.idRoom, rooms)) {
                dbRAM.setRootUser(msg.idRoom, { userId: socket.id, userName: msg.userName }, rooms);
                io.to(socket.id).emit('connect_room', true);
                io.to(socket.id).emit('permission', true);
                dbRAM.setPermission(msg.idRoom, socket.id, rooms);
            }
            else {
                dbRAM.addDefaultUser(msg.idRoom, { userId: socket.id, userName: msg.userName }, rooms);
                io.to(socket.id).emit('connect_room', false);
                io.to(socket.id).emit('permission', false);
            }
        }
        else if (msg.roomPermission == dbRAM.getRoomPermission(msg.idRoom, rooms) && msg.roomPermission == 'free') {
            dbRAM.addDefaultUser(msg.idRoom, { userId: socket.id, userName: msg.userName }, rooms);
            io.to(socket.id).emit('connect_room', false);
            io.to(socket.id).emit('permission', false);
        }
        else {
            console.log('Ошибка в коннекте 1 = ' + msg.roomPermission + ', 2 = ' + dbRAM.getRoomPermission(msg.idRoom, rooms));
            console.log(msg);
        }
        var xml = dbRAM.getXML(msg.idRoom, rooms);
        if (xml)
            io.to(socket.id).emit('xml', xml);
        var chat = dbRAM.getChat(msg.idRoom, rooms);
        if (chat.length)
            io.to(socket.id).emit('message', chat);
        dbRAM.addChat(msg.idRoom, 'Пользователь ' + msg.userName + ' присоединился.', rooms);
        io.to(msg.idRoom).emit('message', 'Пользователь ' + msg.userName + ' присоединился.');
    });
};
