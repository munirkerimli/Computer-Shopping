var userFullNameElement = document.getElementById('user-full-name');
var userPhoneElement = document.getElementById('user-phone-number');
var usernameElement = document.getElementById('username');
var passwordElement = document.getElementById('password');

var userExistsErrorAlertElemnt = document.getElementById('user-exists-error-alert');
var userCreatedAlertElement = document.getElementById('user-created-alert');

var users = [];
var usersString = localStorage.getItem('users');

if(usersString == null){

} else{
    users = JSON.parse(usersString);
}

// users = {
//    'name': 'Ekber',
//    'phone': '050-789-78-45',
//    'username': 'akbar',
//    'password': '123'
// }

function onCreateAccount(event){
    event.preventDefault();

    var userFullName = userFullNameElement.value ;
    var userPhone = userPhoneElement.value;
    var username = usernameElement.value;
    var password = passwordElement.value;

    var usernameExists = false;

    for(let i = 0; i< users.length; i++){
        const u = users[i];
        if(u.username === username){
            usernameExists = true;
            break;
        }
    }

    if(usernameExists){
        userExistsErrorAlertElemnt.innerHTML = 'Bu istifadəçi adı artıq mövcuddur';
        userExistsErrorAlertElemnt.style.display = 'block';
        setTimeout(() => {
            userExistsErrorAlertElemnt.style.display = 'none';
        }, 1500);
    } else{
        var userId = 0;
        for(let i = 0; i < users.length; i++){
            const u = users[i];
            if(u.id > userId){
                userId = u.id;
            }
        }

        userId++;
        var user = {};
        user.id = userId;
        user.name = userFullName;
        user.phone = userPhone;
        user.username  = username;
        user.password = password;
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));

        userCreatedAlertElement.innerHTML = 'İstifadəçi uğurla yaradıldı.';
        userCreatedAlertElement.style.display = 'block';
        
        setTimeout(() => {
            userCreatedAlertElement.style.display = 'none';
            window.location.href = 'login.html';
        }, 1000);
        
    }
}