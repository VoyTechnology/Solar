function sock(name, keepLog) {
    this.socket = null;
    this.name = name;
    this.log = [];
    this.filePath = global.assets.__home + "/logs/" + name + ".txt";

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

    this.addSocketEvent = function(id, hasData) {
        if (hasData) {
            this.socket.on(id, function(data) {
                var logMessage = this.logTemplate(id, data, "Incoming");
                this.log.push(logMessage);
                global.assets.fs.writeFileSync(this.filePath, this.fileLogString(logMessage));
            });
        }
        else {
            this.socket.on(id, function() {
                var logMessage = this.logTemplate(id, null, "Incoming");
                this.log.push(logMessage);
                global.assets.fs.writeFileSync(this.filePath, this.fileLogString(logMessage));
            });
        }
    };

    this.fileLogString = function(logMessage) {
        var logString = "Timestamp : " + logMessage.timestamp.toString() + "\n";
        logString += "Direction : " + logMessage.direction + "\n";
        logString += "Identifier : " + logMessage.identifier + "\n";
        logString += "Data Transmitted : \n" + JSON.stringify(logMessage.data);
        logString += "\n\n\n";
        return logString;
    };

    this.socket = require('socket.io-client').connect("http://" + config.serverIp + ":" + config.serverPort.toString());
    if(keepLog) {
        this.addSocketEvent("connected", false);
        this.addSocketEvent("accepted", true);
        this.addSocketEvent("rejected", true);
        this.addSocketEvent("chat", true);
        this.addSocketEvent("chatError", true);
        this.addSocketEvent("otherPlayers", true);
        this.addSocketEvent("disconnect", true);
        this.addSocketEvent("move", true);
    }
}

sock.prototype.emit = function(id) {
    var data  = require(global.assets.__home + global.assets.config.paths.emitData);
    this.log.push(this.logTemplate(id, data, "Outgoing"));
    this.socket.emit("id", data);
};

sock.prototype.getLastLogs = function() {
    var tempLog = [];

    if (log.length < 5) {
        return log;
    }

    for(var i=log.length-1; i>log.length-6; i__)
    {
        tempLog.push(log[i]);
    }

    return tempLog;
};

sock.prototype.clearLog = function() {
    this.log.splice(0,this.log.length);
};

sock.prototype.close = function() {

};

module.exports = sock;
