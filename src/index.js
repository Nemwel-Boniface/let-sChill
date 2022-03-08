import './style.css';

let randomID;
const url = `https://api.tvmaze.com/shows/`;

const movieWrapper = document.querySelector('.image-container');
const testMovie = async (url) => {

  movieWrapper.innerHTML = '';
  for(let i = 700; i < 709; i += 1) {
  await fetch(url + i)
    .then((response) => response.json())
    .then((result) => {
        movieWrapper.innerHTML = `${movieWrapper.innerHTML}
        <div class="movie" id="${i}">
          <img src="${result.image.medium}" alt="movie">
          <div class="movieDesc">
            <div class="movieDescTop">
              <p>${result.name}</p>
              <a href="#"><i class="fa fa-heart" aria-hidden="true"></i>
              </a>
            </div>
            <p><span>2</span>Likes</p>
          </div>
          <div class="movieBtn">
            <button id="${i}" class="comments" type="button">Comments</button>
            <button class="reservations" type="button">Reservations</button>
          </div>
        </div>`;
    });
  }
};
testMovie(url);
