const userForm = new UserForm();
userForm.loginFormCallback = data => {
    ApiConnector.login(
        data, 
        (response) => {
            if (response.success){
                location.reload();
            } else {
                alert(response.error);
            }
        }
    );
    
};
