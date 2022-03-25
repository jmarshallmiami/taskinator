// task ID
var taskIdCounter = 0;

// form element containing entry form for Task and task type dropdown
var formEl = document.querySelector("#task-form");
// container elements for to-do, in-progress, and completed tasks
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed")
// parent element to all three task categories, main
var pageContentEl = document.querySelector("#page-content");


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

    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
        // send created task data object as an argumment to createTaskEl
        createTaskEl(taskDataObj);
    };
    //clears content of previously created task
    formEl.reset();
};

var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class ='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // create action buttons for tasks and append to list item container
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};


// create action buttons on within each tasks
var createTaskActions = function (taskId) {
    // container div element for buttons
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create status dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    // add the options to dropdown
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    };

    actionContainerEl.appendChild(statusSelectEl);
    return actionContainerEl;
};

// function to complete the edit of the task and overwrite old data
var completeEditTask = function (taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    // remove the task ID from the form
    formEl.removeAttribute("data-task-id");

    // reset submit button
    document.querySelector("#save-task").textContent = "Add Task";
};

// event handler for clicked buttons within main element
var taskButtonHandler = function (event) {
    console.log(event.target);

    // edit button was clicked
    if (event.target.matches(".edit-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
    // if delete button is clicked
    else if (event.target.matches(".delete-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// task status change
var taskStatusChangeHandler = function (event) {
//   get the task item's id
var taskId = event.target.getAttribute("data-task-id");
// get the currently selected option's value and convert to lowercase
var statusValue = event.target.value.toLowerCase();

// find the parent task item element based on the id
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
if(statusValue === "to do"){
    tasksToDoEl.appendChild(taskSelected);
}
else if(statusValue === "in progress"){
    tasksInProgressEl.appendChild(taskSelected);
}
else if(statusValue === "completed"){
    tasksCompletedEl.appendChild(taskSelected);
}
 
};


var editTask = function (taskId) {
    // get task list item element
    var taskSelected = document.querySelector((".task-item[data-task-id='" + taskId + "']"));

    // get content from the task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);

};

// function to delete task list item
var deleteTask = function (taskId) {
    var taskSelected = document.querySelector((".task-item[data-task-id='" + taskId + "']"));
    taskSelected.remove();
};

// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for edit and delete buttons
pageContentEl.addEventListener("change", taskStatusChangeHandler);