const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

//   SELECTING ELEMENT ON THE WEBPAGE
// it selects jus d first one it comes across. To select all - querySelectorAll
const form = document.querySelector("#form");
const search = document.getElementById("search");
const main = document.getElementById("main");
//another way querySelector ("p") or querySelectorAll("p")
const empty = document.querySelector('.empty')

//to get the movies from the api, GET .then async/await(res- response)

const getMovies = async (url) => {
    empty.style.display = 'none';
    main.innerHTML = '';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results); //will show on the console
  if(data.results.length > 0){
  displayMovies(data.results); //will show on the browser
  }  else {
    empty.style.display = 'block';
  }
};
getMovies(API_URL);

function displayMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    //movieDiv.className = "movie"
    movieDiv.innerHTML = `
    <img src = "${IMG_PATH + poster_path}" alt ="${title}">
    <div class = "movie-info">
    <h3> ${title} </h3>
    <span class ="${assignRatings(vote_average)}"> ${vote_average} </span>
    </div>
     
    <div class = "overview">
    <h3> Overview </h3>
     ${overview}
    </div>
    `;
    main.appendChild(movieDiv);
    //appendChild - means i want to put it inside of the main
  });
}
// we can also create div inside of javascript by using createElement

function assignRatings(ratings) {
    if (ratings >= 8) {
        return 'green';
    } else if (ratings >= 5){
        return 'orange';
    } else {
        return 'red';
    }
}

// how to get the elements
const hiddenSearch = document.querySelector('.hidden-search');
const span = document.querySelector(".hidden-search span");

// get movie based on search
form.addEventListener('submit', (e) => {
   e.preventDefault()
   const searchValue = search.value.trim();
   console.log(searchValue);
   if (searchValue) {
    span.textContent = searchValue;
    hiddenSearch.style.display = 'block';
    getMovies(SEARCH_API + searchValue);
    search.value = '';
   } else {
    window.location.reload()
   }
});


// const movies = [
//   {
//     title: "Ade",
//     poster_path: "imglink",
//     overview: "movie is good",
//     vote_average: 5.0,
//   },
//   {
//     title: "Ade 2",
//     poster_path: "imglink",
//     overview: "movie is good",
//     vote_average: 8.0,
//   },
// ];

// movies.forEach((movie) => {
//     const {title, poster_path, overview, vote_average} = movie;
//     const movieElement = document.createElement('div');
//     movieElement.className = 'movie';
//     movieElement.innerHTML = `
//     <span class = '${getRating}
//     `
// })


