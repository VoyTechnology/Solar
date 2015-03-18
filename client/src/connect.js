/**
 * @file Stores the server connection class
 */

/**
 * Stores the server connection
 * @class
 */
var Connection = function (msg) {
    
    log.info(msg);
    
    var that = this;

    // Check is the connection established
    this.established = false;
    this.authorised = false;

    var connString = "";
    connString += config.server.protocol;
    connString += "://";
    connString += config.server.address;
    connString += ":";
    connString += config.server.port;
    connString += "/";

    console.log(connString);

    this._socket = io(connString);
    
    log.info("HERE");
    
    /*
    this._socket.on('connection', function () {
        log.debug("Connection Initialized");

        that.established = true;
        console.log(that);
    });
    */
    that.established = true;
};

Connection.prototype.connect = function () {
    var that = this;

    that._socket.emit('start', {
        id: +settings.get('username'),
        token: settings.get('token')
    });

    that._socket.on('accepted', function (data) {
        that.established = true;
        that.authorised = true;
        player.loadShip(data.ship);

        log.info("Connected to server");

        new Event('server_connected');

        player.setCamera({position: data.position, rotation: data.orientation});

        // Clear the token
        //settings.set('token', '');
    });

    that._socket.on('rejected', function (data) {
        that.established = true;
        that.authorised = false;

        //settings.set('token', '');

        // Exit with status 801: Server rejected access
        game_exit_error(801, data.reasonText);
    });

};

Connection.prototype.updateLocation = function (pos, rot) {
    var that = this;

    if (that.authorised) {

        var moveData = {
            timestamp: (new Date()).getTime(),
            id: +settings.get('username'),
            position: pos,
            orientation: rot
        };

        that._socket.emit('move', moveData);
    }
};

Connection.prototype.getOthers = function () {
    var that = this;

    if (that.authorised) {
        that._socket.on('otherPlayers', function (data) {
            console.log(data);
            var playersData = data.players;
            var playersArray = [];

            for (var i = playersData.length - 1; i >= 0; i--) {
                playersArray.push(new OtherPlayer(playersData[i]));
            }

            players = playersArray;
        });
    }
};

Connection.prototype.sendMessage = function (recipients, msg) {

    var that = this;
    
    if (that.authorised) {

        var messageData = {
            timestamp: (new Date()).getTime(),
            originator: +settings.get('username'),
            recipient: recipients,
            text: msg
        };
        
        that._socket.emit('chat', messageData);
    }
};