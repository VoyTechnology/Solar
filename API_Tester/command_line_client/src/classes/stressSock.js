/*
this is a socket object speciffic to stress testing
*/

function stressSock(id) {
    // initialising socket properties
    this.id = id;
    this.hardID = "";
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
                id : selfReference.hardID,
                position : {
                    x : (Math.random()*10) + startPos.x,
                    y : (Math.random()*10) + startPos.y,
                    z : (Math.random()*10) + startPos.z
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
                id : selfReference.hardID
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
            selfReference.intervalID = setInterval(selfReference.randMoveFunctionGenerator(selfReference), args.ims);
        };
    };

    // function which stops moving interval
    this.stopMoving = function() {
        clearInterval(this.intervalID);
    };

    // connecting socket to server
    this.socket = io.connect("http://" + args.gsIP + ":" + args.gsPort.toString(), {'force new connection': true});

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



    // adding padding to the id
    var paddingLength = 24 - ((this.id.toString()).length);
    for(var j=0 ; j<paddingLength; j++) {
        this.hardID += "0";
    }
    this.hardID += id.toString();

    // emitting start to the server
    var startData = {
        id : this.hardID,
        token : this.id.toString()
    };

    // emitting start
    this.socket.emit("start", startData);
}

module.exports = stressSock;
