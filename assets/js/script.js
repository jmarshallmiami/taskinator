
//form element containing entry form for Task and task type dropdown
var formEl = document.querySelector("#task-form");
//container element for to-do tasks
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
    //stops page refresh when submitting a new task
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name= 'task-type']").value;

    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.textContent = "<h3 class = 'task-name'>" + taskNameInput + "</h3><span class ='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};


formEl.addEventListener("submit", createTaskHandler);