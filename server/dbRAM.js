const db = require('./database.js');

function writeRoom(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    var room = {
        idRoom: rooms[index].idRoom,
        roomPermission: rooms[index].roomPermission,
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
        roomPermission: dbRoom.roomPermission,
        rootIdRoom: dbRoom.rootIdRoom,
        rootUser: dbRoom.rootUser,
        permissionUserId: dbRoom.permissionUserId,
        users: dbRoom.users,
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
    return rooms[index].users.length;
}
function getRoomPermission(idRoom, rooms){
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].roomPermission;
}
function getRootIdRoom(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].rootIdRoom;
}
function getRootUser(idRoom, rooms){
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].rootUser;
}
function setRootUser(idRoom, rooms, userId){
    var index = getIndexRoom(idRoom, rooms);
    rooms[index].rootUser = userId;
}
function getPermissionUserId(idRoom, rooms){
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].permissionUserId;
}
function setPermissionUserId(idRoom, rooms, userId){
    var index = getIndexRoom(idRoom, rooms);
    rooms[index].permissionUserId = userId;
}
function addUser(idRoom, user, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    rooms[index].users.push(user);
}
function delUser(idRoom, userId, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    for (var i = 0; i < rooms[index].users.length; i++) {
        if (userId == rooms[index].users[i].userId) {
            rooms[index].users.splice(i, 1);
            break;
        }
    }
}
function getUsers(idRoom, rooms) {
    var index = getIndexRoom(idRoom, rooms);
    return rooms[index].users;
}
function getUserNameByUserId(idRoom, userId, rooms) {
    var users = getUsers(idRoom, rooms);
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
        for (var j = 0; j < rooms[i].users.length; j++) {
            if (userId == rooms[i].users[j].userId)
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
module.exports.getRoomPermission = getRoomPermission;
module.exports.getRootIdRoom = getRootIdRoom;
module.exports.getRootUser = getRootUser;
module.exports.setRootUser = setRootUser;
module.exports.getPermissionUserId = getPermissionUserId;
module.exports.setPermissionUserId = setPermissionUserId;
module.exports.addUser = addUser;
module.exports.delUser = delUser;
module.exports.getUsers = getUsers;
module.exports.getUserNameByUserId = getUserNameByUserId;
module.exports.setXML = setXML;
module.exports.getXML = getXML;
module.exports.setChat = setChat;
module.exports.addChat = addChat;
module.exports.getChat = getChat;
module.exports.getIdRoomByUserId = getIdRoomByUserId;
