var current_users_list = new Array();

socket.on('users_list', function (msg) {
    current_users_list = new Array();
    users_list.innerHTML = '';
    for (var i = 0; i < msg.length; i++) {
        current_users_list[i] = msg[i];
        var li = document.createElement('li');
        li.id = 'li_id' + i;
        li.innerHTML = msg[i].userName;
        users_list.appendChild(li);
    }
});
