import './style.css';

const url = 'https://api.tvmaze.com/shows/';

const movieWrapper = document.querySelector('.image-container');
const testMovie = async (url) => {
  movieWrapper.innerHTML = '';
  for (let i = 20; i < 29; i += 1) {
    fetch(url + i)
      .then((response) => response.json())
      .then((result) => {
        const movie = document.createElement('div');
        const movieDes = document.createElement('div');
        const movieDesTop = document.createElement('div');
        const movieBtn = document.createElement('div');
        const likesP = document.createElement('p');
        const likeSpan = document.createElement('span');

        const like = document.createElement('a');
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-heart');

        likesP.textContent = 'Likes';
        likeSpan.textContent = 2;
        likesP.append(likeSpan, 'like');
        like.append(icon, likeSpan);

        movie.classList.add('movie');
        movieDes.classList.add('movieDesc');
        movieDesTop.classList.add('movieDescTop');

        movie.id = i;
        const img = document.createElement('img');
        const title = document.createElement('h3');
        const genere = document.createElement('p');
        const summary = document.createElement('p');
        const comment = document.createElement('button');
        const reservation = document.createElement('button');
        title.textContent = result.name;
        genere.textContent = result.genres;
        comment.textContent = 'Comment';

        reservation.textContent = 'Reservation';

        movieBtn.append(comment, reservation);
        img.src = result.image.medium;
        movieDesTop.append(title, like);
        movieDes.append(movieDesTop);

        movie.append(img, movieDes, movieBtn);
        movieWrapper.appendChild(movie);
      });
  }
};
testMovie(url);
