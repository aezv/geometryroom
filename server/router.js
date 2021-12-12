const express = require('express');
const router = express.Router();

const db = require('./database.js');
const randomId = require('./randomID.js');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/createRoom', (req, res) => {
    if (req.body.status == 'create') {
        var idArray = db.dbGetListRoom();
        var idRoom = randomId.getRandomId(idArray);
        var rootIdRoom = randomId.getRandomRootId(idRoom, idArray);
        db.dbCreateRoom(idRoom, rootIdRoom);
        res.render('createRoom', { idRoom: idRoom, rootIdRoom: rootIdRoom });
    }
    else if (req.body.status == 'connect') {
        res.render('connectRoom');
    }
});

router.post('/room', (req, res) => {
    if (req.body.idRoom.indexOf(':') != -1) {
        var idRoom = req.body.idRoom.split(':')[0];
        var rootIdRoom = req.body.idRoom;
        if (rootIdRoom == db.dbGetRootIdRoom(idRoom)) {
            res.render('room', { idRoom: idRoom, rootIdRoom: rootIdRoom, userName: req.body.userName });
        }
        else {
            res.send('Неверный код владельца');
        }
    }
    else if (db.dbGetListRoom().includes(req.body.idRoom)) {
        res.render('room', { idRoom: req.body.idRoom, rootIdRoom: '', userName: req.body.userName });
    }
    else {
        res.send('Комната не найдена');
    }
});
 
module.exports = router;