function disconnect(session) {
    if (!session.thisPlayer.loggedIn) {return;}
    global.db.players.findOne({username: session.thisPlayer.username}, function(err, doc) {
        if (doc === null){return;}
        session.thisPlayer.loggedIn = false;
        session.thisPlayer.speed = 0;

        for(var i=0; i<global.loggedInPlayers.length; i++) {
            if(global.loggedInPlayers[i].username == session.thisPlayer.username) {
                global.loggedInPlayers.splice(i, 1);
                break;
            }
        }

        delete session.thisPlayer.socket;
        global.db.players.update({_id: doc._id}, session.thisPlayer);
    });
}

module.exports = disconnect;
