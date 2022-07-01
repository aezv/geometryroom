const express = require('express');
const router = express.Router();

const cfg = require('../config.json');

const db = require('./database.js');
const randomId = require('./randomID.js');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/admin', (req, res)=>{
    res.render('admin');
});

router.post('/admin_panel', (req, res) => {
    if(req.body.admin_password == cfg.admin_password){
        res.render('adminPanel', {
            users: stats.users,
            rooms: stats.rooms,
            max_users: stats.max_users,
            max_rooms: stats.max_users
        });
    }
    else {
        res.render('index');
    }
});

router.post('/createRoom', (req, res) => {
    if(req.body.status == 'create_free'){
        var idRoom = randomId.getRandomId(db.dbGetListRoom());
        db.dbCreateRoom(idRoom, 'free', null);
        stats.rooms++;
        res.render('createRoom', { idRoom: idRoom, roomPermission: 'free', rootIdRoom: idRoom });
    }
    else if (req.body.status == 'create_restricted') {
        var idArray = db.dbGetListRoom();
        var idRoom = randomId.getRandomId(idArray);
        var rootIdRoom = randomId.getRandomRootId(idRoom, idArray);
        db.dbCreateRoom(idRoom, 'restricted', rootIdRoom);
        stats.rooms++;
        res.render('createRoom', { idRoom: idRoom, roomPermission: 'restricted', rootIdRoom: rootIdRoom });
    }
    else if(req.body.status == 'choice'){
        res.render('choiceCreateRoom');
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
            res.render('room', { idRoom: idRoom, roomPermission: db.dbGetRoomPermission(idRoom), rootIdRoom: rootIdRoom, userName: req.body.userName });
        }
        else {
            res.send('Неверный код владельца');
        }
    }
    else if (db.dbGetListRoom().includes(req.body.idRoom)) {
        res.render('room', { idRoom: req.body.idRoom, roomPermission: db.dbGetRoomPermission(req.body.idRoom), rootIdRoom: '', userName: req.body.userName });
    }
    else {
        res.send('Комната не найдена');
    }
});
 
module.exports = router;