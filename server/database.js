const fs = require('fs');
const mkdirp = require('mkdirp');

const dbPath = process.cwd() + '/database';
mkdirp.sync(dbPath);

function dbWriteRoom(idRoom, dbJson) {
    fs.writeFileSync(dbPath + '/' + idRoom + '.json', JSON.stringify(dbJson));
}

function dbReadRoom(idRoom) {
    var dbJson = JSON.parse(fs.readFileSync(dbPath + '/' + idRoom + '.json'));
    return dbJson;
}

function dbCreateRoom(idRoom, rootIdRoom) {
    var dbJson = {
        idRoom: idRoom,
        rootIdRoom: rootIdRoom,
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

module.exports.dbWriteRoom = dbWriteRoom;
module.exports.dbReadRoom = dbReadRoom;
module.exports.dbCreateRoom = dbCreateRoom;
module.exports.dbGetListRoom = dbGetListRoom;
module.exports.dbGetRootIdRoom = dbGetRootIdRoom;
