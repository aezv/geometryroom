const dbRAM = require('../dbRAM.js');

module.exports = function (socket, rooms) {
    socket.on('cursor', function (msg) {
        try {
            if (socket.id == dbRAM.getPermission(msg.idRoom, rooms))
                socket.to(msg.idRoom).emit('cursor', msg);
        }
        catch (e) {
            //console.log(e);
        }
    });
}
