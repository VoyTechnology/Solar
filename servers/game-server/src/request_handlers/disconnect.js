function disconnect(session) {
    if (!session.thisPlayer.loggedIn) {return;}
    global.server.db.players.findOne({username: session.thisPlayer.username}, function(err, doc) {
        if (doc === null){return;}
        session.thisPlayer.loggedIn = false;
        session.thisPlayer.speed = 0;

        for(var i=0; i<global.server.loggedInPlayers.length; i++) {
            if(global.server.loggedInPlayers[i].username == session.thisPlayer.username) {
                global.server.loggedInPlayers.splice(i, 1);
                break;
            }
        }

        delete session.thisPlayer.socket;
        global.server.db.players.update({_id: doc._id}, session.thisPlayer);
    });
}

module.exports = disconnect;
