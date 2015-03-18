function moveSync(data, session) {

    var badData = global.server.actions.inputAN.moveSync(data);
    if(!badData.sucess) {
        console.log("here");
        return;
    }

    session.movementSynced = true;
}

module.exports = moveSync;
