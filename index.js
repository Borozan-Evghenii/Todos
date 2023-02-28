const input = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filters span");
const taskBox = document.querySelector(".task-box");
const clear = document.querySelector(".clear-btn");

let editId,
  todos = JSON.parse(localStorage.getItem("todo-list")) || [],
  filter = JSON.parse(localStorage.getItem("filter")) || "all",
  isEdited = false;

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    localStorage.setItem("filter", JSON.stringify(btn.id));
    renderTask(btn.id);
  });
});

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && input.value !== "") {
    if (!isEdited) {
      console.log("not edit");
      const newTodo = {
        id: Date.now(),
        name: input.value,
        status: "pending",
      };
      todos.push(newTodo);
    } else {
      console.log(editId, "is edit");
      isEdited = false;
      todos[editId].name = input.value;
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    input.value = "";
    renderTask(filter);
  }
});

function renderTask(filter) {
  taskBox.innerHTML = "";
  let liTag = "";
  if (todos) {
    todos.forEach((todo, index) => {
      if (todo.status == filter || filter == "all") {
        let completed = todo.status === "completed" ? "checked" : "";
        liTag += `
        <li class="task">
          <label for="${index}">
            <input type="checkbox" onclick="updateStatus(this)" ${completed} id="${index}" />
            <p class="${completed}">${todo.name}</p>
          </label>
          <div class="settings">
            <i class="uil uil-ellipsis-h" onclick="showMenu(this)"></i>
            <ul class="task-menu" >
                <li onclick="editTask(${index},'${todo.name}')"><i  class="uil uil-pen"></i>Edit</li>
                <li onclick="deleteTask(${index}, ${filter})"><i  class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>

        </li>        
        `;
      }
    });
  }
  taskBox.innerHTML = liTag || "<span>You dot have a tasks</span>";
  const isTasks = document.querySelectorAll(".task");
  isTasks.length
    ? clear.classList.add("active")
    : clear.classList.remove("active");
  if (isTasks.length >= 5) {
    taskBox.classList.add("overflow");
  } else {
    taskBox.classList.remove("overflow");
  }
}

renderTask(filter);

function updateStatus(element) {
  const name = element.nextElementSibling;
  todos[element.id].status == "completed"
    ? (todos[element.id].status = "pending")
    : (todos[element.id].status = "completed");
  name.classList.add(todos[element.id].status);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  renderTask(filter);
}

function deleteTask(id, filter) {
  todos.splice(id, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  renderTask("all");
}
function editTask(id, name) {
  editId = id;
  isEdited = true;
  input.value = name;
  input.focus();
  input.classList.add("active");
}

clear.addEventListener("click", (e) => {
  localStorage.clear();
  location.reload();
});

function showMenu(element) {
  element.nextElementSibling.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != element) {
      element.nextElementSibling.classList.remove("show");
    }
  });
}
