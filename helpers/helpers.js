const helpers = {};
let _serverPort = 3000;

// Methodes permettant de set/get le sur lequel le serveur est lancé
helpers.setServerPort = (port=80) => { _serverPort = port; };
helpers.getServerPort = () => _serverPort;

helpers.getBaseURI = (req) => {
  return `${req.protocol}://${req.hostname}:${helpers.getServerPort()}`;
}

module.exports = helpers;
