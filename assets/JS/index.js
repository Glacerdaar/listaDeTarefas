const inputTaskName = document.querySelector('.inputTaskName');
const taskBtn = document.querySelector('#TaskBtn');
const taskNameUl = document.querySelector('#taskNameUl');

function newLi() {
    const li = document.createElement('li');
    return li;
};

function createNewTask(inputText) {
    if(inputText.trim() !== ''){
        const li = newLi();
        li.innerHTML = inputText;
        taskNameUl.appendChild(li)
        clearInput();
        newBtnClear(li);
        saveNewTask();
    }
};

inputTaskName.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTaskName) return;
        createNewTask(inputTaskName.value);
    }
});

function clearInput() {
    inputTaskName.value = '';
    inputTaskName.focus();
};

function newBtnClear(li) {
    li.innerText += ' ';
    const clearBtn = document.createElement('button');
    clearBtn.innerText = 'X';
    clearBtn.setAttribute('class', 'apagar');
    clearBtn.setAttribute('title', 'Apagar esta tarefa');
    if (li.innerText.trim() !== ''){
        li.appendChild(clearBtn);
    } return ;
};

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        saveNewTask();
    }
});

taskBtn.addEventListener('click', function(e) {
    if (!inputTaskName) return;
    createNewTask(inputTaskName.value)
});


function saveNewTask() {
    const liTasks = taskNameUl.querySelectorAll('li');
    const taskList = [];

    for (let task of liTasks){
        let taskText = task.innerText;
        taskText = taskText.replace('X', '').trim();
        taskList.push(taskText);
    }
    const taskJson = JSON.stringify(taskList);
    localStorage.setItem('tasks', taskJson);
}

function addSaveTasks() {
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks);
    
    for(let task of taskList) {
        createNewTask(task);
    }
}

addSaveTasks();
