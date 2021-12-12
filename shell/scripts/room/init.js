window.addEventListener('load', function () {
    var parameters = {
        "appName": "classic",
        "width": Math.floor(document.documentElement.clientWidth * 0.7),
        "height": Math.floor(document.documentElement.clientHeight),
        "useBrowserForJS": true,
        "showToolBar": true,
        "showAlgebraInput": true,
        "showMenuBar": true
    };
    var ggbApplet = new GGBApplet('5.0', parameters);
    ggbApplet.inject('applet_container');
});
