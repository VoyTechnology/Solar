function playerArray() {
    this.playersByID = [];
    this.playersByUsername = [];
}

playerArray.prototype.search = function(target, id, array) {
    var minIndex = 0;
    var maxIndex = array.length;
    var currentIndex;
    var currentElement;

    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = (id == "U" ? array[currentIndex].username : array[currentIndex]._id);

        if (currentElement < target) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > target) {
            maxIndex = currentIndex - 1;
        }
        else {
            return {
				success : true,
				index : currentIndex
			};
        }
    }

	return {
		success : false,
		index : currentIndex
	};
};

playerArray.prototype.push = function(player) {
    if (this.playersByID.length === 0 && this.playersByUsername.length === 0) {
        this.playersByID.push(player);
        this.playersByUsername.push(player);
        return;
    }

    var idArrayIndex = this.search(player._id, "I", this.playersByID);
    var usernameArrayIndex = this.search(player.username, "U", this.playersByUsername);

    if (idArrayIndex.index == this.playersByID.length) {
        this.playersByID.push(player);
    }
    else {
        this.playersByID.splice(idArrayIndex.index, 0, player);
    }

    if (usernameArrayIndex.index == this.playersByUsername.length) {
        this.playersByUsername.push(player);
    }
    else {
        this.playersByUsername.splice(usernameArrayIndex.index, 0, player);
    }
};

playerArray.prototype.remove = function(target, id) {
    var firstIDIndex = this.search(target, id, (id=="U"?this.playersByUsername:this.playersByID));
    var secondIDIndex = this.search(target, (id=="U"?"I":"U"), (id=="U"?this.playersByID:this.playersByUsername));
    var playerReference;

    switch(id) {
        case "U" :
            playerReference = this.playersByUsername[firstIDIndex.index];
            this.playersByUsername.splice(firstIDIndex.index, 1);
            this.playersByID.splice(secondIDIndex.index, 1);
            break;
        default :
            playerReference = this.playersByID[firstIDIndex.index];
            this.playersByID.splice(firstIDIndex.index, 1);
            this.playersByUsername.splice(secondIDIndex.index, 1);
            break;
    }

    return playerReference;
};

playerArray.prototype.getPlayer = function(target, id) {
    var playersRelativeIndex = this.search(target, id, (id=="U"?this.playersByUsername:this.playersByID));
    if (!playersRelativeIndex.success) return -1;

    switch(id) {
        case "U" :
            return this.playersByUsername[playersRelativeIndex.index];
        default :
            return this.playersByID[playersRelativeIndex.index];
    }
};

playerArray.prototype.getPlayersWithout = function(target, id) {
    var arayToUse = (id=="U"?this.playersByUsername:this.playersByID);
    var playersRelativeIndex = this.search(target, id, arrayToUse);

    var clonedArray = arrayToUse.slice();
    clonedArray.splice(playersRelativeIndex.index, 1);
    return clonedArray;
};

playerArray.prototype.broadcastMessage = function(messageID, message) {
    for (var i=0; i<this.playersByID.length; i++) {
        this.playersByID[i].socket.emit(messageID, message);
    }
};

module.exports = playerArray;
