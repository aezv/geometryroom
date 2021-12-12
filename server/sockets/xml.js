const dbRAM = require('../dbRAM.js');

module.exports = function (socket, rooms) {
    socket.on('xml', function (msg) {
        if (socket.id == dbRAM.getPermission(msg.idRoom, rooms)) {
            socket.to(msg.idRoom).emit('xml', msg.data);
            dbRAM.setXML(msg.idRoom, msg.data, rooms);
        }
    });
}
