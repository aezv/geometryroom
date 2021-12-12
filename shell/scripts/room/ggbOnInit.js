function ggbOnInit(aplet) {
    loadConnect();
    loadPermission();
    loadCursor();
    socket.on('xml', function (msg) {
        loadXML(msg);
    });
}
