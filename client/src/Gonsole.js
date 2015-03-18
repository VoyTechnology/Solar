/**
 * @file Stores the Gonsole class
 */

/**
 * Handles the game console
 * @class
 */
var Gonsole = function () {

};

/**
 * Logs the message
 * @method
 * @param {string} msg - Message to log
 */
Gonsole.prototype.log = function (msg) {
    $('.gonsole .content').append(msg + "\n");
};

/**
 * Clears the input
 * @method
 */
Gonsole.prototype.clrin = function () {
    $('#ginput').val("");
};


Gonsole.prototype.execCmd = function (msg) {
    switch (msg[0]) {
        case '/clear':
            $('.gonsole .content').empty();
            break;

        case '/devtools':
            if (dev) {
                gui.Window.get().showDevTools();
            } else {
                log.error("Whatya doin.");
            }
            break;

        case '/test':
            test();
            break;

        case '/version':
            log.info("Solar v" + package.version);
            break;

        default:
            log.error('Unknown command ' + msg[0]);
            break;
    }
};

/**
 * Check the input that the user entered
 * @method
 */

Gonsole.prototype.checkInput = function () {

    var inputs = $('#ginput').val();

    if (inputs.length !== 0) {
        var input = inputs.split(" ");
        var firstWord = input[0];

        if (firstWord.charAt(0) == "/") {
            this.execCmd(input);
        }
        else {
            Connection.prototype.sendMessage([], inputs);
        }
        // Clear the input at the end
        this.clrin();
    }
};
