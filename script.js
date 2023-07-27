// Variabless
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

// Function work when user input the city name
form.addEventListener("submit", function (e) {
  // preventDefault() to stop page reload
  e.preventDefault();

  // Updating the city name
  let city = cityName.value;
  const myWeatherContainer = document.querySelector(".weatherContainer");
  const apiID = `931f131dde3f4ae2fcbc3289fc646471`;
  // API URL
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiID}`;

  // fetching data from the weather api
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const tempValue = Math.round(data["main"]["temp"]);
      const weatherMain = data["weather"][0]["main"];
      weather.innerHTML = weatherMain;

      // Updating the DOM
      myCity.innerHTML = city;
      temp.innerHTML = `${tempValue}`;
      weather.innerHTML = `${weatherMain}`;
      temp.innerHTML = `${tempValue}<span><sup>o</sup>C</span.`;

      // Updating the Images according to the weather
      if (weatherMain == "Clear") {
        image.src = `sunny.png`;
        myWeatherContainer.style.backgroundColor = "#333";
      }
      if (weatherMain == "Clouds") {
        image.src = `cloudy.png`;
        myWeatherContainer.style.backgroundColor = "#333";
      }
      if (weatherMain == "Rain") {
        image.src = `rainy.png`;
        myWeatherContainer.style.backgroundColor = "#333";
      }
      if (weatherMain == "Drizzle") {
        image.src = `drizzle.png`;
        myWeatherContainer.style.backgroundColor = "#333";
      }
      if (weatherMain == "Haze") {
        image.src = `haze.png`;
        myWeatherContainer.style.backgroundColor = "#333";
      }

      // Updating dates
      const currentMonth = date.getMonth();
      switch (currentMonth) {
        case 0:
          dates.innerHTML = `${date.getDate()} Januari ${date.getFullYear()}`;
          break;
        case 1:
          dates.innerHTML = `${date.getDate()} Februari ${date.getFullYear()}`;
          break;
        case 2:
          dates.innerHTML = `${date.getDate()} Maret ${date.getFullYear()}`;
          break;
        case 3:
          dates.innerHTML = `${date.getDate()} April ${date.getFullYear()}`;
          break;
        case 4:
          dates.innerHTML = `${date.getDate()} Mei ${date.getFullYear()}`;
          break;
        case 5:
          dates.innerHTML = `${date.getDate()} Juni ${date.getFullYear()}`;
          break;
        case 6:
          dates.innerHTML = `${date.getDate()} Juli ${date.getFullYear()}`;
          break;
        case 7:
          dates.innerHTML = `${date.getDate()} Agustus ${date.getFullYear()}`;
          break;
        case 8:
          dates.innerHTML = `${date.getDate()} September ${date.getFullYear()}`;
          break;
        case 9:
          dates.innerHTML = `${date.getDate()} Oktober ${date.getFullYear()}`;
          break;
        case 10:
          dates.innerHTML = `${date.getDate()} November ${date.getFullYear()}`;
          break;
        case 11:
          dates.innerHTML = `${date.getDate()} Desember ${date.getFullYear()}`;
          break;
      }

      // Updating times
      function leftInterval() {
        const left = document.getElementById("todayTime");
        let leftDate = new Date();
        let hours = String(leftDate.getHours()).padStart(2, "0");
        let minutes = String(leftDate.getMinutes()).padStart(2, "0");
        let seconds = String(leftDate.getSeconds()).padStart(2, "0");

        // if (hours == 0) {
        //   hours = 12;
        // }

        // if (hours > 12) {
        //   hours = hours - 12;
        // }
        left.innerHTML = `${hours} : ${minutes} : ${seconds}`;
      }
      setInterval(leftInterval, 1000);
    });
});
