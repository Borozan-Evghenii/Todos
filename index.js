const input = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filters span");
const taskBox = document.querySelector(".task-box");
const clear = document.querySelector(".clear-btn");

let editId,
  todos = JSON.parse(localStorage.getItem("todo-list")) || [],
  isEdited = false;

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    renderTask(btn.id);
  });
});

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    const newTodo = {
      id: Date.now(),
      name: input.value,
      status: "pending",
    };
    todos.push(newTodo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    input.value = "";
  }
});

function renderTask(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((e, id) => {
      const completed = e.status === "completed" ? "checked" : "";
      liTag += `
      <li class="task">
        <label for="${id}">
          <input type="checkbox" id="${id}" ${completed}>
          <p class="${completed}">${e.name}</p>
        </label>
        <div class="settings">
          <i class="uil uil-ellipsis-h"></i>
          <ul class="task-menu">
              <li><i class="uil uil-pen"></i>Edit</li>
              <li><i class="uil uil-trash"></i>Delete</li>
          </ul>
        </div>
      </li>      
      `;
    });
  }
  taskBox.innerHTML = liTag || "<span>You dot have a tasks</span>";

  const isTasks = document.querySelectorAll(".task");
  isTasks.length
    ? clear.classList.add("active")
    : clear.classList.remove("active");
}

renderTask("all");

const label = document.querySelectorAll("label");
label.forEach((e) => {
  const id = e.getAttribute("for");
  e.addEventListener("click", (e) => {
    updateSatatus(id);
  });
});

function updateSatatus(id) {
  todos[id].status == "pending" ? "completed" : "pending";
  // localStorage.setItem("todo-item", JSON.parse(todos));
  renderTask("all");
}
