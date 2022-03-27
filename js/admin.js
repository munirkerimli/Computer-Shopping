var computerCategoriesElement = document.getElementById('computer-categories-div');
var categoryNameInputElement = document.getElementById('category-name-input');
var saveCategoryButtonElement = document.getElementById('save-category-button');
var resetCategoryFormButtonElement = document.getElementById('reset-category-button');
var deleteCategoryFormButtonElement = document.getElementById('delete-category-button');
var saveCategoryFormElement = document.getElementById('save-category-form');
var mainContentElement = document.getElementById('category-search-input');
var categorySearchInputElement = document.getElementById('category-search-input');

// Sehife acilanda icra olunan emeliyyatlar
deleteCategoryFormButtonElement.style.display = 'none';

// Qlobal deyisenler
var editMode = false;
var selectedComputerCategoryId = 0;
var categories = [];
var categoriesString = localStorage.getItem('categories');
var loggedInUserName = localStorage.getItem('logged-in-user-name');
var currentSelectedCategoryId = 0; 
var currentSelectedCategoryName = '';
var categoriesGlobal = [];

// Kateqoriyalari yaddasdan goturmek
if(categoriesString==null){

}else{
    categories = JSON.parse(categoriesString);
    categoriesGlobal = categories.slice();
}

// Eger daxil olan sexs admin deyilse onda hemin sexsi giris sehifesine yonlendirek
if(loggedInUserName!='admin'){
    categories = [];
    window.location.href = 'index.html';
} else{
    mainContentElement.style.display = 'block';
}

// Computer kateqoriyalarini ekrana getirmek
function loadComputerCategories(){
    var computerCategoriesElementHTML = '<ul class="list-group">';
    for (let i = 0; i < categories.length; i++) {
        const c = categories[i];
        computerCategoriesElementHTML+='<li class="list-group-item list-group-item-action" id="computer-category-'+c.id+'" onclick="onCategorySelected('+c.id+')">'+c.name+'</li>';
        
    }
    computerCategoriesElementHTML+='</ul>';
    computerCategoriesElement.innerHTML = computerCategoriesElementHTML;
}

loadComputerCategories();

// Siyahidan kateqoriya secilende icra olunan metod
function onCategorySelected(categoryId) {
    if(currentSelectedCategoryId===categoryId){

    } else{
        currentSelectedCategoryId = categoryId;
        selectedComputerCategoryId = currentSelectedCategoryId;
        var categoryName = '';
        deleteCategoryFormButtonElement.style.display = 'inline-block';
        for(let i=0;i<categories.length;i++){
            const c = categories[i];
            if(c.id===categoryId){
                document.getElementById('computer-category-'+c.id).style.color = 'blue'
                document.getElementById('computer-category-'+c.id).style.fontWeight = 'bold';
                categoryName = c.name;
            } else{
                document.getElementById('computer-category-'+c.id).style.color = 'black';
                document.getElementById('computer-category-'+c.id).style.fontWeight = 'normal';
            }
        }
        categoryNameInputElement.value = categoryName;
        currentSelectedCategoryName = categoryName;
        saveCategoryButtonElement.innerHTML = 'Redakde et';
        saveCategoryButtonElement.disabled = true;
        saveCategoryButtonElement.style.cursor = 'not-allowed';
        editMode = true;
    }
}

//Formu temizlemek

function resetForm(){
    saveCategoryFormElement.reset();
    saveCategoryButtonElement.innerHTML = 'Qeydiyyat et';
    editMode = false;
    deleteCategoryFormButtonElement.style.display = 'none';
    currentSelectedCategoryName = '';
    currentSelectedCategoryId = 0;
}

function onSaveCategory(event){
    event.preventDefault();
    var computerCategory = {};
    var categoryId = 0;
    for(let i=0;i<categoriesGlobal.length;i++){
        const c = categoriesGlobal[i];
        if(c.id > categoryId){
            categoryId = c.id;
        }
    }
    categoryId++;
    computerCategory.id = categoryId;
    computerCategory.name = categoryNameInputElement.value.trim();
    if(editMode){
        var categoryExists = false;
        for(let i=0;i<categoriesGlobal.length;i++){
            const c = categoriesGlobal[i];
            if(c.name == computerCategory.name){
                categoryExists = true;
                break;
            }
        }

        if(categoryExists){
            alert('Bu kateqoriya adı artıq mövcuddur');
        } else{
            // save
            computerCategory.id = selectedComputerCategoryId;
            for(let i=0;i<categoriesGlobal.length;i++){
                const c = categoriesGlobal[i];
                if(c.id===selectedComputerCategoryId){
                    categoriesGlobal[i] = computerCategory;
                    break;
                }
            }
            localStorage.setItem('categories',JSON.stringify(categoriesGlobal));
            categories = categoriesGlobal.slice();
            loadComputerCategories();
            resetForm();
            alert('Kateqoriya uğurla redaktə olundu');
            categorySearchInputElement.value = '';
        }
    } else {
        //add category
        var categoryExists = false;
        for(let i=0;i<categoriesGlobal.length;i++){
            const c = categoriesGlobal[i];
            if(c.name===computerCategory.name){
                categoryExists = true;
                break;
            }
        }
        if(categoryExists){
            alert('Bu kateqoriya adı artıq mövcuddur');
        } else {
            categoriesGlobal.push(computerCategory);
            localStorage.setItem('categories',JSON.stringify(categoriesGlobal));
            categories = categoriesGlobal.slice();
            loadComputerCategories();
            currentSelectedCategoryId = 0;
            currentSelectedCategoryName = '';
            alert('Uğurla qeydiyyat olundu');
            categorySearchInputElement.value = '';
        }
    }
}

//Siyahidan secilmis kateqoriyani silmek
deleteCategoryFormButtonElement.addEventListener('click',function(){
    if(editMode){
        var result = confirm('Kateqoriyani silmeye eminsiniz?');
        if(result){
            for(let i=0;i<categoriesGlobal.length;i++){
                const c = categoriesGlobal[i];
                if(c.id == currentSelectedCategoryId){
                    categoriesGlobal.splice(i,1);
                    break;
                }
            }
            categories = categoriesGlobal.slice();
            loadComputerCategories();
            localStorage.setItem('categories',JSON.stringify(categories));
            resetForm();
            alert('Silindi!!!');
            categorySearchInputElement.value = '';
        }
    } else{
        alert('Siyahidan secim edilmeyib!!!');
    }
});

function onCategoryNameChanged(categoryNameInput){
    var localName = categoryNameInput.value.trim();
    if(localName === currentSelectedCategoryName || localName === ''){
        saveCategoryButtonElement.disabled = true;
        saveCategoryButtonElement.style.cursor = 'not-allowed';
    } else {
        saveCategoryButtonElement.disabled = false;
        saveCategoryButtonElement.style.cursor = 'pointer';
    }
}

function searchCategory(searchInput){
    var searchText = searchInput.value.trim();
    searchText = searchText.toLowerCase();
    categories = [];
    for(let i=0;i<categoriesGlobal.length;i++){
        const c = categoriesGlobal[i];
        if(c.name.toLowerCase().includes(searchText)){
            categories.push(c);
        }
    }
    loadComputerCategories();
}