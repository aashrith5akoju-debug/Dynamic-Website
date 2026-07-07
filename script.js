let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");


let themeToggle = document.getElementById("themeToggle");

// Load saved theme
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

// Toggle theme
themeToggle.onclick = function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
};
// 👉 Get data
function getTodoListFromLocalStorage() {
  let data = localStorage.getItem("todoList");
  let parsed = JSON.parse(data);

  if (parsed === null) {
    return [];
  } else {
    return parsed;
  }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

// 👉 Save
saveTodoButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

// 👉 Add Todo
function onAddTodo() {
  let input = document.getElementById("todoUserInput");
  let value = input.value;

  if (value === "") {
    alert("Enter valid text");
    return;
  }

  todosCount = todosCount + 1;

  let newTodo = {
    text: value,
    uniqueNo: todosCount,
    isChecked: false
  };

  todoList.push(newTodo);
  createAndAppendTodo(newTodo);

  input.value = "";
}

addTodoButton.onclick = function () {
  onAddTodo();
};

// 👉 Checkbox change
function onTodoStatusChange(checkboxId, labelId, todoId) {
  let label = document.getElementById(labelId);
  label.classList.toggle("checked");

  let index = todoList.findIndex(function (eachTodo) {
    return "todo" + eachTodo.uniqueNo === todoId;
  });

  let todo = todoList[index];

  todo.isChecked = !todo.isChecked;
}

// 👉 Delete
function onDeleteTodo(todoId) {
  let element = document.getElementById(todoId);
  todoItemsContainer.removeChild(element);

  let index = todoList.findIndex(function (eachTodo) {
    return "todo" + eachTodo.uniqueNo === todoId;
  });

  todoList.splice(index, 1);
}

// 👉 Create UI
function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let li = document.createElement("li");
  li.classList.add("todo-item");
  li.id = todoId;

  let left = document.createElement("div");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxId;
  checkbox.checked = todo.isChecked;

  checkbox.onclick = function () {
    onTodoStatusChange(checkboxId, labelId, todoId);
  };

  let label = document.createElement("label");
  label.textContent = todo.text;
  label.id = labelId;
  label.classList.add("label");

  if (todo.isChecked) {
    label.classList.add("checked");
  }

  left.appendChild(checkbox);
  left.appendChild(label);

  let delBtn = document.createElement("button");
  delBtn.textContent = "🗑";
  delBtn.classList.add("delete-btn");

  delBtn.onclick = function () {
    onDeleteTodo(todoId);
  };

  li.appendChild(left);
  li.appendChild(delBtn);

  todoItemsContainer.appendChild(li);
}

// 👉 Load existing todos
for (let eachTodo of todoList) {
  createAndAppendTodo(eachTodo);
}