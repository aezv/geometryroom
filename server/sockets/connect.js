const dbRAM = require('../dbRAM.js');

function localAddUser(io, socket, rooms, msg) {
    dbRAM.addUser(msg.idRoom, { userId: socket.id, userName: msg.userName }, rooms);
    io.to(socket.id).emit('connect_room', null);
}

function localSetRootUser(io, socket, rooms, msg) {
    dbRAM.setRootUser(msg.idRoom, rooms, socket.id);
    dbRAM.setPermissionUserId(msg.idRoom, rooms, socket.id);
    dbRAM.addUser(msg.idRoom, { userId: socket.id, userName: msg.userName }, rooms);
    io.to(socket.id).emit('connect_room', null);
}

module.exports = function (io, socket, rooms, stats) {
    socket.on('connect_room', function (msg) {
        try {
            socket.join(msg.idRoom);
            if (!dbRAM.searchRoom(msg.idRoom, rooms)){
                dbRAM.readRoom(msg.idRoom, rooms);
            }

            if (dbRAM.getRoomPermission(msg.idRoom, rooms) == 'free') {
                localAddUser(io, socket, rooms, msg);
            }
            else if (dbRAM.getRoomPermission(msg.idRoom, rooms) == 'restricted') {
                if (msg.rootIdRoom == dbRAM.getRootIdRoom(msg.idRoom, rooms)) {
                    localSetRootUser(io, socket, rooms, msg);
                }
                else {
                    localAddUser(io, socket, rooms, msg);
                }
            }
            else
                throw 'Room: ' + msg.idRoom + ', Error: Unknown room permissions';

            var xml = dbRAM.getXML(msg.idRoom, rooms);
            if (xml)
                io.to(socket.id).emit('xml', xml);

            var chat = dbRAM.getChat(msg.idRoom, rooms);
            if (chat.length)
                io.to(socket.id).emit('message', chat);
            dbRAM.addChat(msg.idRoom, 'Пользователь ' + msg.userName + ' присоединился.', rooms);
            
            io.to(msg.idRoom).emit('message', 'Пользователь ' + msg.userName + ' присоединился.');

            stats.users++;
        }
        catch (e) {
            console.log(e);
        }
    });
};
