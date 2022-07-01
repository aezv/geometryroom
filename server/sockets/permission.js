const dbRAM = require('../dbRAM.js');

function localSetPermissionFree(io, socket, rooms, idRoom) {
    socket.to(idRoom).emit('permission', false);
    io.to(socket.id).emit('permission', true);
    dbRAM.setPermissionUserId(idRoom, rooms, socket.id);
}
function localDelPermissionFree(io, socket, rooms, idRoom) {
    io.to(idRoom).emit('permission', false);
    dbRAM.setPermissionUserId(idRoom, rooms, null);
}

function localSetPermissionRestricted(io, socket, rooms, idRoom, userId) {
    io.to(dbRAM.getPermissionUserId(idRoom, rooms)).emit('permission', false);
    io.to(userId).emit('permission', true);
    dbRAM.setPermissionUserId(idRoom, rooms, userId);
}
function localDelPermissionRestricted(io, socket, rooms, idRoom) {
    io.to(idRoom).emit('permission', false);
    io.to(dbRAM.getRootUser(idRoom, rooms)).emit('permission', true);
    dbRAM.setPermissionUserId(idRoom, rooms, dbRAM.getRootUser(idRoom, rooms));
}


module.exports = function (io, socket, rooms) {
    socket.on('permission', function (msg) {
        try {
            let typePermission = dbRAM.getRoomPermission(msg.idRoom, rooms);

            if (typePermission == 'free') {
                if (msg.request)
                    localSetPermissionFree(io, socket, rooms, msg.idRoom);
                else {
                    localDelPermissionFree(io, socket, rooms, msg.idRoom);
                }
            }
            else if (typePermission == 'restricted') {
                if (msg.rootIdRoom == dbRAM.getRootIdRoom(msg.idRoom, rooms)) {
                    if (msg.request && msg.userId)
                        localSetPermissionRestricted(io, socket, rooms, msg.idRoom, msg.userId);
                    else
                        localDelPermissionRestricted(io, socket, rooms, msg.idRoom);
                }
                else {
                    if (msg.request)
                        io.to(dbRAM.getRootUser(msg.idRoom, rooms)).emit('request_permission', socket.id);
                    else
                        localDelPermissionRestricted(io, socket, rooms, msg.idRoom);
                }
            }
            else
                throw 'Room: ' + msg.idRoom + ', Error: Unknown room permissions';
        }
        catch (e) {
            console.log(e);
        }
    });
}
