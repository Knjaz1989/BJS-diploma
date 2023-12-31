logoutButton = new LogoutButton();

logoutButton.action = () => {
	ApiConnector.logout(
    response => {
      if (response.success) {
        clearInterval(intervalId);
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
let intervalId = setInterval(getCurrency, 60000);


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
let widgetCallback = (response) => {
  if (response.success){
    clearAddTableData(response.data);
    moneyManager.setMessage(response.success, "Успешно");
  } else {
    moneyManager.setMessage(response.success, response.error);
  }
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
    widgetCallback
  );
};

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(
    data,
    widgetCallback
  );
};
