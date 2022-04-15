let weather = {
  apiKey: "365f0c9da7f309012554f6f56b697b3c",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    var { name } = data;
    var { icon, description } = data.weather[0];
    var { temp, humidity } = data.main;
    var { speed } = data.wind;
    var cityEL = (document.querySelector(".city").innerText =
      "Weather in " + name);
    var iconEl = (document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png");

    var descriptionEl = (document.querySelector(".description").innerText =
      description);

    var tempEl = (document.querySelector(".temp").innerText = temp + "°C");

    var humidityEl = (document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%");

    var windEl = (document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h");

    var weatherEl = document
      .querySelector(".weather")
      .classList.remove("loading");

    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Ottawa");
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
