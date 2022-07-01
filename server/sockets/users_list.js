const dbRAM = require('../dbRAM.js');

module.exports = function (io, socket, rooms) {
    try {
        socket.on('users_list', function (msg) {
            io.to(msg).emit('users_list', dbRAM.getUsers(msg, rooms));
        });
    }
    catch (e) {
        console.log(e);
    }
};
