/*
this is a socket object speciffic to stress testing
*/

function stressSock(id) {
    // initialising socket properties
    this.id = id;
    this.socket = null;
    this.messagesSent = 0;
    this.messagesReceived = 0;
    this.intervalID = null;

    // this function is to be passed to event handlers
    this.itterateMessagesReceived = function(selfReference) {
        return function() {
            selfReference.messagesReceived++;
        };
    };

    // function for moving player in random direction
    this.randMoveFunctionGenerator = function(selfReference) {
        // data to be sent in move message
        return function() {
            this.moveData = {
                timestamp : new Date().getTime(),
                id : selfReference.id,
                position : {
                    x : (Math.random()*10) + global.config.startingPosition.x,
                    y : (Math.random()*10) + global.config.startingPosition.y,
                    z : (Math.random()*10) + global.config.startingPosition.z
                },
                orientation : {
                    x : Math.random()*2,
                    y : Math.random()*2,
                    z : Math.random()*2
                }
            };

            // sending the data
            selfReference.messagesSent++;
            selfReference.socket.emit("move", this.moveData);
        };
    };

    //function for calling moveSync whena  moveError occures so that the socket can keep moving
    this.moveSync = function(selfReference) {
        return function() {
            // data to be sent in moveSync message
            var moveSyncData = {
                timestamp : new Date().getTime(),
                id : selfReference.id
            };

            // sending the data
            selfReference.socket.emit("moveSync", moveSyncData);
            selfReference.messagesSent++;
            // messages received for the initial moveError message
            selfReference.messagesReceived++;
        };
    };

    this.startMovingFunctionGenerator = function(selfReference) {
        return function() {
            selfReference.intervalID = setInterval(selfReference.randMoveFunctionGenerator(selfReference), global.config.intervalSpeedStressMovement);
        };
    };

    // function which stops moving interval
    this.stopMoving = function() {
        clearInterval(this.intervalID);
    };

    // connecting socket to server
    this.socket = global.io.connect("http://" + server.ip + ":" + server.port.toString(), {'force new connection': true});

    /*
    socket event handlers
    */

    // if moveError is received call this.moveSync function declared above
    this.socket.on("moveError", this.moveSync(this));

    // other events just itterate messages received
    this.socket.on("move", this.itterateMessagesReceived(this));
    this.socket.on("chat", this.itterateMessagesReceived(this));
    this.socket.on("otherPlayers", this.itterateMessagesReceived(this));
    this.socket.on("accepted", this.itterateMessagesReceived(this));
    this.socket.on("rejected", function(data){console.log(data.reasonText);});

    // emitting start to the server
    var startData = {
        id : this.id,
        token : this.id.toString()
    };
    this.socket.emit("start", startData);
}

module.exports = stressSock;
