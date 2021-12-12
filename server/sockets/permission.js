const dbRAM = require('../dbRAM.js');

module.exports = function (io, socket, rooms) {
    socket.on('permission', function (msg) {
        if (msg.rootIdRoom == dbRAM.getRootIdRoom(msg.idRoom, rooms)) {
            if (!msg.user.userId) {
                io.to(socket.id).emit('permission', true);
                socket.to(msg.idRoom).emit('permission', false);
                dbRAM.setPermission(msg.idRoom, socket.id, rooms);
            }
            else if (msg.request) {
                io.to(socket.id).emit('permission', false);
                io.to(msg.user.userId).emit('permission', true);
                dbRAM.setPermission(msg.idRoom, msg.user.userId, rooms);
            }
            else {
                io.to(msg.user.userId).emit('permission', false);
            }
        }
        else if (msg.request) {
            io.to(dbRAM.getRootUser(msg.idRoom, rooms).userId).emit('request_permission', { userId: socket.id, userName: msg.user.userName });
        }
        else {
            io.to(dbRAM.getRootUser(msg.idRoom, rooms).userId).emit('permission', true);
            io.to(socket.id).emit('permission', false);
            dbRAM.setPermission(msg.idRoom, dbRAM.getRootUser(msg.idRoom, rooms).userId, rooms);
        }
    });
}
