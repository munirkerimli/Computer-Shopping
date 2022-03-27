var users = [];
var categories = [];
var computers = [];

var settingsBtn = document.getElementById('settingsBtn');
var computersBtn = document.getElementById('computersBtn');
var ordersBtn = document.getElementById('ordersBtn');
var shoppingBtn = document.getElementById('shoppingBtn');

var loginButton = document.getElementById('loginBtn');
var logoutButton = document.getElementById('logoutBtn');
var adminPageButton = document.getElementById('adminPageBtn');
var userLoggedIn = false;

var loggedInUserId = localStorage.getItem('logged-in-user-id');
if(loggedInUserId == null){
    userLoggedIn = false;   
} else{
    userLoggedIn = true;
}

var showSuccessLoginMessage = localStorage.getItem('show-success-login-message');
if(showSuccessLoginMessage == null){

} else{
    document.getElementById('success-login-alert').style.display = 'block';
    localStorage.removeItem('show-success-login-message');
    setTimeout(() => {
        document.getElementById('success-login-alert').style.display = 'none';
    }, 3000);
}

function showButtons(){
    if(userLoggedIn){
        settingsBtn.style.display = 'inline-block';
        computersBtn.style.display = 'inline-block';
        ordersBtn.style.display = 'inline-block';
        shoppingBtn.style.display = 'inline-block';
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
    } else{
        settingsBtn.style.display = 'inline-block';
        computersBtn.style.display = 'none';
        ordersBtn.style.display = 'none';
        shoppingBtn.style.display = 'none';
        logoutButton.style.display = 'none';
        loginButton.style.display = 'inline-block';
    }
}

showButtons();

function onLogout(){
    setTimeout(() => {
        userLoggedIn = false;
        localStorage.removeItem('logged-in-user-id');
        localStorage.removeItem('logged-in-user-name');
        showButtons();
        document.getElementById('success-logout-alert').style.display = 'block';
        showUsername();
        setTimeout(()=>{
            document.getElementById('success-logout-alert').style.display = 'none';
        },3000);
    }, 500);
}

function addObjects(){
    for(let i = 1; i < 6; i++){
        users.push({id: i, name: `User-${i}`, phone: '055-885-90-10', username: `u${i}`, password: `p${i}`});
    }
    users.push({id: 6, name: 'Admin', phone: '055-885-90-10', username: 'admin', password: 'admin'});

    // Add categories
    let nameList = ['Acer', 'HP', 'Asus', 'Dell', 'Lenovo']
    for(let i = 0; i < nameList.length; i++){
        categories.push({id: i+1, name: nameList[i]});
    }

    // Add computers - Acer
    for(let i = 1; i < 11; i++){
        computers.push({id: i, name: `Acer-${i}`, price: 570, description: `Acer-${i} desc`, isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});
    }
    
    var idCounter = 40;
    for(let i = 0 ; i< 40; i++){
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Acer '+idCounter,
            price: computers[i].price,
            description: 'Acer '+ idCounter+ 'desc',
            isNew: computers[i].isNew,
            imagePath : 'images/acer.jpg',
            userId: computers[i].userId,
            categoryId: 1
        })
    }


    // HP komputerleri elave et
    for(let i = 0 ; i < 200; i++){
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'HP '+idCounter,
            price: computers[i].price,
            description: 'HP '+ idCounter+ 'desc',
            isNew: computers[i].isNew,
            imagePath : 'images/hp.jpg',
            userId: computers[i].userId,
            categoryId: 2
        })
    }

    // Asus komputerler elave et

    for(let i = 0 ; i < 200; i++){
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Asus '+idCounter,
            price: computers[i].price,
            description: 'Asus '+ idCounter+ 'desc',
            isNew: computers[i].isNew,
            imagePath : 'images/asus.jpg',
            userId: computers[i].userId,
            categoryId: 3
        })
    }

    //Dell komputer elave et
    for(let i = 0 ; i < 200; i++){
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Dell '+idCounter,
            price: computers[i].price,
            description: 'Dell '+ idCounter+ 'desc',
            isNew: computers[i].isNew,
            imagePath : 'images/dell.jpg',
            userId: computers[i].userId,
            categoryId: 4
        })
    }

    // Lenovo komputer elave et
    for(let i = 0 ; i < 200; i++){
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Lenovo '+idCounter,
            price: computers[i].price,
            description: 'Lenovo '+ idCounter+ 'desc',
            isNew: computers[i].isNew,
            imagePath : 'images/lenovo.jpg',
            userId: computers[i].userId,
            categoryId: 5
        })
    }

    for(let i = 0; i<computers.length;i++){
        const c = computers[i];
        c.ram = 8;
        c.cpu = 'Core i 9';
        c.drive = 500;
        c.driveType = (i % 2 == 0) ? 'hdd' : 'ssd'; // ternar operation
        c.os = 'Windows 10';
        c,videoCard = 3;
    }

    for(var i = 0; i < computers.length;i++){
        const c = computers[i];

        for(let j = 0; j < users.length ; j++){
            const u = users[j];
            if(u.id === c.userId){
                c.phone = u.phone;
                break;
            }
        }
    }


}

// Butun komputerleri elave et
addObjects();

function loadDataFromLocalStorage(){
    var usersString = localStorage.getItem('users');
    var categoriesString = localStorage.getItem('categories');
    var computersString = localStorage.getItem('computers');

    if(usersString == null){
        localStorage.setItem('users',JSON.stringify(users));
    } else{
        users = JSON.parse(usersString);
    }

    if(categoriesString == null){
        localStorage.setItem('categories',JSON.stringify(categories));
    } else{
        categories = JSON.parse(categoriesString);
    }

    if(computersString == null){
        localStorage.setItem('computers',JSON.stringify(computers));
    } else{
        computers = JSON.parse(computersString);
    }
}

loadDataFromLocalStorage();

console.log('Butun komputerlerin sayi: '+computers.length);
console.log('userlerin sayi = '+users.length);

function onClearLocalStorage(){
    let removeList = ['users', 'categories', 'computers', 'basketComputers', 'orders', 'customers', 'order-customers', 'logged-in-user-id'];
    for(let i = 0; i < removeList.length; i++){
        localStorage.removeItem(removeList[i]);    
    }
    window.location.reload();
}

var customers = [];
for(let i = 1; i < 5; i++){
    customers.push({id: i, name: `Customer-${i}`, address: `Customer-${i} address`, phone: '055-234-5678', email: `customer${i}@gmail.com`});
}


var customersString  = localStorage.getItem('customers');

if(customersString == null){
    localStorage.setItem('customers', JSON.stringify(customers));
} else{
    customers = JSON.parse(customersString);
}

var orders = [];

// 1-ci sifarisin qeydiyyati

var order1 = {};
order1.id = 1;
order1.note = " 2 gun erzinde catdirilsin";
var order1BasketComputers = [];
order1BasketComputers.push({id: 1, count : 7, computer: computers[1]});
order1BasketComputers.push({id: 2, count : 4, computer: computers[3]});
order1BasketComputers.push({id: 3, count : 2, computer: computers[2]});
order1.basketComputers = order1BasketComputers;
order1.customer = customers[1];
order1.userId = 1;
order1.register = new Date(2021, 06, 26);
order1.totalprice = calculateOrderTotalPrice(order1);


// 2-ci sifarisin qeydiyyati

var order2 = {};
order2.id = 1;
order2.note = " 2 gun erzinde catdirilsin ve elave olaraq 4 eded maus olsun";
var order2BasketComputers = [];
order2BasketComputers.push({id: 1, count : 10, computer: computers[19]});
order2BasketComputers.push({id: 2, count : 4, computer: computers[45]});
order2BasketComputers.push({id: 3, count : 5, computer: computers[23]});
order2.basketComputers = order2BasketComputers;
order2.customer = customers[2];
order2.userId = 1;
order2.register = new Date(2021, 06, 26);
order2.totalprice = calculateOrderTotalPrice(order2)

// 3-ci sifarisin qeydiyyati

var order3 = {};
order3.id = 1;
order3.note = " 2 gun erzinde catdirilsin";
var order3BasketComputers = [];
order3BasketComputers.push({id: 1, count : 7, computer: computers[10]});
order3BasketComputers.push({id: 2, count : 4, computer: computers[36]});
order3BasketComputers.push({id: 3, count : 2, computer: computers[22]});
order3.basketComputers = order3BasketComputers;
order3.customer = customers[3];
order3.userId = 1;
order3.register = new Date(2021, 06, 26);
order3.totalprice = calculateOrderTotalPrice(order3);

orders.push(order1);
orders.push(order2);
orders.push(order3);

var ordersString = localStorage.getItem('orders');

if(ordersString == null){
    localStorage.setItem('orders',JSON.stringify(orders));
} else{
    orders = JSON.parse(ordersString);
}

function calculateOrderTotalPrice(order){
    var totalPrice = 0;
    for(let i=0;i<order.basketComputers.length;i++){
        const b = order.basketComputers[i];
        totalPrice+=b.count*b.computer.price;
    }

    return totalPrice;
}





var loggedInUserName = document.getElementById('logged-in-user-name');

function showUsername(){
    if(userLoggedIn){
        var username = '';
        for(let i = 0 ; i < users.length; i++){
            const user = users[i];
            if(user.id == loggedInUserId){
                username = user.username;
                break;
            }
        }

        loggedInUserName.innerHTML = username;
        if(username === 'admin'){
            adminPageButton.style.display = 'inline-block';
        } else{
            adminPageButton.style.display = 'none';
        }
    } else{
        loggedInUserName.innerHTML = '';
        adminPageButton.style.display = 'none';
    }
}



showUsername();
