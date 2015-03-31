function sock(name, keepLog) {
    this.socket = null;
    this.name = name;
    this.log = [];
    this.filePath = global.__home + "/logs/" + name + ".txt";

    this.callbackFunctionGenerator = function(id, selfReference) {
        return function(data) {
            selfReference.commitLogMessage(data, id, "Incoming");
        };
    };

    this.commitLogMessage = function(data, id, direction) {
        var logMessage = this.logTemplate (id, (data !== null?data:null), direction);
        this.log.push(logMessage);
    };

    this.logTemplate = function(id, data, direction) {
        var logMessage = {
            timestamp : new Date().getTime(),
            direction : direction,
            identifier : id,
            data : data,
        };

        if(data === null) {
            delete logTemplate.data;
        }

        return logMessage;
    };

    this.fileLogString = function(logMessage) {
        var logString = "Timestamp : " + logMessage.timestamp.toString() + "\n";
        logString += "Direction : " + logMessage.direction + "\n";
        logString += "Identifier : " + logMessage.identifier + "\n";
        logString += "Data Transmitted : \n" + JSON.stringify(logMessage.data);
        logString += "\n\n\n";
        return logString;
    };

    this.socket = global.io.connect("http://" + server.ip + ":" + server.port.toString(), {'force new connection': true});

    if(keepLog) {
        this.socket.on("connected", this.callbackFunctionGenerator("connected", this));
        this.socket.on("accepted", this.callbackFunctionGenerator("accepted", this));
        this.socket.on("rejected", this.callbackFunctionGenerator("rejected", this));
        this.socket.on("chat", this.callbackFunctionGenerator("chat", this));
        this.socket.on("chatError", this.callbackFunctionGenerator("chatError", this));
        this.socket.on("otherPlayers", this.callbackFunctionGenerator("otherPlayers", this));
        this.socket.on("disconnect", this.callbackFunctionGenerator("disconnect", this));
        this.socket.on("move", this.callbackFunctionGenerator("move", this));
        this.socket.on("moveError", this.callbackFunctionGenerator("moveError", this));
    }
}

sock.prototype.emit = function(id, data) {
    this.socket.emit(id, data);
    this.commitLogMessage(data, id, "Outgoing");
};

sock.prototype.clearLog = function() {
    this.log.splice(0,this.log.length);
};

sock.prototype.close = function() {
    this.socket.disconnect();
};

sock.prototype.open = function() {
    this.socket.connect("http://" + server.ip + ":" + server.port.toString());
};

module.exports = sock;
