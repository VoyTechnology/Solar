function tradeResponse(session, data) {
	var badData = actions.inputAN.tradeResponse(data);

	if (!badData.success) {
		return actions.messageEM.tradeError(badData.error, session.thisPlayer, data);
	}

	var seller = playerArray.getPlayerWithID(data.trade.seller);
	var buyer = playerArray.getPlayerWithID(data.trade.buyer);
	var thisPlayerIsBuyer = false;
	if (buyer.id == session.thisPlayer.id) {
		thisPlayerIsBuyer = true;
	}

	var tradeFound = false;
	var tradeIndex = -1;
	for (var i in trades) {
		if (thisPlayerIsBuyer) {
			if (trades[i].buyer.id == session.thisPlayer.id) {
				tradeFound = true;
				tradeIndex = i;
			}
		}
		else {
			if (trades[i].seller.id == session.thisPlayer.id) {
				tradeFound = true;
				tradeIndex = i;
			}
		}
	}

	if (!tradeFound) {
		return actions.messageEM.tradeError(114, session.thisPlayer, data);
	}

	var item = {
		id : trades[tradeIndex].item.id,
		name : trades[tradeIndex].item.name,
		description : trades[tradeIndex].item.description,
		units : trades[tradeIndex].item.units,
		quantity : data.trade.quantity
	};

	buyer.money -= data.trade.price;
	seller.money += data.trade.price;
	buyer.addItems([item]);
	buyer.removeItems([item]);

	trades.splice(tradeIndex, 1);

	actions.messageEM.inventoryUpdate(buyer);
	actions.messageEM.inventoryUpdate(seller);
}

module.exports = tradeResponse;
