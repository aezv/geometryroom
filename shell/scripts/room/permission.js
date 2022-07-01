var permission = false;

function loadPermission() {
    if (rootIdRoom != '') {
        socket.emit('permission', { idRoom: idRoom, rootIdRoom: rootIdRoom, userId: null, request: false });
    }

    socket.on('permission', function (msg) {
        if (msg) {
            permission = msg;
            request_permission.innerHTML = 'Отдать права';
            saveGgbFile();
            ggbApplet.registerAddListener(saveGgbFile);
            ggbApplet.registerRemoveListener(saveGgbFile);
            ggbApplet.registerUpdateListener(saveGgbFile);
            ggbApplet.registerClickListener(saveGgbFile);
            ggbApplet.registerRenameListener(saveGgbFile);
            ggbApplet.registerClearListener(saveGgbFile);
            ggbApplet.registerStoreUndoListener(saveGgbFile);
            ggbApplet.registerClientListener(saveGgbFile);
        }
        else {
            permission = msg;
            request_permission.innerHTML = 'Запросить права';
            ggbApplet.unregisterAddListener(saveGgbFile);
            ggbApplet.unregisterRemoveListener(saveGgbFile);
            ggbApplet.unregisterUpdateListener(saveGgbFile);
            ggbApplet.unregisterClickListener(saveGgbFile);
            ggbApplet.unregisterRenameListener(saveGgbFile);
            ggbApplet.unregisterClearListener(saveGgbFile);
            ggbApplet.unregisterStoreUndoListener(saveGgbFile);
            ggbApplet.unregisterClientListener(saveGgbFile);
        }
    });

    request_permission.addEventListener('click', function () {
        if (!permission) {
            request_permission.innerHTML = 'Права запрошены';
            socket.emit('permission', { idRoom: idRoom, rootIdRoom: rootIdRoom, userId: null, request: true });
        }
        else {
            socket.emit('permission', { idRoom: idRoom, rootIdRoom: rootIdRoom, userId: null, request: false });
        }
    });

    socket.on('request_permission', function (msg) { //сделать аккуратнее
        var index;
        for (var i = 0; i < current_users_list.length; i++) {
            if (msg == current_users_list[i].userId) {
                index = i;
                break;
            }
        }

        var li = document.getElementById('li_id' + index);
        li.innerHTML = current_users_list[index].userName +
            '<button id="permission_true">+</button><button id="permission_false">-</button>';
        document.getElementById('permission_true').addEventListener('click', function () {
            socket.emit('permission', { idRoom: idRoom, rootIdRoom: rootIdRoom, userId: msg, request: true });
            li.innerHTML = current_users_list[index].userName;
        });
        document.getElementById('permission_false').addEventListener('click', function () {
            socket.emit('permission', { idRoom: idRoom, rootIdRoom: rootIdRoom, userId: msg, request: false });
            li.innerHTML = current_users_list[index].userName;
        });
        var tick_hidden_sidebar = 0;
        var max_tick_hidden_sidebar = 7; //только нечетные
        function tick() {
            if (tick_hidden_sidebar % 2 == 0)
                hidden_sidebar.style.background = '#41464b';
            else
                hidden_sidebar.style.background = '#313438';
            tick_hidden_sidebar++;
            if (tick_hidden_sidebar < max_tick_hidden_sidebar)
                setTimeout(tick, 500);
        }
        tick();
    });
}
