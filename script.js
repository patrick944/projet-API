


// Ce code JavaScript permet de récupérer et d'afficher les films les plus populaires en utilisant l'API de The Movie Database (TMDb). Il comprend deux fonctions principales : une pour récupérer la liste des films les plus populaires et l'autre pour obtenir les détails d'un film spécifique.
// fetch("https://api.themoviedb.org/3/discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images&api_key=b1bb009f89a909c0ae0b65bc17104e0e")
//   .then((response) => response.json())
//   .then((data) =>  {
//         data.results.forEach(film => {
//             const box = document.getElementById("box")

//             const imgPoster = document.createElement("img")
//             imgPoster.src = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + film.poster_path
//             imgPoster.className = "poster"
//             box.appendChild(imgPoster)

//             const title = document.createElement("h2")
//             title.innerHTML = film.title
//             box.appendChild(title)

//             //imgPoster.addEventListener("click", console.log(film.id));

//             // id = ???
//             getMovie(film.id)

//         });

        
//   });

// const getMovie = (id) => {
//   fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b1bb009f89a909c0ae0b65bc17104e0e&append_to_response=videos&include_adult=false`)
//   .then((response) => response.json())
//   .then((data) =>  {

//         console.log("ONE MOVIE-----", data); 
//   });
// }
const API_KEY ='api_key=b1bb009f89a909c0ae0b65bc17104e0e';
const BASE_URL ='https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
const searchURL = BASE_URL + 'search/movie?'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';
    
    
    data.forEach(movie => {
        const{title,poster_path,overview,vote_average} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML =`
        <img src="${IMG_URL + poster_path }" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>`

            main.appendChild(movieEl);

    })
}
function getColor(vote){
    if(vote >= 8){
        return 'green';
    }else if (vote >= 5){
        return 'orange';
    }else{
         return 'red';
    }
}

form.addEventListener('submit',(e) =>{
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }
})