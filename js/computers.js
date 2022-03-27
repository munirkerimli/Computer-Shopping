var computersTableBodyElement = document.getElementById('computers-table-body');
var mainContentElement = document.getElementById('main-content');
var saveComputerModalElement = document.getElementById('save-computer-modal');
var saveComputerModalCloseButtonElement = document.getElementById('save-computer-modal-close-button');
var computerImageInputElement = document.getElementById('computer-image');
var computerImageShowElement = document.getElementById('computer-image-show');
var computerNameElement = document.getElementById('computer-name');
var computerPriceElement = document.getElementById('computer-price');
var computerDescriptionElement = document.getElementById('computer-description');
var computerIsNew = document.getElementById('computer-isNew');
var computerRam = document.getElementById('computer-ram');
var computerCpu = document.getElementById('computer-cpu');
var computerMemory = document.getElementById('computer-drive');
var computerMemoryType = document.getElementById('computer-drive-type');
var computerOs = document.getElementById('computer-os');
var computerVideoCard = document.getElementById('computer-video-card');
var saveButton = document.getElementById('saveBtn');
var resetButton = document.getElementById('resetBtn');
var computerCategoryElement = document.getElementById('computer-category');
var saveComputerHeaderMessage = document.getElementById('save-computer-header-message');
var saveComputerModalForm = document.getElementById('save-computer-modal-form');
var computersTableElement = document.getElementById('computers-table');
var computersLoading = document.getElementById('computers-loading');
var computerImageModalElement = document.getElementById('computer-image-modal');
var computerModalImageShowElement = document.getElementById('computer-modal-image-show');
var computerImagePath = computerImageInputElement.value;

var editMode = false;
var selectedComputerId = 0;
var computers = [];
var computersString = localStorage.getItem('computers');
if(computersString==null){

} else{
    computers = JSON.parse(computersString);
}

var computersGlobal = computers.slice();

var loggedInUserId = localStorage.getItem('logged-in-user-id');
if(loggedInUserId==null){
    computers = [];
    window.location.href = 'index.html';
} else{
    mainContentElement.style.display = 'block';
}

var userComputers = [];

for(let i=0;i<computers.length;i++){
    const c = computers[i];
    if(c.userId==loggedInUserId){
        userComputers.push(c);
    }
}

computers = userComputers;

console.log(computers)

var usersString = localStorage.getItem('users');
var users = JSON.parse(usersString);

function onNewComputer(){
    editMode = false;
    selectedComputerId = 0;
    saveComputerModalElement.style.display = 'block';
    saveComputerHeaderMessage.innerHTML = 'Yeni';
}

var categories = [];
var categoriesString = localStorage.getItem('categories');
if(categoriesString==null){

} else{
    categories = JSON.parse(categoriesString);
}

saveComputerModalCloseButtonElement.addEventListener('click',function(event){
    saveComputerModalElement.style.display = 'none';
});

window.addEventListener('click',function(event){
    if(event.target == computerImageModalElement){
        computerImageModalElement.style.display = 'none';
    }
})

function refreshComputers() {
    computersTableBodyElement.innerHTML = '';
    var computersTableBodyElementHtml = '';
    for (let index = 0; index < computers.length; index++) {
        const computer = computers[index];
        computersTableBodyElementHtml += '<tr><td>' + computer.id;
        computersTableBodyElementHtml += '</td><td>' + computer.name;
        computersTableBodyElementHtml += '</td><td><img class="computer-image" src="' +
            computer.imagePath;
        computersTableBodyElementHtml += '" onclick="onImageSelected(\'' + computer.imagePath + '\')" /></td><td>' + computer.price;

        computersTableBodyElementHtml += ' AZN</td><td> <button class="btn btn-danger"' +
            ' onclick="onDeleteComputer(' + computer.id + ')" >Sil</button>  ' +
            '<button class="btn btn-primary" onclick="onEditComputer(' + computer.id +
            ')">Redaktə</button>  ';
        computersTableBodyElementHtml += '</td></tr>';
    }
    computersTableBodyElement.innerHTML = computersTableBodyElementHtml;
}

refreshComputers();

computerCategoryElement.innerHTML = '';
var computerCategoryElementHTML = '';
for(let i=0;i<categories.length;i++){
    const c = categories[i];
    computerCategoryElementHTML += '<option value="'+c.id+'"> ' + c.name + '</option>';
}

computerCategoryElement.innerHTML = computerCategoryElementHTML;

function onComputerImageChanged(imageInputElement){
    var imageValue = imageInputElement.value;
    imageValue = imageValue.trim();
    if(imageValue == ''){
        computerImageShowElement.style.display = 'none';
    } else {
        computerImageShowElement.style.display = 'block';
        computerImageShowElement.src = imageValue;
    }
}

function onSaveComputer(event){
    event.preventDefault();
    var computer = {};
    var computerId = 0;
    for(let i=0;i<computersGlobal.length;i++){
        const c = computersGlobal[i];
        if(c.id>computerId){
            computerId = c.id;
        }
    }
    computerId++;
    computer.id = computerId;
    computer.name = computerNameElement.value;
    computer.price = Number(computerPriceElement.value);
    computer.imagePath = computerImageInputElement.value;
    computer.description = computerDescriptionElement.value;
    computer.isNew = computerIsNew.value;
    computer.ram = Number(computerRam.value);
    computer.cpu = computerCpu.value;
    computer.drive = Number(computerMemory.value);
    computer.driveType = computerMemoryType.value;
    computer.os = computerOs.value;
    computer.videoCard = Number(computerVideoCard.value);
    computer.categoryId = Number(computerCategoryElement)
    computer.userId = Number(loggedInUserId);
    console.log(computer);

    for(let j=0;j<users.length;j++){
        const u = users[j];
        if(u.id=== computer.userId){
            computer.phone = u.phone;
            break;
        }
    }


    if(editMode){
        computer.id = selectedComputerId;
        for(let i=0;i<computersGlobal.length;i++){
            const c = computersGlobal[i];
            if(c.id == selectedComputerId){
                computersGlobal[i] = computer;
                break;
            }
        }
        alert('Komputer ugurla redakte olundu!');
    } else {
        computersGlobal.push(computer);
        alert('Komputer ugurla qeydiyyat olundu!');
    }

    localStorage.setItem('computers',JSON.stringify(computersGlobal));

    window.location.reload();

    userComputers = [];
    for(let i=0;i<computersGlobal.length;i++){
        const c = computersGlobal[i];
        if(c.userId==loggedInUserId){
            userComputers.push(c);
        }
    }

    computers = userComputers;

    refreshComputers();
}

function onDeleteComputer(computerId){
    var result = confirm('Komputeri silmekden eminsiniz?');
    if(result){
        for(let i=0;i<computersGlobal.length;i++){
            const c = computersGlobal[i];
            if(c.id == computerId){
                computersGlobal.splice(i,1);
                break;
            }
        }

        localStorage.setItem('computers',JSON.stringify(computersGlobal));
        userComputers = [];
        for(let i=0;i<computersGlobal;i++){
            const computer = computersGlobal[i];
            if(computer.userId == loggedInUserId){
                userComputers.push(computer);
            }
        }

        computers = userComputers;
        alert('Komputer ugurla silindi!');
        window.location.reload();
    }
}

function onEditComputer(computerId){
    editMode = true;
    selectedComputerId = computerId;
    saveComputerModalElement.style.display = 'block';
    saveComputerHeaderMessage.innerHTML = 'Redakte';
    setTimeout(()=>{
        var selectedComputer = {};
        for(let i=0;i<computersGlobal.length;i++){
            const c = computersGlobal[i];
            if(computer.id == computerId){
                selectedComputer = computer;
                break;
            }
        }
        computerCategoryElement.value = selectedComputer.categoryId;
        computerNameElement.value = selectedComputer.name;
        computerPriceElement.value = selectedComputer.price;
        computerDescriptionElement.value = selectedComputer.description;
        computerIsNew.value = selectedComputer.isNew;
        computerImageInputElement.value = selectedComputer.imagePath;

        var imageValue = selectedComputer.imagePath;
        if(imageValue == ''){
            computerImageShowElement.style.display = 'none';
        } else{
            computerImageShowElement.style.display = 'block';
            computerImageShowElement.src = imageValue;
        }

        computerRam.value = selectedComputer.ram;
        computerCpu.value = selectedComputer.cpu;
        computerMemoryType.value = selectedComputer.driveType;
        computerMemory.value = selectedComputer.drive;
        computerOs.value = selectedComputer.os;
        computerVideoCard.value = selectedComputer.videoCard;
    }, 500);
}

function resetComputerForm(){
    computerImageShowElement.style.display = 'none';
}

var computersTableBodyElementHtml = '';
function addComputersToPage(computersLocal) {

    for (let index = 0; index < computersLocal.length; index++) {
        const computer = computersLocal[index];
        computersTableBodyElementHtml += '<tr><td>' + computer.id;
        computersTableBodyElementHtml += '</td><td>' + computer.name;
        computersTableBodyElementHtml += '</td><td><img style="width:120px;" src="' +
            computer.imagePath;
        computersTableBodyElementHtml += '" /></td><td>' + computer.price;

        computersTableBodyElementHtml += ' AZN</td><td> <button class="btn btn-danger"' +
            ' onclick="onDeleteComputer(' + computer.id + ')" >Sil</button>  ' +
            '<button class="btn btn-primary" onclick="onEditComputer(' + computer.id +
            ')">Redaktə</button>  ';
        computersTableBodyElementHtml += '</td><tr>';
    }
    computersTableBodyElement.innerHTML = computersTableBodyElementHtml;
}

function onSearchKeyDown(event){
    if(event.keyCode == 13){
        computersTableElement.style.display = 'none';
        computersLoading.style.display = 'block';
        computersTableBodyElement.innerHTML = '';
        computersTableBodyElementHtml = '';
        setTimeout(()=>{
            computersTableElement.style.display = 'block';
            computersLoading.style.display = 'none';
            var searchValue = event.target.value.toLowerCase();
            searchValue = searchValue.trim();
            var findedComputers = [];
            for(let i=0;i<computers.length;i++){
                const c = computers[i];
                if(c.name.toLowerCase().includes(searchValue)){
                    findedComputers.push(c);
                }
            }
            addComputersToPage(findedComputers);
        } ,500)
    }
}

function onImageSelected(computerImagePath){
    computerImageModalElement.style.display = 'block';
    computerModalImageShowElement.src = computerImagePath;
}