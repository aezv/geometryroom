var coordinates_on = false;

transmit_coordinates.addEventListener('click', function () {
    if (!coordinates_on) {
        transmit_coordinates.style.background = '#313438';
        coordinates_on = true;
    }
    else {
        transmit_coordinates.style.background = '#41464b';
        coordinates_on = false;
    }
});

function parseXML() {
    var xml = ggbApplet.getXML();

    var startBodySearch = '<construction title="" author="" date="">';
    var endBodySearch = '</construction>';
    var indexBodyStart = xml.search(startBodySearch);
    var indexBodyEnd = xml.search(endBodySearch);

    var startCoordSearch = '<coordSystem';
    var endCoordSearch = '<evSettings';
    var indexCoordStart = xml.search(startCoordSearch);
    var indexCoordEnd = xml.search(endCoordSearch);

    return {
        coord: coordinates_on ? xml.substr(indexCoordStart + startCoordSearch.length, indexCoordEnd - indexCoordStart - startCoordSearch.length) : null,
        body: xml.substr(indexBodyStart + startBodySearch.length, indexBodyEnd - indexBodyStart - startBodySearch.length)
    };
}

/*var save_on = true;
var save_timeout = true;
var save_time = 100;
function saveGgbFileTimeout() {
    if (save_timeout && save_on){
        setTimeout(saveGgbFile(), save_time);
    }
    else {

    }
}*/

function saveGgbFile() {
    socket.emit('xml', { idRoom: idRoom, data: parseXML() });
}

function loadXML(data) {
    var loadBodyXML;
    if (data.body != parseXML().body) {
        var xml = ggbApplet.getXML();
        var startSearch = '<construction title="" author="" date="">';
        var endSearch = '</construction>';
        var indexStart = xml.search(startSearch);
        var indexEndElement = xml.search(endSearch);
        var prefixXML = xml.substr(0, indexStart + startSearch.length);
        var postfixXML = xml.substr(indexEndElement, xml.length);
        loadBodyXML = prefixXML + data.body + postfixXML;
    }
    if (data.coord && data.coord != parseXML().coord) {
        var xml = loadBodyXML ? loadBodyXML : ggbApplet.getXML();
        var startCoordSearch = '<coordSystem';
        var endCoordSearch = '<evSettings';
        var indexCoordStart = xml.search(startCoordSearch);
        var indexCoordEnd = xml.search(endCoordSearch);
        var prefixXML = xml.substr(0, indexCoordStart + startCoordSearch.length);
        var postfixXML = xml.substr(indexCoordEnd, xml.length);
        loadGgbFile(prefixXML + data.coord + postfixXML);
    }
    else if (loadBodyXML)
        loadGgbFile(loadBodyXML);
}

function loadGgbFile(data) {
    ggbApplet.setXML(data);
}
