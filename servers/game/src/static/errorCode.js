function errorCode(code) {
    var error = {
        code : code,
        reasonText : ""
    };

    switch (code) {
        case 100 :
            error.reasonText = "Other error";
            return error;
        case 101 :
            error.reasonText = "Missing parameter in request";
            return error;
        case 102 :
            error.reasonText = "Unknown parameter in request";
            return error;
        case 103 :
            error.reasonText = "Unknown request";
            return error;
        case 104 :
            error.reasonText = "Server not ready or busy";
            return error;
        case 105 :
            error.reasonText = "Player doesn't have this item";
            return error;
        case 106 :
            error.reasonText = "Authentication failure";
            return error;
        case 107 :
            error.reasonText = "Sender not the originator of chat message";
            return error;
        case 108 :
            error.reasonText = "Unknown player";
            return error;
        case 109 :
            error.reasonText = "Out of bounds";
            return error;
        case 110 :
            error.reasonText = "This player is already logged in";
            return error;
        case 111 :
            error.reasonText = "Player is too far away";
            return error;
        case 112 :
            error.reasonText = "Buyer doesn't have enough money.";
            return error;
        case 113 :
            error.reasonText = "Player is busy right now";
            return error;
        case 114 :
            error.reasonText = "No trade in process";
            return error;
        case 115 :
            error.reasonText = "Item id not found";
            return error;
        default :
            return false;
    }
}

module.exports = errorCode;
