// Show current date and time
function updateTime() {
  const now = new Date();
  const dateString = now.toLocaleString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  document.getElementById('currentTime').innerText = `it’s ${dateString} right now.`;
}
setInterval(updateTime, 1000);
updateTime();

function openPopup() {
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function addTask() {
  const name = document.getElementById('taskName').value;
  const date = document.getElementById('taskDate').value;
  const time = document.getElementById('taskTime').value;

  if (!name || !date || !time) {
    alert('Please fill all fields!');
    return;
  }

  const task = {
    id: Date.now(),
    name,
    date,
    time,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  renderTasks();
  closePopup();
  clearFields();
}

function clearFields() {
  document.getElementById('taskName').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskTime').value = '';
}

function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(tasks);
  renderTasks();
}

function editTime(id) {
  const time = prompt("Enter new time (HH:MM)", "11:00");
  const date = prompt("Enter new date (YYYY-MM-DD)", new Date().toISOString().slice(0,10));

  if (time && date) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    task.time = time;
    task.date = date;
    saveTasks(tasks);
    renderTasks();
  }
}

function toggleComplete(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  saveTasks(tasks);
  renderTasks();
}

function formatTime(t) {
  const [h, m] = t.split(":");
  let hour = parseInt(h);
  let ampm = "AM";
  if (hour >= 12) {
    ampm = "PM";
    if (hour > 12) hour -= 12;
  }
  if (hour === 0) hour = 12;
  return `${hour}:${m} ${ampm}`;
}

function formatDate(d) {
  const today = new Date();
  const selected = new Date(d);
  if (today.toDateString() === selected.toDateString()) return "Today";
  return selected.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const tasksContainer = document.getElementById('tasks');
  tasksContainer.innerHTML = '';

  const tasks = getTasks();
  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    if (task.completed) taskItem.classList.add('completed');

    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
      <label>${task.name}</label>
      <div class="task-time" onclick="editTime(${task.id})">
        <span>${formatTime(task.time)}</span>
        <span>${formatDate(task.date)}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${task.id})">delete</button>
    `;

    tasksContainer.appendChild(taskItem);
  });
}

// On page load
renderTasks();
