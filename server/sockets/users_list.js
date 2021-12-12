const dbRAM = require('../dbRAM.js');

module.exports = function (io, socket, rooms) {
    socket.on('users_list', function (msg) {
        io.to(msg).emit('users_list', dbRAM.getAllUsers(msg, rooms));
    });
};
