const userForm = new UserForm();

function responsecallback(response) {
  if (response.success) {
    location.reload();
  } else {
    alert(response.error);
  }
}

userForm.loginFormCallback = data => {
  ApiConnector.login(data, responsecallback);
};

userForm.registerFormCallback = data => {
  ApiConnector.register(data, responsecallback);
};
