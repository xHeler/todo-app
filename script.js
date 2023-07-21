let tasks = [];

window.addEventListener("load", () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    refreshTasks();
  }
});

const inputField = document.getElementById("todo-input");
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

const addTask = () => {
  const input = document.getElementById("todo-input");
  const newTask = input.value.trim();
  input.value = "";

  if (newTask === "") return;

  const duplicate = tasks.find((task) => task.name === newTask);
  if (duplicate) {
    alert("Task already exists!");
    return;
  }

  tasks.push({
    name: newTask,
    done: false,
  });

  savedTasks();
  refreshTasks();
};

const removeTask = (index) => {
  const confirmation = confirm("Are you sure you want to remove this task?");
  if (confirmation) {
    tasks.splice(index, 1);
    savedTasks();
    refreshTasks();
  }
};


const toggleDone = (index) => {
  tasks[index].done = !tasks[index].done;
  savedTasks();
  refreshTasks();
};

const refreshTasks = () => {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");

    if (task.done) {
      li.style.textDecoration = "line-through";
    }

    li.innerHTML = `${task.name} 
            <button class="done-btn" onclick="toggleDone(${i})">Mark Done</button>
            <button class="remove-btn" onclick="removeTask(${i})">Remove</button>`;

    todoList.appendChild(li);
  });
};

const savedTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
