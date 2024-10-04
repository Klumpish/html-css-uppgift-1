/*
    i made this far to complicated then it had to be. so much stress,
    google might ask for some money after how much i'v used it...
*/


// create our variable
const form = document.querySelector("#task-form");
const taskBtn = document.querySelector("#newTask")
const clear = document.querySelector("#clear");
const empty = document.querySelector("#empty");
let tasks = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
})

// clear our list
clear.addEventListener("click", (e) => {
    tasks = []
    updateTasks()
})



function addTask() {
    const input = document.querySelector("#taskInput")
    const inputText = input.value.trim()
    // checks if inputText is not an empty string
    if (inputText != "") {
        empty.innerHTML=""
        if (inputText) {

            // create task object
            const task = {
                // Date gives us our id
                id: Date.now(),
                text: inputText,
                completed: false
            };

            // add task to array
            tasks.push(task);

            // updates tasks
            updateTasks();

            // clear input
            input.value = "";
        }
    }else{
        empty.innerHTML="Please write something"
    }
}


function updateTasks() {
    const list = document.querySelector("ul")
    // clear
    list.innerHTML = "";


    tasks.forEach(task => {
        const li = document.createElement("li");

        // checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTaskComplete(task.id);

        // delete button
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        deleteButton.onclick = () => deleteTask(task.id);

        // line-through text if complete
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        list.appendChild(li);
    });
    // update task counter
    updateTaskCounter();
}

function toggleTaskComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed; //changes the completed status
        }
        return task;
    });
    updateTasks();
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTasks();
}

// update task counter
function updateTaskCounter() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    const taskCounter = document.querySelector("#numbers");
    taskCounter.textContent = `${completedTasks}/${totalTasks}`;
}