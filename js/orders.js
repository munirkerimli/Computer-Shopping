var ordersTableBodyElement = document.getElementById('orders-table-body');
var orders = [];
var ordersString = localStorage.getItem("orders");
if (ordersString == null) {
} else {
    orders = JSON.parse(ordersString);
}
var mainContentElement = document.getElementById('main-content');


var loggedInUserId = localStorage.getItem("logged-in-user-id");
if (loggedInUserId == null) {
    orders = [];
    window.location.href = 'index.html';
} else {

    mainContentElement.style.display = 'block';
}

var userOrders = [];
for (let index = 0; index < orders.length; index++) {
    const order = orders[index];
    if (order.userId == loggedInUserId) {
        userOrders.push(order);
    }

}
orders = userOrders;



function refreshOrders() {
    ordersTableBodyElement.innerHTML = '';
    ordersTableBodyElementHtml = '';
    for (let index = 0; index < orders.length; index++) {
        const order = orders[index];
        ordersTableBodyElementHtml += '<tr><td>' + order.id;
        ordersTableBodyElementHtml += '</td><td>' + order.register.split('T')[0];
        ordersTableBodyElementHtml += '</td><td>' + "<ul><li>Ad: " + order.customer.name +
            "</li><li>Ünvan: " + order.customer.address + "</li><li>Telefon: " + order.customer.phone +
            "</li><li>Email: " + order.customer.email + "</li></ul>";
        ordersTableBodyElementHtml += '</td><td style="padding-left:30px;">' + "<ol>";
        for (let i = 0; i < order.basketComputers.length; i++) {
            const b = order.basketComputers[i];
            ordersTableBodyElementHtml += '<li>' + b.computer.name + '<ul><li>Qiyməti: ' + b.computer.price +
                ' AZN</li><li>Miqdarı: ' + b.count + ' ədəd</li><li>Ümumi qiymət: ' + (b.count * b.computer.price) +
                ' AZN</li></ul></li>';
        }
        ordersTableBodyElementHtml += '</ol></td><td style="color:red;font-weight:bold;">' +
            order.totalprice;
        ordersTableBodyElementHtml += ' AZN</td><td>' + order.note;
        ordersTableBodyElementHtml += '</td></tr>';
    }
    ordersTableBodyElement.innerHTML = ordersTableBodyElementHtml;
}
refreshOrders();

console.log('orders.js end');