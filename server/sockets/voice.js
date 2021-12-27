const dbRAM = require('../dbRAM.js');

module.exports = function (socket, rooms) {
    socket.on('voice', function (msg) {

        var newData = msg.data.split(";");
        newData[0] = "data:audio/ogg;";
        newData = newData[0] + newData[1];

        socket.to(msg.idRoom).emit('voice', newData);

    });
};