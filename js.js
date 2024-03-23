//variables
const toDoInputEle = document.querySelector('#toDoInput');
const toDoInputSubmitBtnEle = document.querySelector('#toDoInputSubmitBtn');
const showTodoListEle = document.querySelector('#showTodoList');
const toDoListCountEle = document.querySelector('#toDoListCount');
const checkedCountEle = document.querySelector('#checkedCount');
let toDoList = [];
let highlighCount;
//event listener on add button to add the todo list
toDoInputSubmitBtnEle.addEventListener('click', ()=>{
    if(toDoInputEle.value !== ""){
        toDoList.push({name:toDoInputEle.value, ischecked:false});
    }
    
    toDoInputEle.value = "";
    displayToDoList(toDoList);
})

//function  to display all the todo list
function displayToDoList(list){
    showTodoListEle.innerHTML = "";
    list.forEach((element,index) => {
       
        const toDo = document.createElement('div');
        const toDotext = document.createElement('span');
        const checkBox = document.createElement('input');
        const deleteBtn = document.createElement('input');

        //set attributes for Dom Elements
        toDo.setAttribute('class', 'list flex');
        toDotext.textContent = element.name;
        checkBox.setAttribute('type', 'checkbox');
        deleteBtn.setAttribute('type', 'submit');
        deleteBtn.setAttribute('value', 'x');
        checkBox.checked = element.ischecked;

        if(checkBox.checked == true){
            toDo.setAttribute('class', 'list flex highlight')
            
        }
        //add event listener to checkbox and deleteBtn

        //checkbox checked and unchecked
        checkBox.addEventListener('click', ()=>{
            element.ischecked == false ? element.ischecked = true  : element.ischecked = false;
           
            checkBox.checked = element.ischecked;
            countCheckedList(toDoList);
            displayToDoList(toDoList);
        })

        //deleteBtn to delete the list on click
        deleteBtn.addEventListener('click', ()=>{
            toDo.remove();
            
            toDoList.splice(index,1);
            displayToDoList(toDoList);
            countCheckedList(toDoList);
            toDoListCountEle.textContent = `${toDoList.length} tasks left`;
        })

        //add all items to the parent div
        toDo.appendChild(checkBox);
        toDo.appendChild(toDotext);
        toDo.appendChild(deleteBtn);
        showTodoListEle.appendChild(toDo);
        toDoListCountEle.textContent = `${toDoList.length} tasks left`;
        
       
        countCheckedList(toDoList);
        

    });
    
}
function countCheckedList(toDo){
   const count = toDo.filter(val => {

      return  val.ischecked == true;
        
    })
    console.log(count);
    checkedCountEle.textContent = `${count.length} checked`;
}
displayToDoList(toDoList);
countCheckedList(toDoList);
