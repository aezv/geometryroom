const db = require('./database.js');

function writeRoom(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    var room = {
        idRoom: rooms[index].idRoom,
        rootIdRoom: rooms[index].rootIdRoom,
        roomXML: rooms[index].roomXML,
        roomChat: rooms[index].roomChat
    };
    db.dbWriteRoom(idRoom, room);
}
function readRoom(idRoom, rooms) {
    var dbRoom = db.dbReadRoom(idRoom);
    var room = {
        idRoom: dbRoom.idRoom,
        rootIdRoom: dbRoom.rootIdRoom,
        rootUser: {
            userId: null,
            userName: null
        },
        permission: null,
        defaultUsers: new Array(),
        roomXML: dbRoom.roomXML,
        roomChat: dbRoom.roomChat
    };
    rooms.push(room);
}
function delRoom(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    rooms.splice(index, 1);
}
function searchRoom(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    return index != -1 ? true : false;
}
function getIndexRoom(idRoom, rooms) {
    var index = -1;
    for (var i = 0; i < rooms.length; i++) {
        if (idRoom == rooms[i].idRoom) {
            index = i;
            break;
        }
    }
    return index;
}
function getUseRoom(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].rootUser.userId || rooms[index].defaultUsers.length;
}
function getRootIdRoom(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].rootIdRoom;
}
function setRootUser(idRoom, rootUser, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    rooms[index].rootUser = rootUser;
}
function getRootUser(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].rootUser;
}
function setPermission(idRoom, permission, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    rooms[index].permission = permission;
}
function getPermission(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].permission;
}
function addDefaultUser(idRoom, user, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    rooms[index].defaultUsers.push(user);
}
function delDefaultUser(idRoom, userId, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    for (var i = 0; i < rooms[index].defaultUsers.length; i++) {
        if (userId == rooms[index].defaultUsers[i].userId) {
            rooms[index].defaultUsers.splice(i, 1);
            break;
        }
    }
}
function getAllUsers(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    var users = new Array();
    users.push(rooms[index].rootUser);
    for (var i = 0; i < rooms[index].defaultUsers.length; i++)
        users.push(rooms[index].defaultUsers[i]);
    return users;
}
function getUserNameByUserId(idRoom, userId, rooms) {
    var users = getAllUsers(idRoom, rooms);
    for (var i = 0; i < users.length; i++) {
        if (userId == users[i].userId)
            return users[i].userName;
    }
    return null;
}
function setXML(idRoom, roomXML, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    rooms[index].roomXML = roomXML;
}
function getXML(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].roomXML;
}
function setChat(idRoom, roomChat, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    rooms[index].roomChat = roomChat;
}
function addChat(idRoom, chat, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    rooms[index].roomChat.push(chat);
}
function getChat(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].roomChat;
}
function getIdRoomByUserId(userId, rooms) {
    for (var i = 0; i < rooms.length; i++) {
        if (userId == rooms[i].rootUser.userId)
            return rooms[i].idRoom;
        for (var j = 0; j < rooms[i].defaultUsers.length; j++) {
            if (userId == rooms[i].defaultUsers[j].userId)
                return rooms[i].idRoom;
        }
    }
    return null;
}

module.exports.writeRoom = writeRoom;
module.exports.readRoom = readRoom;
module.exports.delRoom = delRoom;
module.exports.searchRoom = searchRoom;
module.exports.getUseRoom = getUseRoom;
module.exports.getRootIdRoom = getRootIdRoom;
module.exports.setRootUser = setRootUser;
module.exports.getRootUser = getRootUser;
module.exports.setPermission = setPermission;
module.exports.getPermission = getPermission;
module.exports.addDefaultUser = addDefaultUser;
module.exports.delDefaultUser = delDefaultUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserNameByUserId = getUserNameByUserId;
module.exports.setXML = setXML;
module.exports.getXML = getXML;
module.exports.setChat = setChat;
module.exports.addChat = addChat;
module.exports.getChat = getChat;
module.exports.getIdRoomByUserId = getIdRoomByUserId;
