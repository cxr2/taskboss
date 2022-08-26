window.addEventListener("load", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const nameInput = document.querySelector("#name");
  const newTaskForm = document.querySelector("#new-task-form");

  const username = localStorage.getItem("username") || "";

  nameInput.value = username;

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    e.target.reset();

    DisplayTasks();
  });

  DisplayTasks();
});

function DisplayTasks() {
  const taskList = document.querySelector("#task-list");

  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = task.done;
    span.classList.add("bubble");

    if (task.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }
    content.classList.add("task-content");

    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteBtn.classList.add("delete");

    content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
    edit.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    taskItem.appendChild(label);
    taskItem.appendChild(content);
    taskItem.appendChild(actions);

    taskList.appendChild(taskItem);

    if (task.done) {
      taskItem.classList.add("done");
    }
    input.addEventListener("change", (e) => {
      task.done = e.target.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));

      if (task.done) {
        taskItem.classList.add("done");
      } else {
        taskItem.classList.remove("done");
      }

      DisplayTasks();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        task.content = e.target.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        DisplayTasks();
      });
    });
    deleteBtn.addEventListener("click", (e) => {
      tasks = tasks.filter((t) => t != tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      DisplayTasks();
    });
  });
}
