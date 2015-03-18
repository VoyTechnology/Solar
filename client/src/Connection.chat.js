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
