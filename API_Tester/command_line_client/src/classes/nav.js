function nav() {
    this.baseText = "SolarTester";
    this.server = "Game_Server";
    this.socket = null;
    this.promptText = "-> ";
    this.sectionSeparator = ".";

    this.getPrompt = function() {
        var promptText = "";
        promptText += this.baseText.bold.green;

        if (this.server !== null) {
            promptText += this.sectionSeparator + this.server.cyan;
        }
        if (this.socket !== null) {
            promptText += this.sectionSeparator + this.socket.yellow;
        }

        promptText += this.promptText;
        return promptText;
    };

    this.switchServer = function(toServer) {
        switch(toServer) {
            case -1 :
                this.server = null;
                return true;
            case 0 :
                this.server = "Game_Server";
                return true;
            case 1 :
                this.server = "Discovery_Server";
                return true;
            case 2 :
                this.server = "Authentication_Server";
                return true;
            case 3 :
                this.server = "Trade_Server";
                return true;
            default :
                return false;
        }
    };

    this.switchSocket = function(toSocket) {
        if (this.server != "Game_Server") {
            return false;
        }

        if (toSocket == -1) {
            this.socket = null;
            return true;
        }
        else {
            for (var i=0; i<global.game_server.sockets.length; i++) {
                if (toSocket == global.game_server.sockets[i].name) {
                    this.socket = toSocket;
                    return true;
                }
            }
        }
        return false;
    };

}

module.exports = nav;
