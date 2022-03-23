
// form element containing entry form for Task and task type dropdown
var formEl = document.querySelector("#task-form");
// container element for to-do tasks
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
    // stops page refresh when submitting a new task
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name= 'task-type']").value;

    // check if input values are empty
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    };
    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //clears content of previously created task
    formEl.reset();

    // send it as an argumment to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class ='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

};


formEl.addEventListener("submit", taskFormHandler);