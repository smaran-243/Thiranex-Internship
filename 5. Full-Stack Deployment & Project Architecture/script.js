const state = {
  tasks: [],
  filter: 'all',
  theme: localStorage.getItem('smaranTheme') || 'dark',
};

const selectors = {
  themeToggle: document.getElementById('themeToggle'),
  taskForm: document.getElementById('taskForm'),
  taskInput: document.getElementById('taskInput'),
  taskList: document.getElementById('taskList'),
  filterButtons: document.querySelectorAll('.filter-button'),
  tasksTotal: document.getElementById('tasksTotal'),
  tasksCompleted: document.getElementById('tasksCompleted'),
  currentTime: document.getElementById('currentTime'),
  weatherForm: document.getElementById('weatherForm'),
  cityInput: document.getElementById('cityInput'),
  weatherMessage: document.getElementById('weatherMessage'),
  weatherResult: document.getElementById('weatherResult'),
  contactForm: document.getElementById('contactForm'),
  contactFeedback: document.getElementById('contactFeedback'),
  panels: document.querySelectorAll('.panel'),
  navLinks: document.querySelectorAll('.sidebar-nav a, .primary-nav a'),
};

const weatherCodeMap = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Snow fall',
  73: 'Heavy snow',
  80: 'Rain showers',
  81: 'Heavy showers',
  95: 'Thunderstorm',
};

function init() {
  applyTheme();
  loadTasks();
  renderTasks();
  updateRoute();
  startClock();
  attachEventListeners();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('smaranTheme', state.theme);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
}

function startClock() {
  updateTime();
  setInterval(updateTime, 1000);
}

function updateTime() {
  const now = new Date();
  const formatted = now.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  selectors.currentTime.textContent = formatted;
}

function loadTasks() {
  const saved = localStorage.getItem('smaranTasks');
  state.tasks = saved ? JSON.parse(saved) : [
    { id: crypto.randomUUID(), text: 'Review today’s internship objectives', completed: false },
    { id: crypto.randomUUID(), text: 'Update portfolio project details', completed: true },
  ];
}

function saveTasks() {
  localStorage.setItem('smaranTasks', JSON.stringify(state.tasks));
}

function addTask(text) {
  state.tasks.unshift({ id: crypto.randomUUID(), text, completed: false });
  saveTasks();
  renderTasks();
}

function updateTask(id, updates) {
  state.tasks = state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task));
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === 'active') return !task.completed;
    if (state.filter === 'completed') return task.completed;
    return true;
  });

  selectors.taskList.innerHTML = filteredTasks.length
    ? filteredTasks.map(renderTaskItem).join('')
    : `<p class="empty-state">No tasks available. Add something to stay productive.</p>`;

  selectors.tasksTotal.textContent = state.tasks.length;
  selectors.tasksCompleted.textContent = state.tasks.filter((task) => task.completed).length;
}

function renderTaskItem(task) {
  return `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <label class="task-content">
        <input type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark ${task.text} as complete" />
        <span>${escapeHtml(task.text)}</span>
      </label>
      <div class="task-actions">
        <button type="button" class="edit-button" data-action="edit">Edit</button>
        <button type="button" class="delete-button" data-action="delete">Delete</button>
      </div>
    </div>
  `;
}

function setFilter(filter) {
  state.filter = filter;
  selectors.filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });
  renderTasks();
}

function handleTaskAction(event) {
  const button = event.target.closest('button');
  if (!button) return;

  const taskItem = event.target.closest('.task-item');
  if (!taskItem) return;

  const id = taskItem.dataset.id;
  const action = button.dataset.action;

  if (action === 'delete') {
    deleteTask(id);
    return;
  }

  if (action === 'edit') {
    const currentText = state.tasks.find((task) => task.id === id)?.text || '';
    const updatedText = prompt('Update task text', currentText);
    if (updatedText && updatedText.trim()) {
      updateTask(id, { text: updatedText.trim() });
    }
    return;
  }
}

function handleTaskToggle(event) {
  if (event.target.type !== 'checkbox') return;
  const taskItem = event.target.closest('.task-item');
  if (!taskItem) return;
  updateTask(taskItem.dataset.id, { completed: event.target.checked });
}

function attachEventListeners() {
  selectors.themeToggle.addEventListener('click', toggleTheme);

  selectors.taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = selectors.taskInput.value.trim();
    if (!value) return;
    addTask(value);
    selectors.taskInput.value = '';
    selectors.taskInput.focus();
  });

  selectors.taskList.addEventListener('click', handleTaskAction);
  selectors.taskList.addEventListener('change', handleTaskToggle);

  selectors.filterButtons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });

  selectors.weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = selectors.cityInput.value.trim();
    if (!city) return;
    await fetchWeatherByCity(city);
  });

  selectors.contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    selectors.contactFeedback.textContent = 'Message received. I will connect with you shortly.';
    selectors.contactForm.reset();
  });

  window.addEventListener('hashchange', updateRoute);
  selectors.navLinks.forEach((link) => link.addEventListener('click', handleNavLinkClick));
}

function handleNavLinkClick(event) {
  selectors.navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === window.location.hash));
}

function updateRoute() {
  const hash = window.location.hash || '#dashboard';
  selectors.panels.forEach((panel) => {
    panel.classList.toggle('active', `#${panel.id}` === hash);
  });
  selectors.navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === hash));
  if (hash === '#dashboard') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function escapeHtml(text) {
  const span = document.createElement('span');
  span.textContent = text;
  return span.innerHTML;
}

async function fetchWeatherByCity(city) {
  selectors.weatherMessage.textContent = 'Loading weather data...';
  selectors.weatherResult.innerHTML = '';

  try {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geocodeResponse = await fetch(geocodeUrl);
    if (!geocodeResponse.ok) throw new Error('Unable to locate the city.');

    const geocodeData = await geocodeResponse.json();
    const location = geocodeData.results?.[0];
    if (!location) throw new Error('City not found. Please try another name.');

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) throw new Error('Weather service is unavailable.');

    const weatherData = await weatherResponse.json();
    renderWeather(location, weatherData);
    selectors.weatherMessage.textContent = '';
  } catch (error) {
    selectors.weatherResult.innerHTML = '';
    selectors.weatherMessage.textContent = error.message;
  }
}

function renderWeather(location, weatherData) {
  const current = weatherData.current_weather;
  const humidityIndex = weatherData.hourly.time.indexOf(weatherData.current_weather.time);
  const humidity = humidityIndex >= 0 ? weatherData.hourly.relativehumidity_2m[humidityIndex] : 'N/A';
  const description = weatherCodeMap[current.weathercode] || 'Clear sky';

  selectors.weatherResult.innerHTML = `
    <article class="weather-card" aria-live="polite">
      <div>
        <h3>${escapeHtml(location.name)}, ${escapeHtml(location.country)}</h3>
        <p>${escapeHtml(description)}</p>
      </div>
      <div class="weather-grid">
        <div class="weather-stat">
          <p>Temperature</p>
          <strong>${current.temperature.toFixed(0)}°C</strong>
        </div>
        <div class="weather-stat">
          <p>Humidity</p>
          <strong>${humidity}%</strong>
        </div>
        <div class="weather-stat">
          <p>Wind speed</p>
          <strong>${current.windspeed.toFixed(1)} km/h</strong>
        </div>
        <div class="weather-stat">
          <p>Condition code</p>
          <strong>${current.weathercode}</strong>
        </div>
      </div>
    </article>
  `;
}

init();
