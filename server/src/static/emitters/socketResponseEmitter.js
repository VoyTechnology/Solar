var socketResponseEmitter = {

    noData : function(call, socket) { // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>NODATA
        var response =  {
            message : call,
            data : {
                success : false,
                message : "Invalid data provided."
            }
        };

        socket.emit(response.message, response.data);
    },

    register : function(conditions, socket) { // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>REGISTER
        var response = {
            message : "register",
            data : null
        };


        if(conditions.success) {
            response.data = {
                success : true
            };
        }
        else {
            var message;
            if (conditions.reason == "usernameTaken"){message = "Username taken.";}
            else {message = "Password is too short.";}

            response.data = {
                success : false,
                message : message
            };
        }

        socket.emit(response.message, response.data);
    },

    login : function(conditions, player, socket) { // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>LOGIN
        var response = {
            message : "login",
            data : null
        };

        if (!conditions.success) {
            response.data = {
                success : false,
            };
        }
        else {
            response.data = {
                success : true,
                player : {
                    position : player.position,
                    direction : player.direction
                }
            };
        }

        socket.emit(response.message, response.data);
    },

    pstatus : function(conditions, player, socket) { // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>PSTATUS
            var response = {
                message : "pstatus",
                data : {
                    username: player.username,
                    position: player.position,
                    direction: player.direction,
                }
            };

            socket.emit(response.message, response.data);
    },

    move : function(conditions, socket) { // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>MOVE
        var response = {
            message : "move",
            data : null
        };

        if (conditions.success) {
            response.data = {
                success : true
            };
        }
        else {
            var message;
            if (conditions.reason == "tooFar"){message = "Too far.";}
            else {message = "Invalid location.";}

            response.data = {
                success : false,
                message : message
            };
        }

        socket.emit(response.message, response.data);
    },

    turn : function(conditions, socket) { // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>TURN
        var response = {
            message : "turn",
            data : null
        };

        if (conditions.success) {
            response.data = {
                success : true
            };
        }
        else {
            var message;
            if(conditions.reason == "badAngle"){message = "Bad Angle.";}
            response.data = {
                success : false,
                message : message
            };
        }

        socket.emit(response.message, response.data);
    },

    chat : function(conditions, socket) {
        var response = {
            message : "chat",
            data : null
        };

        if(conditions.success) {
            response.data = {
                success : true
            };
        }
        else {
            var message;
            if(conditions.reason == "Ignored"){message = "Ignored.";}
            if(conditions.reason == "noPlayer"){message = "Player not found.";}
            else {message = "Can't do that.";}

            response.data = {
                success : false,
                data : message
            };

            socket.emit(response.message, response.data);
        }
    },

    time : function(conditions, socket) {
        var response = {
            message : "time",
            data : {
                success : true,
                time : new Date().getTime()
            }
        };

        socket.emit(response.message, response.data);
    }
};

module.exports = socketResponseEmitter;
