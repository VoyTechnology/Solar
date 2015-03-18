/*Connection.prototype.sendMessage = function (recipients, msg) {
     var that = this;

     if (that.authorised) {

         var messageData = {
             timestamp: (new Date()).getTime(),
             originator: +settings.get('username'),
             recipient: recipients,
             text: msg
         };

         that._socket.emit('chat', messageData);

         var gonsoleLogMessage = "";
         if(recipients.length === 0) {
             gonsoleLogMessage += "(G)";
         }
         gonsoleLogMessage += "you : ";
         gonsoleLogMessage += msg;

         gonsole.log(msg);
     }
};

Connection.prototype.listenForChat = function () {
    var that = this;

    that._socket.on('chat', function(data){
        var msg = "";

        if(data.recipient.length === 0) {
            msg += "(G)";
        }

        msg += data.originator +" : ";
        msg += data.text;
        gonsole.log(msg);
    });
};/*
