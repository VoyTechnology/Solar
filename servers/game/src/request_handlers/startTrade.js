function startTrade(session, data) {
	console.log("inST");
	var badData = actions.inputAN.startTrade(data);

	console.log(badData);
	if (!badData.success) {
		return actions.messageEM.tradeError(badData.error, session.thisPlayer, data);
	}

	var seller = playerArray.getPlayerWithID(data.seller);
	var buyer = playerArray.getPlayerWithID(data.buyer);

	console.log("here");

	if (seller.hasItems([{id : data.comodity, quantity : data.quantity}]) !== 0) {
		return actions.messageEM.tradeError(105, session.thisPlayer, data);
	}
	else if (buyer.money < data.price) {
		return actions.messageEM.tradeError(112, session.thisPlayer, data);
	}
	else if (buyer.distanceBetweenPlayers(seller) < 500) {
		return actions.messageEM.tradeError(111, session.thisPlayer, data);
	}
	for (var i in trades) {
		if (trades[i].buyer.id == buyer.id || trades[i].seller.id == buyer.id) {
			return actions.messageEM.tradeError(113, session.thisPlayer, data);
		}
		else if (trades[i].buyer.id == seller.id || trades[i].seller.id == seller.id) {
			return actions.messageEM.tradeError(113, session.thisPlayer, data);
		}
	}
	var itemFound = false;
	var item = null;
	for (var k in allItems) {
		if (allItems[k].id == data.comodity) {
			itemFound = true;
			item = allItems[k];
			break;
		}
	}
	if (!itemFound) {
		return actions.messageEM.tradeError(115, session.thisPlayer, data);
	}

	// setting up trade
	trades.push({seller : seller, buyer : buyer, item : item});

	// if all else is sucessful
	console.log("emitted");
	console.log(buyer);
	if ( session.thisPlayer.id == buyer.id ) {
		seller.socket.emit("startTrade", data);
	}
	else {
		buyer.socket.emit("startTrade", data);
	}
}

module.exports = startTrade;
