const dbRAM = require('../dbRAM.js');

module.exports = function (io, socket, rooms) {
    socket.on('message', function (msg) {
        try {
            dbRAM.addChat(msg.idRoom, msg.userName + ': ' + msg.body, rooms);
            io.to(msg.idRoom).emit('message', msg.userName + ': ' + msg.body);
        }
        catch (e) {
            //console.log(e);
        }
    });
};
