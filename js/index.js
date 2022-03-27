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
    // Add users
    users.push({id: 1, name: 'User-1', phone: '055-885-90-10', username: 'u1', password: 'p1'});
    users.push({id: 2, name: 'User-2', phone: '055-885-90-10', username: 'u2', password: 'p2'});
    users.push({id: 3, name: 'User-3', phone: '055-885-90-10', username: 'u3', password: 'p3'});
    users.push({id: 4, name: 'User-4', phone: '055-885-90-10', username: 'u4', password: 'p4'});
    users.push({id: 5, name: 'User-5', phone: '055-885-90-10', username: 'u5', password: 'p5'});
    users.push({id: 6, name: 'Admin', phone: '055-885-90-10', username: 'admin', password: 'admin'});

    // Add categories
    categories.push({id: 1, name: 'Acer'});
    categories.push({id: 2, name: 'HP'});
    categories.push({id: 3, name: 'Asus'});
    categories.push({id: 4, name: 'Dell'});
    categories.push({id: 5, name: 'Lenovo'});

    // Add computers - Acer
    computers.push({id: 1, name: 'Acer-1', price: 570, description: 'Acer-1 desc', isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});
    computers.push({id: 2, name: 'Acer-2', price: 570, description: 'Acer-2 desc', isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});
    computers.push({id: 3, name: 'Acer-3', price: 570, description: 'Acer-3 desc', isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});
    computers.push({id: 4, name: 'Acer-4', price: 570, description: 'Acer-4 desc', isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});
    computers.push({id: 5, name: 'Acer-5', price: 570, description: 'Acer-5 desc', isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});
    computers.push({id: 6, name: 'Acer-6', price: 570, description: 'Acer-6 desc', isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});
    computers.push({id: 7, name: 'Acer-7', price: 570, description: 'Acer-7 desc', isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});
    computers.push({id: 8, name: 'Acer-8', price: 570, description: 'Acer-8 desc', isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});
    computers.push({id: 9, name: 'Acer-9', price: 570, description: 'Acer-9 desc', isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});
    computers.push({id: 10, name: 'Acer-10', price: 570, description: 'Acer-10 desc', isNew: false, imagePath: 'images/acer.jpg',userId: 1, categoryId:1});

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
    localStorage.removeItem('users');
    localStorage.removeItem('categories');
    localStorage.removeItem('computers');
    localStorage.removeItem('basketComputers');
    localStorage.removeItem('orders');
    localStorage.removeItem('customers');
    localStorage.removeItem('order-customer');
    localStorage.removeItem('logged-in-user-id');
    window.location.reload();
}

var customers = [];
customers.push({id: 1, name: 'Customer-1', address: 'Customer-1 address', phone: '055-234-5678', email: 'customer1@gmail.com'});
customers.push({id: 2, name: 'Customer-2', address: 'Customer-2 address', phone: '055-234-5678', email: 'customer2@gmail.com'});
customers.push({id: 3, name: 'Customer-3', address: 'Customer-3 address', phone: '055-234-5678', email: 'customer3@gmail.com'});
customers.push({id: 4, name: 'Customer-4', address: 'Customer-4 address', phone: '055-234-5678', email: 'customer4@gmail.com'});


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
