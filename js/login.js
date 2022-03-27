var usernameElement = document.getElementById('username');
var passwordElement = document.getElementById('password');
var usernameBlankError = document.getElementById('username-blank-error');
var passwordBlankError = document.getElementById('password-blank-error');

var loginSuccessAlertElement = document.getElementById('login-success-alert');
var loginErrorAlertElement = document.getElementById('login-error-alert');

var users = [];
var usersString = localStorage.getItem('users');

if(usersString==null){

} else {
    users = JSON.parse(usersString);
}  

function onLogin(event){
    event.preventDefault();
    var username = usernameElement.value;
    var password = passwordElement.value;

    var userLoggedIn = false;

    if(username==''){
        usernameBlankError.style.display = 'block';
    } else{
        usernameBlankError.style.display = 'none';
    }

    if(password==''){
        passwordBlankError.style.display = 'block';
    } else{
        passwordBlankError.style.display = 'none';
    }

    for(let i=0;i<users.length;i++){
        const u = users[i];
        if(u.username === username && u.password===password){
            userLoggedIn = true;
            localStorage.setItem('logged-in-user-id',u.id);
            localStorage.setItem('logged-in-user-name',u.username);
        }
    }

    if(userLoggedIn){
        localStorage.setItem('show-success-login-message','');
        loginSuccessAlertElement.innerHTML = "Məlumatlar doğrudur!";
        loginSuccessAlertElement.style.display = 'block';
        loginErrorAlertElement.style.display = 'none';
        
        setTimeout(()=>{
            window.location.href = 'index.html';
        },500);
    } else{
        localStorage.removeItem('logged-in-user-id');
        localStorage.removeItem('logged-in-user-name');
        showLoginErrorMessage();
    }
}

function showLoginErrorMessage(){
    loginErrorAlertElement.innerHTML = 'Məlumatlar yanlışdır!';
    loginErrorAlertElement.style.display = 'block';
}

console.log(localStorage);