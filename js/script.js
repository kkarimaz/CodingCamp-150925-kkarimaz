const todos = [];

function renderTodos(filter = "") {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  todos
    .filter(todo => todo.task.toLowerCase().includes(filter.toLowerCase()))
    .forEach((todo, idx) => {
      const li = document.createElement("li");
      li.className = "flex items-center justify-between bg-white rounded px-3 py-2 shadow";
      li.innerHTML = `
        <div>
          <span class="font-bold">${todo.task}</span>
          <span class="text-xs text-gray-500 ml-2">${todo.dueDate}</span>
          <span class="ml-2 text-green-600">${todo.status}</span>
        </div>
        <div>
          <button onclick="deleteTodo(${idx})" class="text-red-500 hover:underline mx-2">Delete</button>
        </div>
      `;
      list.appendChild(li);
    });
}

document.getElementById("todo-form").onsubmit = function(e) {
  e.preventDefault();
  const task = document.getElementById("task").value.trim();
  const dueDate = document.getElementById("due-date").value;
  // Validasi input
  if (!task) {
    alert("Task wajib diisi!");
    return;
  }
  if (!dueDate) {
    alert("Tanggal wajib diisi!");
    return;
  }
  todos.push({ task, dueDate, status: "Pending" });
  renderTodos();
  this.reset();
};

function deleteTodo(idx) {
  todos.splice(idx, 1);
  renderTodos();
}

// filter
const filterInput = document.createElement("input");
filterInput.placeholder = "Filter task...";
filterInput.className = "w-full px-2 py-1 rounded border mb-2";
filterInput.oninput = function() {
  renderTodos(this.value);
};
document.querySelector("form").insertAdjacentElement("afterend", filterInput);

renderTodos();

document.querySelector('.w-28.justify-center').onclick = function() {
  todos.length = 0; // hapus semua todo
  renderTodos();
};
