function disconnect(session) {
    if (!session.thisPlayer.loggedIn) {return;}

    global.server.db.players.findOne({id: session.thisPlayer.id}, function(err, doc) {
        if (doc === null){return;}

        for(var i=0; i<global.server.loggedInPlayers.length; i++) {

            if(global.server.loggedInPlayers[i].id == session.thisPlayer.id) {
                global.server.loggedInPlayers.splice(i, 1);
                break;
            }
        }

        global.server.db.players.update({id: doc.id}, session.thisPlayer.getDetailsForDatabase());
    });
}

module.exports = disconnect;
