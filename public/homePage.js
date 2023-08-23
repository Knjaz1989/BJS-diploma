logoutButton = new LogoutButton();

logoutButton.action = () => {
	ApiConnector.logout(
    response => {
      if (response.success) {
        location.reload();
      }
    }
  );
}

ApiConnector.current(
	response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
		}
	}
);

let ratesBoard = new RatesBoard();

let getCurrency = () => {
	ApiConnector.getStocks(
		response => {
      if (response.success){
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
      }
		}
	);
};


getCurrency();
setInterval(getCurrency, 60000);


let moneyManager = new MoneyManager();

let moneyCallback = (response) => {
  if (response.success){
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(response.success, "Успешно");
  } else {
    moneyManager.setMessage(response.success, response.error);
  }
};

moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, moneyCallback)
};

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, moneyCallback);
};

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, moneyCallback);
};


let favoritesWidget = new FavoritesWidget();
let clearAddTableData = (data) => {
  favoritesWidget.clearTable();
  favoritesWidget.fillTable(data);
  moneyManager.updateUsersList(data);
};

ApiConnector.getFavorites(
  response => {
    if (response.success){
      clearAddTableData(response.data);
    }
  }
);

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(
    data,
    response => {
      if (response.success){
        clearAddTableData(response.data);
        moneyManager.setMessage(response.success, "Успешно");
      } else {
        moneyManager.setMessage(response.success, response.error);
      }
    }
  );
};

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(
    data,
    response => {
      if (response.success){
        clearAddTableData(response.data);
        moneyManager.setMessage(response.success, "Успешно");
      } else {
        moneyManager.setMessage(response.success, response.error);
      }
    }
  );
};
