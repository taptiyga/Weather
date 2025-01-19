const apiKey = '2d3de4ed1364f3aeaf148be70882e80b';

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const weatherIcon = document.querySelector('.weather-image i')
const searchInput = document.querySelector('.search-box__input')
const searchButton = document.querySelector('.search-box__button')
const weather = document.querySelector('.weather')
const errorText = document.querySelector('.error')

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const data = await response.json();
    console.log(data)

    document.querySelector('.city').innerHTML = data.name
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&#8451'
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
    document.querySelector('.wind').innerHTML = data.wind.speed + 'км/ч'

    if (data.weather[0].main == 'Clear') {
      weatherIcon.className = 'fa-solid fa-sun'
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.className = 'fa-solid fa-cloud-rain'
    } else if (data.weather[0].main == 'Mist') {
      weatherIcon.className = 'fa-solid fa-cloud-mist'
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.className = 'fa-solid fa-cloud-drizzle'
    }
    weather.style.display = 'block'
    errorText.style.display = 'none'
  } catch (error) {
    errorText.style.display = 'block'
    weather.style.display = 'none'

  }
}


searchButton.addEventListener('click', () => {
  checkWeather(searchInput.value)
  searchInput.value = ''
  searchInput.focus()
})
searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchInput.value)
    searchInput.value = ''
    searchInput.focus()
  }
})
