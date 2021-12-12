var status_hidden_sidebar = false;
var status_hidden_chat = false;

hidden_sidebar.addEventListener('click', function () {
    status_hidden_sidebar = !status_hidden_sidebar;
    resize();
});
hidden_chat.addEventListener('click', function () {
    status_hidden_chat = !status_hidden_chat;
    resize();
});

function resizeGGB(width, height) {
    ggbApplet.setWidth(width);
    ggbApplet.setHeight(height);
}

function resize() {
    var winWidth = document.documentElement.clientWidth;
    var winHeight = document.documentElement.clientHeight;
    if (!status_hidden_sidebar && !status_hidden_chat) {
        sidebar.style.marginLeft = '0';
        chat.style.marginLeft = '85vw';
        applet_container.style.marginLeft = '15vw';
        resizeGGB(Math.floor(winWidth * 0.7), Math.floor(winHeight));
    }
    else if (status_hidden_sidebar && !status_hidden_chat) {
        sidebar.style.marginLeft = '-14vw';
        chat.style.marginLeft = '85vw';
        applet_container.style.marginLeft = '1vw';
        resizeGGB(Math.floor(winWidth * 0.84), Math.floor(winHeight));
    }
    else if (!status_hidden_sidebar && status_hidden_chat) {
        sidebar.style.marginLeft = '0';
        chat.style.marginLeft = '99vw';
        applet_container.style.marginLeft = '15vw';
        resizeGGB(Math.floor(winWidth * 0.84), Math.floor(winHeight));
    }
    else {
        sidebar.style.marginLeft = '-14vw';
        chat.style.marginLeft = '99vw';
        applet_container.style.marginLeft = '1vw';
        resizeGGB(Math.floor(winWidth * 0.98), Math.floor(winHeight));
    }
}
window.addEventListener('resize', resize);
document.addEventListener('fullscreenchange', resize);

