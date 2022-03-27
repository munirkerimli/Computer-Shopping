function onClearLocalStorage(){
     var result = confirm('Eminsiniz?');
     let list = ['users', 'categories', 'logged-in-user-id', 'logged-in-user-name', 'computers', 'basketComputers', 'orders', 'customers', 'order-customers'];
     if(result){
          for(let i = 0; i < list.length; i++){
               localStorage.removeItem(list[i]);
          }
         alert('Melumatlar sifirlandi')
     }
}

var totalStepMarkElement = document.getElementById('totalValue');
function calculateTotalStepMark(){
    var totalStepMark = 0;
    var stepMarkElements = document.getElementsByClassName('step-mark');
    for(let i = 0; i < stepMarkElements.length; i++){
        const stepMarkElement = stepMarkElements[i];
        totalStepMark += Number(stepMarkElement.innerHTML);
    }

    totalStepMarkElement.innerHTML = totalStepMark;
}

calculateTotalStepMark();
