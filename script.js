// Variables
const cityName = document.querySelector("#weatherInput");
const searchBtn = document.querySelector("#searchBtn");
const form = document.getElementById("weatherForm");
const myCity = document.getElementById("city");
const image = document.getElementById("weatherImage");
const weather = document.getElementById("weatherMain");
const temp = document.querySelector(".temp");
const dates = document.querySelector(".todayDates");
const times = document.getElementById("todayTime");
let date = new Date();
const apiID = `931f131dde3f4ae2fcbc3289fc646471`;

// Function to fetch weather data
async function fetchWeather(url, isDefaultLocation = false) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const tempValue = Math.round(data["main"]["temp"]);
    const weatherMain = data["weather"][0]["main"];
    weather.innerHTML = weatherMain;

    // Updating the DOM
    if (isDefaultLocation) {
      myCity.innerHTML = `<span class="text-xl">Your Location :</span> ${data.name}`;
    } else {
      myCity.innerHTML = `<span class="text-xl">Result for :</span> ${data.name}`;
    }
    temp.innerHTML = `${tempValue}<span><sup>o</sup>C</span>`;
    weather.innerHTML = `${weatherMain}`;

    // Updating the Images according to the weather
    switch (weatherMain) {
      case "Clear":
        image.src = `sunny.png`;
        break;
      case "Clouds":
        image.src = `cloudy.png`;
        break;
      case "Rain":
        image.src = `rainy.png`;
        break;
      case "Drizzle":
        image.src = `drizzle.png`;
        break;
      case "Haze":
        image.src = `haze.png`;
        break;
      default:
        image.src = `default.png`;
        break;
    }

    // Updating dates
    const currentMonth = date.getMonth();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    dates.innerHTML = `${date.getDate()} ${
      monthNames[currentMonth]
    } ${date.getFullYear()}`;

    // Updating times
    function leftInterval() {
      const left = document.getElementById("todayTime");
      let leftDate = new Date();
      let hours = String(leftDate.getHours()).padStart(2, "0");
      let minutes = String(leftDate.getMinutes()).padStart(2, "0");
      let seconds = String(leftDate.getSeconds()).padStart(2, "0");
      left.innerHTML = `${hours} : ${minutes} : ${seconds}`;
    }
    setInterval(leftInterval, 1000);
  } catch (error) {
    console.log(error);
  }
}

// Function to get weather for default location
function getWeatherForDefaultLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiID}`;
      await fetchWeather(url, true); // Pass true to indicate it's the default location
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// Function to fetch weather for the entered city name
form.addEventListener("submit", async function (e) {
  // preventDefault() to stop page reload
  e.preventDefault();
  // Updating the city name
  let city = cityName.value;
  // API URL
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiID}`;
  await fetchWeather(url, false); // Pass false to indicate it's not the default location
});

// Get weather for default location on page load
getWeatherForDefaultLocation();
