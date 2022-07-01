const fs = require('fs');
const mkdirp = require('mkdirp');

const dbPath = process.cwd() + '/database';
const dbPathStats = process.cwd() + '/database/stats';
const dbPathErrors = process.cwd() + '/database/errors';
const dbPathBugReport = process.cwd() + '/database/bugreport';
mkdirp.sync(dbPath);
mkdirp.sync(dbPathStats);
mkdirp.sync(dbPathErrors);
mkdirp.sync(dbPathBugReport);

function dbWriteStatistics(dbJson) {
    fs.writeFileSync(dbPathStats + '/statistics.json', JSON.stringify(dbJson));
}

function dbReadStatistics() {
    var dbJson = JSON.parse(fs.readFileSync(dbPathStats + '/statistics.json'));
    return dbJson;
}

function dbWriteRoom(idRoom, dbJson) {
    fs.writeFileSync(dbPath + '/' + idRoom + '.json', JSON.stringify(dbJson));
}

function dbReadRoom(idRoom) {
    var dbJson = JSON.parse(fs.readFileSync(dbPath + '/' + idRoom + '.json'));
    return dbJson;
}

function dbCreateRoom(idRoom, roomPermission, rootIdRoom) {
    var dbJson = {
        idRoom: idRoom,
        roomPermission: roomPermission,
        rootIdRoom: rootIdRoom,
        rootUser: null,
        permissionUserId: null,
        users: new Array(),
        roomXML: null,
        roomChat: new Array()
    };
    dbWriteRoom(idRoom, dbJson);
}

function dbGetListRoom() {
    var listRoom = fs.readdirSync(dbPath);
    for (var i = 0; i < listRoom.length; i++)
        listRoom[i] = listRoom[i].substr(0, listRoom[i].indexOf('.json'));
    return listRoom;
}

function dbGetRootIdRoom(idRoom) {
    var dbJson = dbReadRoom(idRoom);
    return dbJson.rootIdRoom;
}

function dbGetRoomPermission(idRoom) {
    var dbJson = dbReadRoom(idRoom);
    return dbJson.roomPermission;
}
module.exports.dbWriteStatistics = dbWriteStatistics;
module.exports.dbReadStatistics = dbReadStatistics;
module.exports.dbWriteRoom = dbWriteRoom;
module.exports.dbReadRoom = dbReadRoom;
module.exports.dbCreateRoom = dbCreateRoom;
module.exports.dbGetListRoom = dbGetListRoom;
module.exports.dbGetRootIdRoom = dbGetRootIdRoom;
module.exports.dbGetRoomPermission = dbGetRoomPermission;
