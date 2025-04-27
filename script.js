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

  const tasks = document.getElementById('tasks');

  const taskItem = document.createElement('div');
  taskItem.className = 'task-item';

  taskItem.innerHTML = `
    <input type="checkbox" onchange="toggleComplete(this)">
    <label>${name}</label>
    <div class="task-time" onclick="editTime(this)">
      <span>${formatTime(time)}</span>
      <span>${formatDate(date)}</span>
    </div>
    <button class="delete-btn" onclick="deleteTask(this)">delete</button>
  `;

  tasks.appendChild(taskItem);
  closePopup();
  clearFields();
}

function clearFields() {
  document.getElementById('taskName').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskTime').value = '';
}

function deleteTask(button) {
  button.parentElement.remove();
}

function editTime(div) {
  const time = prompt("Enter new time (HH:MM)", "11:00");
  const date = prompt("Enter new date (YYYY-MM-DD)", new Date().toISOString().slice(0,10));

  if (time && date) {
    div.innerHTML = `
      <span>${formatTime(time)}</span>
      <span>${formatDate(date)}</span>
    `;
  }
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

function toggleComplete(checkbox) {
  const task = checkbox.parentElement;
  if (checkbox.checked) {
    task.classList.add('completed');
  } else {
    task.classList.remove('completed');
  }
}
