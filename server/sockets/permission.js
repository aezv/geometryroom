const dbRAM = require('../dbRAM.js');

module.exports = function (io, socket, rooms) {
    socket.on('permission', function (msg) {
        try {
            if (msg.rootIdRoom == dbRAM.getRootIdRoom(msg.idRoom, rooms) && dbRAM.getRoomPermission(msg.idRoom, rooms) == 'restricted') {
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
            else if (msg.request && dbRAM.getRoomPermission(msg.idRoom, rooms) == 'restricted') {
                io.to(dbRAM.getRootUser(msg.idRoom, rooms).userId).emit('request_permission', { userId: socket.id, userName: msg.user.userName });
            }
            else if (dbRAM.getRoomPermission(msg.idRoom, rooms) == 'restricted') {
                io.to(dbRAM.getRootUser(msg.idRoom, rooms).userId).emit('permission', true);
                io.to(socket.id).emit('permission', false);
                dbRAM.setPermission(msg.idRoom, dbRAM.getRootUser(msg.idRoom, rooms).userId, rooms);
            }
            else if (msg.request && dbRAM.getRoomPermission(msg.idRoom, rooms) == 'free') {
                io.to(socket.id).emit('permission', true);
                socket.to(msg.idRoom).emit('permission', false);
                dbRAM.setPermission(msg.idRoom, socket.id, rooms);
                console.log('1 if');
            }
            else if (dbRAM.getRoomPermission(msg.idRoom, rooms) == 'free') {
                io.to(dbRAM.getRootUser(msg.idRoom, rooms).userId).emit('permission', true);
                io.to(socket.id).emit('permission', false);
                dbRAM.setPermission(msg.idRoom, dbRAM.getRootUser(msg.idRoom, rooms).userId, rooms);
                console.log('2 if');
            }
        }
        catch (e) {
            //console.log(e);
        }
    });
}
