// const apiKey = '2d3de4ed1364f3aeaf148be70882e80b';

// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

// const weatherIcon = document.querySelector('.weather-image i')
// const searchInput = document.querySelector('.search-box__input')
// const searchButton = document.querySelector('.search-box__button')
// const weather = document.querySelector('.weather')

// async function checkWeather(city) {
//   try {
//     const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
//     if (!response.ok) {
//       if (response.status === 404 || 400) {
//         searchInput.setAttribute('placeholder', 'Не верное название');
//         searchInput
//       } else {
//         searchInput.setAttribute('placeholder', 'Ошибка при получении данных.');
//       }
//     }
//     const data = await response.json();

//     document.querySelector('.city').innerHTML = data.name
//     document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&#8451'
//     document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
//     document.querySelector('.wind').innerHTML = data.wind.speed + 'км/ч'

//     if (data.weather[0].main == 'Clear') {
//       weatherIcon.className = 'fa-solid fa-sun'
//     } else if (data.weather[0].main == 'Rain') {
//       weatherIcon.className = 'fa-solid fa-cloud-rain'
//     } else if (data.weather[0].main == 'Mist') {
//       weatherIcon.className = 'fa-solid fa-cloud-mist'
//     } else if (data.weather[0].main == 'Drizzle') {
//       weatherIcon.className = 'fa-solid fa-cloud-drizzle'
//     }
//     weather.style.display = 'block'
//     errorText.style.display = 'none'
//   } catch (error) {
//   }
// }

// searchButton.addEventListener('click', () => {
//   checkWeather(searchInput.value.trim())
//   searchInput.value = ''
//   searchInput.setAttribute('placeholder', '')
//   searchInput.focus()
// })
// searchInput.addEventListener("keydown", (event) => {
//   if (event.keyCode === 13) {
//     checkWeather(searchInput.value.trim())
//     searchInput.value = ''
//     searchInput.setAttribute('placeholder', '')
//     searchInput.focus()
//   }
// })

const apiKey = '2d3de4ed1364f3aeaf148be70882e80b';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weatherIcon = document.querySelector('.weather-image i');
const searchInput = document.querySelector('.search-box__input');
const searchButton = document.querySelector('.search-box__button');
const weather = document.querySelector('.weather');

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) {
      searchInput.setAttribute('placeholder', response.status === 404 || 400 ? 'Не верное название' : 'Ошибка при получении данных.');
      return;
    }

    const data = await response.json();
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}&#8451;`;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed} км/ч`;

    const weatherConditions = {
      Clear: 'fa-solid fa-sun',
      Rain: 'fa-solid fa-cloud-rain',
      Mist: 'fa-solid fa-cloud-mist',
      Drizzle: 'fa-solid fa-cloud-drizzle'
    };

    weatherIcon.className = weatherConditions[data.weather[0].main] || 'fa-solid fa-cloud'; // Установка иконки по умолчанию
    weather.style.display = 'block';
    errorText.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
}

const resetInput = () => {
  searchInput.value = '';
  searchInput.setAttribute('placeholder', '');
  searchInput.focus();
}

const handleSearch = () => {
  checkWeather(searchInput.value.trim());
  resetInput();
}

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});