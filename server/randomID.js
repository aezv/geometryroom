const randomIdSize = 10;
const randomIdSymbols =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getRandomId(idArray) {
    var randomId;
    do {
        randomId = '';
        for (var i = 0; i < randomIdSize; i++) {
            var randomIndex = Math.floor(Math.random() * randomIdSymbols.length);
            randomId += randomIdSymbols[randomIndex];
        }
    } while (idArray.indexOf(randomId) != -1);
    return randomId;
}

function getRandomRootId(id, idArray) {
    return id + ':' + getRandomId(idArray);
}

module.exports.getRandomId = getRandomId;
module.exports.getRandomRootId = getRandomRootId;
