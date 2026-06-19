const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const refreshButton = document.getElementById('refreshButton');
const loadingOverlay = document.getElementById('loadingOverlay');
const toast = document.getElementById('toast');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistory');
const weatherCard = document.getElementById('weatherCard');
const appShell = document.getElementById('appShell');
const statusPanel = document.getElementById('statusPanel');

const cityCountryEl = document.getElementById('cityCountry');
const dateTimeEl = document.getElementById('dateTime');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const feelsLikeEl = document.getElementById('feelsLike');
const pressureEl = document.getElementById('pressure');
const visibilityEl = document.getElementById('visibility');
const cloudsEl = document.getElementById('clouds');
const weatherIconEl = document.getElementById('weatherIcon');

const STORAGE_KEY = 'smaran-weather-history';
let recentSearches = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let lastCity = null;

const weatherCodeMap = {
  0: { icon: '☀️', label: 'Clear sky', background: 'linear-gradient(180deg, #2e60ff 0%, #0b1d3f 100%)' },
  1: { icon: '🌤️', label: 'Mainly clear', background: 'linear-gradient(180deg, #3366ff 0%, #071333 100%)' },
  2: { icon: '⛅', label: 'Partly cloudy', background: 'linear-gradient(180deg, #4a7aff 0%, #101f42 100%)' },
  3: { icon: '☁️', label: 'Overcast', background: 'linear-gradient(180deg, #476b9a 0%, #111d35 100%)' },
  45: { icon: '🌫️', label: 'Fog', background: 'linear-gradient(180deg, #596d82 0%, #0e1627 100%)' },
  48: { icon: '🌫️', label: 'Depositing rime fog', background: 'linear-gradient(180deg, #5e728d 0%, #111a28 100%)' },
  51: { icon: '🌦️', label: 'Light drizzle', background: 'linear-gradient(180deg, #456ab3 0%, #09152a 100%)' },
  53: { icon: '🌧️', label: 'Moderate drizzle', background: 'linear-gradient(180deg, #3d5d97 0%, #0d162b 100%)' },
  55: { icon: '🌧️', label: 'Dense drizzle', background: 'linear-gradient(180deg, #314d84 0%, #091223 100%)' },
  56: { icon: '🌧️', label: 'Freezing drizzle', background: 'linear-gradient(180deg, #3b5c8b 0%, #091224 100%)' },
  57: { icon: '🌧️', label: 'Dense freezing drizzle', background: 'linear-gradient(180deg, #314770 0%, #081123 100%)' },
  61: { icon: '🌧️', label: 'Slight rain', background: 'linear-gradient(180deg, #3d5d94 0%, #071528 100%)' },
  63: { icon: '🌧️', label: 'Moderate rain', background: 'linear-gradient(180deg, #334f83 0%, #091427 100%)' },
  65: { icon: '🌧️', label: 'Heavy rain', background: 'linear-gradient(180deg, #1f3f68 0%, #0a1121 100%)' },
  66: { icon: '🌧️', label: 'Freezing rain', background: 'linear-gradient(180deg, #2c3f68 0%, #081423 100%)' },
  67: { icon: '🌧️', label: 'Heavy freezing rain', background: 'linear-gradient(180deg, #1a2c50 0%, #071124 100%)' },
  71: { icon: '❄️', label: 'Snow fall', background: 'linear-gradient(180deg, #6ba5d6 0%, #0f1c39 100%)' },
  73: { icon: '❄️', label: 'Snow', background: 'linear-gradient(180deg, #5d8fc9 0%, #0d1d36 100%)' },
  75: { icon: '❄️', label: 'Heavy snow', background: 'linear-gradient(180deg, #4b7cbc 0%, #0d1b33 100%)' },
  77: { icon: '🌨️', label: 'Snow grains', background: 'linear-gradient(180deg, #648cc9 0%, #0d1b34 100%)' },
  80: { icon: '🌧️', label: 'Rain showers', background: 'linear-gradient(180deg, #3f5b91 0%, #09132a 100%)' },
  81: { icon: '🌧️', label: 'Moderate showers', background: 'linear-gradient(180deg, #334f82 0%, #0a1325 100%)' },
  82: { icon: '⛈️', label: 'Violent showers', background: 'linear-gradient(180deg, #243d70 0%, #07111f 100%)' },
  95: { icon: '⛈️', label: 'Thunderstorm', background: 'linear-gradient(180deg, #212f4f 0%, #050d1b 100%)' },
  96: { icon: '⛈️', label: 'Thunderstorm with hail', background: 'linear-gradient(180deg, #1f2d4b 0%, #050d1b 100%)' },
  99: { icon: '⛈️', label: 'Severe thunderstorm', background: 'linear-gradient(180deg, #19263d 0%, #040a16 100%)' }
};

function displayToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(displayToast.hideTimeout);
  displayToast.hideTimeout = setTimeout(() => toast.classList.add('hidden'), 4200);
}

function toggleLoading(isLoading) {
  loadingOverlay.classList.toggle('hidden', !isLoading);
}

function getCurrentTimeText(timezone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone || 'UTC'
  });
  return formatter.format(now);
}

function calculateFeelsLike(tempC, humidity, windKmh) {
  const t = tempC;
  const h = humidity;
  const w = windKmh;
  const heatIndex = -8.784695 + 1.61139411 * t + 2.338549 * h - 0.14611605 * t * h - 0.012308094 * t * t - 0.016424828 * h * h + 0.002211732 * t * t * h + 0.00072546 * t * h * h - 0.000003582 * t * t * h * h;
  const windChill = 13.12 + 0.6215 * t - 11.37 * Math.pow(w, 0.16) + 0.3965 * t * Math.pow(w, 0.16);
  if (t >= 27 && h >= 40) {
    return Math.round(Math.min(heatIndex, t));
  }
  if (t <= 10 && w >= 5) {
    return Math.round(Math.min(windChill, t));
  }
  return Math.round(t);
}

function updateBackground(weatherCode) {
  const mapping = weatherCodeMap[weatherCode] || weatherCodeMap[3];
  appShell.style.background = mapping.background;
  weatherIconEl.textContent = mapping.icon;
  descriptionEl.textContent = mapping.label;
}

function renderWeather(data, city, country, timezone) {
  const current = data.current_weather;
  const hours = data.hourly;
  const timeIndex = hours.time.indexOf(current.time);
  const humidity = hours.relativehumidity_2m[timeIndex] ?? '--';
  const pressure = hours.pressure_msl[timeIndex] ?? '--';
  const visibilityKm = hours.visibility[timeIndex] ? (hours.visibility[timeIndex] / 1000).toFixed(1) : '--';

  cityCountryEl.textContent = `${city}, ${country}`;
  dateTimeEl.textContent = getCurrentTimeText(timezone);
  temperatureEl.textContent = Math.round(current.temperature);
  humidityEl.textContent = `${humidity}%`;
  windSpeedEl.textContent = `${Math.round(current.windspeed)} km/h`;
  feelsLikeEl.textContent = `${calculateFeelsLike(current.temperature, humidity, Math.round(current.windspeed))}°C`;
  pressureEl.textContent = `${Math.round(pressure)} hPa`;
  visibilityEl.textContent = `${visibilityKm} km`;
  cloudsEl.textContent = `${data.current_weather.weathercode}° code`;
  updateBackground(current.weathercode);
}

function saveSearch(city) {
  const normalized = city.trim();
  if (!normalized) return;
  recentSearches = recentSearches.filter((item) => item.toLowerCase() !== normalized.toLowerCase());
  recentSearches.unshift(normalized);
  recentSearches = recentSearches.slice(0, 6);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  if (recentSearches.length === 0) {
    historyList.innerHTML = '<li>No searches yet. Start by searching a city.</li>';
    return;
  }
  recentSearches.forEach((city) => {
    const item = document.createElement('li');
    item.textContent = city;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Load';
    button.addEventListener('click', () => {
      cityInput.value = city;
      fetchWeather(city);
    });
    item.appendChild(button);
    historyList.appendChild(item);
  });
}

function clearHistory() {
  recentSearches = [];
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
}

async function getCoordinates(city) {
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(geocodeUrl);
  if (!response.ok) {
    throw new Error('Unable to resolve city coordinates.');
  }
  const result = await response.json();
  if (!result.results || result.results.length === 0) {
    throw new Error('City not found. Please check the spelling and try again.');
  }
  return result.results[0];
}

async function getWeatherForCoordinates(lat, lon, timezone) {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,pressure_msl,visibility&timezone=${encodeURIComponent(timezone)}`;
  const response = await fetch(weatherUrl);
  if (!response.ok) {
    throw new Error('Weather service is unavailable. Try again later.');
  }
  return response.json();
}

async function fetchWeather(city) {
  if (!city.trim()) {
    displayToast('Please enter a city name to search.');
    return;
  }

  try {
    toggleLoading(true);
    lastCity = city.trim();
    const location = await getCoordinates(lastCity);
    const weatherData = await getWeatherForCoordinates(location.latitude, location.longitude, location.timezone);
    renderWeather(weatherData, location.name, location.country, location.timezone);
    saveSearch(location.name);
  } catch (error) {
    displayToast(error.message);
  } finally {
    toggleLoading(false);
  }
}

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  fetchWeather(cityInput.value);
});

refreshButton.addEventListener('click', () => {
  if (!lastCity) {
    displayToast('Search a city first, then refresh.');
    return;
  }
  fetchWeather(lastCity);
});

clearHistoryButton.addEventListener('click', clearHistory);
cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    fetchWeather(cityInput.value);
  }
});

renderHistory();
