const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

const db = require('./database.js');

const app = express();
const router = require('./router.js');
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

var rooms = new Array();

app.use(express.static('shell'));
//katex
app.use(express.static('node_modules/katex/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));
app.set('views', process.cwd() + '/shell/pages');

app.use('/', router);
app.use('/createRoom', router);
app.use('/room', router);

io.on('connection', (socket) => {
    require('./sockets/connect.js')(io, socket, rooms);
    require('./sockets/disconnect.js')(io, socket, rooms);
    require('./sockets/permission.js')(io, socket, rooms);
    require('./sockets/users_list.js')(io, socket, rooms);
    require('./sockets/xml.js')(socket, rooms);
    require('./sockets/messages.js')(io, socket, rooms);
    require('./sockets/cursor.js')(socket, rooms);
});

server.listen(port, () => {
    console.log('http://localhost:' + port);
});
