const todo_tab = document.getElementById("todo-tab");
const todo_display = document.getElementById("add-todo");

const project_tab = document.getElementById("project-tab");
const project_display = document.getElementById("add-project");

const note_tab = document.getElementById("note-tab");
const note_display = document.getElementById("add-note");

const addTodo = document.getElementById("add-todo-btn");
const addProject = document.getElementById("add-project-btn");

let todo = [];
let project = [];

project_display.style.display = "none";
note_display.style.display = "none";
displayTodo();

todo_tab.addEventListener("click", function () {

    displayTodo();

  todo_display.style.display = "flex";
  note_display.style.display = "none";
  project_display.style.display = "none";

});

project_tab.addEventListener("click", function () {

  displayProject();

  todo_display.style.display = "none";
  note_display.style.display = "none";
  project_display.style.display = "flex";

});

note_tab.addEventListener("click", function () {

  todo_display.style.display = "none";
  note_display.style.display = "flex";
  project_display.style.display = "none";

});


addTodo.addEventListener("click", function () {

  let todo_title = document.getElementById("add-todo-title");
  let todo_des = document.getElementById("add-todo-des");
  let todo_date = document.getElementById("add-todo-date");

  if (todo_title.value == "" || todo_des.value == "" || todo_date.value == "")
    alert("Required Input Field is missing");

  else {
    let todos = JSON.parse(localStorage.getItem("todo"));

    if (todos) todo = todos;

    todo.push({
      todo_title: todo_title.value,
      todo_des: todo_des.value,
      todo_date: todo_date.value,
    });

    localStorage.setItem("todo", JSON.stringify(todo));

    displayTodo();

    todo_title.value = "";
    todo_des.value = "";
    todo_date.value = "";

  }
});


addProject.addEventListener("click", function () {

  let project_title = document.getElementById("add-project-title");
  let project_des = document.getElementById("add-project-des");

  if (project_title.value == "" || project_des.value == "")
    alert("Required Input Field is missing");

  else {
    let projects = JSON.parse(localStorage.getItem("project"));

    if (projects) project = projects;

    project.push({
      project_title: project_title.value,
      project_des: project_des.value,
    });
    
    localStorage.setItem("project", JSON.stringify(project));

    displayProject();

    project_title.value = "";
    project_des.value = "";

  }
});

function displayTodo() {
  let todos = JSON.parse(localStorage.getItem("todo"));

  if (todos !== null) {
    let html = "";

    todos.forEach(function (element, index) {
      html += `
      <tr>
        <th><strong>${element.todo_title}</strong></th>
        <th>${element.todo_des}</th>
        <th>${element.todo_date}</th>
        <th><button id = "${index}" onClick = "deleteTodo(this.id)" class = "dlt-btn">Delete</button></th>
        </tr>
      `;
    });

    let a = document.getElementById("todo-display");
    a.innerHTML = html;
  }
}


function displayProject() {
  let projects = JSON.parse(localStorage.getItem("project"));

  if (projects !== null) {
    let html = "";

    projects.forEach(function (element, index) {
      html += `
        <div class = "project-card">
    <div><strong>TITLE: </strong>${element.project_title}</div><br>
    <div><strong>DESCRIPTION: </strong>${element.project_des}</div>
    <div><button id = "${index}" onClick = "deleteProject(this.id)" class = "dlt-btn-project">Delete</button></div>
    </div>
        `;
    });

    let a = document.getElementById("project-display");
    a.innerHTML = html;
  }
}

function deleteTodo(index) {
  let todos = JSON.parse(localStorage.getItem("todo"));
  todos.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todos));
  displayTodo();
}

function deleteProject(index) {
    let projects = JSON.parse(localStorage.getItem("project"));
    projects.splice(index, 1);
    localStorage.setItem("project", JSON.stringify(projects));
    displayProject();
  }


