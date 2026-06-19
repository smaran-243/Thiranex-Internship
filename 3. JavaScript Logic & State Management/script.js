const STORAGE_KEY = 'smaran-productivity-tasks';

const state = {
  tasks: [],
  filter: 'all',
  search: '',
  pendingDeleteId: null,
};

const elements = {
  taskList: document.getElementById('taskList'),
  emptyState: document.getElementById('emptyState'),
  taskCount: document.getElementById('taskCount'),
  activeCount: document.getElementById('activeCount'),
  completedCount: document.getElementById('completedCount'),
  newTaskForm: document.getElementById('newTaskForm'),
  taskTitle: document.getElementById('taskTitle'),
  taskCategory: document.getElementById('taskCategory'),
  taskDate: document.getElementById('taskDate'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  searchInput: document.getElementById('searchInput'),
  clearCompleted: document.getElementById('clearCompleted'),
  markAllCompleted: document.getElementById('markAllCompleted'),
  toast: document.getElementById('toast'),
  confirmationOverlay: document.getElementById('confirmationOverlay'),
  confirmDelete: document.getElementById('confirmDelete'),
  cancelDelete: document.getElementById('cancelDelete'),
};

const defaultTasks = [
  {
    id: crypto.randomUUID(),
    title: 'Solve Binary Tree problem on LeetCode',
    category: 'LeetCode Practice',
    dueDate: getFutureDate(1),
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Complete Thiranex internship task',
    category: 'Internship Tasks',
    dueDate: getFutureDate(2),
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: crypto.randomUUID(),
    title: 'Work on Flask project',
    category: 'Personal Projects',
    dueDate: getFutureDate(5),
    completed: true,
    createdAt: Date.now() - 7200000,
  },
];

function getFutureDate(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
}

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      state.tasks = JSON.parse(stored);
      return;
    } catch (error) {
      console.error('Could not parse stored tasks', error);
    }
  }
  state.tasks = defaultTasks;
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.remove('hidden');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 2200);
}

function formatDueDate(dateString) {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function getFilteredTasks() {
  const searchQuery = state.search.trim().toLowerCase();
  return state.tasks.filter((task) => {
    if (state.filter === 'active' && task.completed) return false;
    if (state.filter === 'completed' && !task.completed) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery) && !task.category.toLowerCase().includes(searchQuery)) return false;
    return true;
  });
}

function renderTasks() {
  const tasks = getFilteredTasks();
  elements.taskList.innerHTML = '';

  if (!tasks.length) {
    elements.emptyState.classList.remove('hidden');
    return;
  }

  elements.emptyState.classList.add('hidden');

  tasks.sort((a, b) => a.completed - b.completed || a.createdAt - b.createdAt).forEach((task) => {
    const taskCard = document.createElement('article');
    taskCard.className = `task-card ${task.completed ? 'completed' : ''}`;
    taskCard.dataset.taskId = task.id;
    taskCard.innerHTML = `
      <div class="task-card-header">
        <div>
          <h3 class="task-title ${task.completed ? 'completed' : ''}">${escapeHtml(task.title)}</h3>
          <div class="task-meta">
            <span class="badge">${escapeHtml(task.category)}</span>
            <span class="date-pill">Due ${formatDueDate(task.dueDate)}</span>
          </div>
        </div>
        <div class="task-actions">
          <button data-action="toggle" aria-label="Toggle complete">${task.completed ? 'Undo' : 'Done'}</button>
          <button data-action="edit" aria-label="Edit task">Edit</button>
          <button data-action="delete" aria-label="Delete task">Delete</button>
        </div>
      </div>
      <div class="task-card-footer">
        <small>${task.completed ? 'Completed' : 'Pending'} • Created ${new Date(task.createdAt).toLocaleDateString()}</small>
      </div>
    `;

    elements.taskList.appendChild(taskCard);
  });
}

function escapeHtml(text) {
  const span = document.createElement('span');
  span.textContent = text;
  return span.innerHTML;
}

function renderCounters() {
  const total = state.tasks.length;
  const completed = state.tasks.filter((task) => task.completed).length;
  const active = total - completed;
  elements.taskCount.textContent = total;
  elements.activeCount.textContent = active;
  elements.completedCount.textContent = completed;
}

function setFilter(filter) {
  state.filter = filter;
  elements.filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });
  renderTasks();
}

function addTask(title, category, dueDate) {
  const trimmed = title.trim();
  if (!trimmed) return;

  state.tasks.unshift({
    id: crypto.randomUUID(),
    title: trimmed,
    category,
    dueDate: dueDate || '',
    completed: false,
    createdAt: Date.now(),
  });
  saveTasks();
  renderCounters();
  renderTasks();
  showToast('Task added successfully');
}

function updateTask(id, updates) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  Object.assign(task, updates);
  saveTasks();
  renderCounters();
  renderTasks();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  saveTasks();
  renderCounters();
  renderTasks();
  showToast('Task removed');
}

function clearCompletedTasks() {
  const completedCount = state.tasks.filter((task) => task.completed).length;
  if (!completedCount) {
    showToast('No completed tasks to clear');
    return;
  }
  state.tasks = state.tasks.filter((task) => !task.completed);
  saveTasks();
  renderCounters();
  renderTasks();
  showToast('Completed tasks cleared');
}

function markAllAsCompleted() {
  state.tasks = state.tasks.map((task) => ({ ...task, completed: true }));
  saveTasks();
  renderCounters();
  renderTasks();
  showToast('All tasks marked completed');
}

function openConfirmation(taskId) {
  state.pendingDeleteId = taskId;
  elements.confirmationOverlay.classList.remove('hidden');
}

function closeConfirmation() {
  state.pendingDeleteId = null;
  elements.confirmationOverlay.classList.add('hidden');
}

function bindEvents() {
  elements.newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(elements.taskTitle.value, elements.taskCategory.value, elements.taskDate.value);
    elements.newTaskForm.reset();
    elements.taskTitle.focus();
  });

  elements.taskList.addEventListener('click', (event) => {
    const action = event.target.dataset.action;
    const taskElement = event.target.closest('.task-card');
    if (!action || !taskElement) return;

    const taskId = taskElement.dataset.taskId;
    if (action === 'toggle') {
      const task = state.tasks.find((item) => item.id === taskId);
      if (!task) return;
      updateTask(taskId, { completed: !task.completed });
      showToast(task.completed ? 'Task marked active' : 'Task completed');
      return;
    }

    if (action === 'edit') {
      const task = state.tasks.find((item) => item.id === taskId);
      if (!task) return;
      const newTitle = prompt('Update task title', task.title);
      if (newTitle === null) return;
      const updatedTitle = newTitle.trim();
      if (!updatedTitle) {
        showToast('Title cannot be empty');
        return;
      }
      updateTask(taskId, { title: updatedTitle });
      showToast('Task updated');
      return;
    }

    if (action === 'delete') {
      openConfirmation(taskId);
    }
  });

  elements.filterButtons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });

  elements.searchInput.addEventListener('input', (event) => {
    state.search = event.target.value;
    renderTasks();
  });

  elements.clearCompleted.addEventListener('click', clearCompletedTasks);
  elements.markAllCompleted.addEventListener('click', markAllAsCompleted);
  elements.confirmDelete.addEventListener('click', () => {
    if (state.pendingDeleteId) {
      deleteTask(state.pendingDeleteId);
    }
    closeConfirmation();
  });

  elements.cancelDelete.addEventListener('click', closeConfirmation);
  elements.confirmationOverlay.addEventListener('click', (event) => {
    if (event.target === elements.confirmationOverlay) {
      closeConfirmation();
    }
  });
}

function init() {
  loadTasks();
  bindEvents();
  setFilter(state.filter);
  renderCounters();
  renderTasks();
}

init();
