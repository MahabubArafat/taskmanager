const clearBtn = document.querySelector(".clear-tasks");
const taskInput = document.querySelector("#task");
const form = document.querySelector("#task-form");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");

loadEventListeners();

function loadEventListeners(e) {
  document.addEventListener("DOMContentLoaded", viewTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}
function viewTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    // tasks = tasks.reverse();
  }

  tasks.forEach(function (task) {
    li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = `<i class='fa fa-remove'></i>`;
    li.appendChild(link);
    // taskList.appendChild(li);
    taskList.insertBefore(li, taskList.firstChild);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    li = document.createElement("li");
    li.className = "collection-item";
    li.innerText = taskInput.value;
    link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = `<i class='fa fa-remove'></i>`;
    li.appendChild(link);
    // taskList.appendChild(li);
    taskList.insertBefore(li, taskList.firstChild); //appending most recent task in the top
    addToLocalStorage(taskInput.value);

    taskInput.value = "";
  }

  e.preventDefault();
}

function addToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Did You Do it? Are you Sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  removeFromLocalStorage(e.target.parentElement.parentElement);
}
function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
