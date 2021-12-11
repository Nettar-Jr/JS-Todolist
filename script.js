
function addTask (){
    
    //create list and buttons
    let todolist = document.getElementById('todo-list');
    let todoItem = document.createElement('li');

    let label = document.createElement('label');
    let deleteBtn = document.createElement('span');
    let editBtn = document.createElement('span');
    let addSubtaskBtn = document.createElement('span');

    todoItem.className = 'todoItem';
    deleteBtn.innerText = 'X';
    deleteBtn.className = 'deleteItem'
    editBtn.innerText = 'Edit';
    editBtn.className = 'editItem';
    addSubtaskBtn.innerText = '+';
    addSubtaskBtn.className = 'subTaskBtn';

    let subtodoList = document.createElement('ul')
    
    subtodoList.className = 'subtodoList';
    
    let inputValue = document.getElementById('inputField').value;
    
    label = document.createTextNode(inputValue);

    let labelContainer = document.createElement('span');
    labelContainer.className = 'label';

    labelContainer.appendChild(label);

    todoItem.appendChild(labelContainer);
    todoItem.appendChild(deleteBtn);
    todoItem.appendChild(editBtn);
    todoItem.insertBefore(addSubtaskBtn, todoItem.firstChild);


    //an if statement to add task if input field is blank
    
    if(inputValue === ""){
        alert ('Please enter a task first.')
    }
    else{
       
        todolist.append(todoItem);
        todoItem.insertAdjacentElement("beforeEnd", subtodoList);

       return this.inputValue = "";
    }
    
    // Give unique Id to each item
    let grabTodoList = todolist.querySelectorAll('li');
    let grabtodoItem;
    for (var i = 0; i < grabTodoList.length; i++){
        grabtodoItem = grabTodoList[i];
    }
    grabtodoItem.id = "item " + i;
    storeLocalStorage();

    //click delete button to delete an item
    deleteBtn.onclick = function (event){
        event.stopPropagation();

        todoItem.parentNode.removeChild(todoItem);
        localStorage.removeItem(grabtodoItem.id);
    }

    //click on item to add line through text
    labelContainer.onclick = function (event){
        event.stopPropagation();

        if (labelContainer.style.textDecoration === 'line-through'){
            labelContainer.style.textDecoration = 'none';
        }

        else{
            labelContainer.style.textDecoration = 'line-through';
        }
    }

    // edit an item and update
    editBtn.onclick = function (event){
        event.stopPropagation();

        let editForm = document.createElement('form');
        let editTask = document.createElement('input');
        let addEdit = document.createElement('span');

        editTask.type = 'text';
        addEdit.innerText = "Save";
        addEdit.classList.add('addEditedTask');
        editTask.className = 'editTaskField';
        editTask.maxLength = '45';
        editForm.classList.add('subtodoForm');

        editForm.appendChild(editTask);
        editForm.appendChild(addEdit);


        editTask.value = todoItem.childNodes[1].textContent;

        // hide delete and edit button for better user experience
        editBtn.style.visibility = 'hidden';
        deleteBtn.style.visibility = 'hidden';

        todoItem.removeChild(addSubtaskBtn);
        todoItem.removeChild(labelContainer);

        todoItem.prepend(editForm);

        addEdit.onclick = function (){
            
            let newValue = editTask.value;
            
            let newTxt = document.createTextNode(newValue);
            console.log(newTxt);

            labelContainer = newTxt;


            // an if condition to save the edit value of the item
            if (editTask.value === ""){

                console.log('Do nothing');
            }

            else{

                // show delete and edit button
                editBtn.style.visibility = 'visible';
                deleteBtn.style.visibility = 'visible';
                todoItem.insertBefore(addSubtaskBtn, todoItem.firstChild);

                // remove edit field and its value replace back with text content 
                todoItem.removeChild(editForm);
                todoItem.insertBefore(labelContainer, todoItem.childNodes[1]);
            }
        }
    } 
    
    
    // add sub task to todoItem trough the nested list 
    addSubtaskBtn.onclick = function (event){
        event.preventDefault();

        // conceal buttons while text input is visible
        editBtn.style.visibility = 'hidden';
        deleteBtn.style.visibility = 'hidden';
        addSubtaskBtn.style.visibility = 'hidden';
        
        // create html element
        let subtodoForm = document.createElement('form');
        let subtodoInput = document.createElement('input');
        let subtodoBtn = document.createElement('span');
        
        subtodoForm.className = 'subtodoForm';
        subtodoInput.className = 'subtododInput';
        subtodoInput.value = 'Enter subtask...'
        subtodoInput.maxLength = '35';
        subtodoBtn.className = 'subtodoBtn';
        subtodoBtn.innerText = 'add';

        // append form to nested list, input and button to form
        subtodoList.appendChild(subtodoForm);
        subtodoForm.appendChild(subtodoInput);
        subtodoForm.appendChild(subtodoBtn);

        // the add button will listen for a click to add value of input to nested list
        subtodoBtn.onclick = function (event){
            event.stopPropagation();

            let subtodoItem = document.createElement('li');
            let subtodoDelBtn = document.createElement('span');

            let subtodoInputValue = subtodoInput.value;
            let txtNode = document.createTextNode(subtodoInputValue);

            subtodoItem.className = 'nestedList';
            subtodoDelBtn.className = 'delTodoBtn';
            subtodoDelBtn.innerHTML = 'X'

            subtodoItem.appendChild(txtNode);
            subtodoItem.appendChild(subtodoDelBtn);

            // if statement just in case the input field is blank
            if (subtodoInput.value === ''){
                alert('Please enter a subTask');
            }

            else{
                editBtn.style.visibility = 'visible';
                deleteBtn.style.visibility = 'visible';
                addSubtaskBtn.style.visibility = 'visible';

                subtodoList.removeChild(subtodoForm);
                subtodoList.appendChild(subtodoItem);

                // Give unique Id to each sub Item
                let grabTodoList = subtodoList.querySelectorAll('li');
                let grabtodoItem;
                for (var i = 0; i < grabTodoList.length; i++){
                    grabtodoItem = grabTodoList[i];
                }
                grabtodoItem.id =" SubItem "  + i;
            }

            // delete item from the bested list
            subtodoDelBtn.onclick = function (){
                subtodoItem.parentNode.removeChild(subtodoItem);
            }
        }   
    }


    function storeLocalStorage (){
        
        let todos = [];
        todos += todoItem;
        localStorage.setItem(grabtodoItem.id, JSON.stringify(todos));
        console.log(localStorage);
        }
}