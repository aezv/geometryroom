const dbRAM = require('../dbRAM.js');

module.exports = function (io, socket, rooms) {
    socket.on('disconnect', () => {
        var idRoom = dbRAM.getIdRoomByUserId(socket.id, rooms);
        var message = 'Пользователь ' + dbRAM.getUserNameByUserId(idRoom, socket.id, rooms) + ' отключился.';
        dbRAM.addChat(idRoom, message, rooms);
        io.to(idRoom).emit('message', message);
        if (socket.id == dbRAM.getRootUser(idRoom, rooms).userId) {
            dbRAM.setRootUser(idRoom, { userId: null, userName: null }, rooms);
            socket.to(idRoom).emit('permission', false);
        }
        else {
            if (socket.id == dbRAM.getPermission(idRoom, rooms)) {
                io.to(dbRAM.getRootUser(idRoom, rooms).userId).emit('permission', true);
                io.to(socket.id).emit('permission', false);
                dbRAM.setPermission(idRoom, dbRAM.getRootUser(idRoom, rooms).userId, rooms);
            }
            dbRAM.delDefaultUser(idRoom, socket.id, rooms);
        }
        if (!dbRAM.getUseRoom(idRoom, rooms)) {
            dbRAM.writeRoom(idRoom, rooms);
            dbRAM.delRoom(idRoom, rooms);
        }
    });
}
