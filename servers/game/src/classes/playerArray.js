function playerArray() {
    this.players = [];
}

playerArray.prototype.search = function(target, id, array) {
    for(var i=0; i<array.length; i++) {
        if ((id=="U"?array[i].username:array[i]._id) == target) {
            return i;
        }
    }

    return -1;
};

playerArray.prototype.push = function(player) {
    this.players.push(player);
};

playerArray.prototype.remove = function(target, id) {
    var index = this.search(target, id, this.players);
    if(index == -1) {
        return -1;
    }
    var thePlayer = this.players[index];
    this.players.splice(index, 1);
    return thePlayer;
};

playerArray.prototype.getPlayer = function(target, id) {
    var index = this.search(target, id, this.players);
    if (index == -1) {
        return -1;
    }
    return this.players[index];
};

module.exports = playerArray;
