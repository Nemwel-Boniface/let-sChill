import './style.css';
import xIcon from './images/x-icon.png';
import { result } from 'lodash';

const baseMovieURL = 'https://api.tvmaze.com/shows/';
const involvementID = 'IiSu15JW6SgjFyni4ntZ';
const involvementURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${involvementID}/`;
const involvementLikes = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ADIK65sjpCXvzrCJe3B4/likes/`;

const movieWrapper = document.querySelector('.image-container');
const commentWraper = document.querySelector('.comment-main-container');
let likesReturn = [];

const addToInvolvement = async (index, clicked) => {
  await fetch(involvementLikes, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      'item_id': index,
      'likes': clicked,
    })
  })
  .then((response) => response.text())
    .then((response) => console.log(response))
}

const testMovie = async (baseMovieURL) => {
console.log(result.likes)
  for (let i = 20; i < 29; i += 1) {
    await fetch(baseMovieURL + i)
      .then((response) => response.json())
      .then((result) => {
        const movie = document.createElement('div');
        movie.classList.add('movie');
        movie.id = i;

        const img = document.createElement('img');
        img.alt = 'Movie Image';

        const movieDes = document.createElement('div');
        movieDes.classList.add('movieDesc');

        const movieDesTop = document.createElement('div');
        movieDesTop.classList.add('movieDescTop');

        const movieTitle = document.createElement('p');
        movieTitle.textContent = result.name;
        movieTitle.style.fontWeight = 'bold';
        movieTitle.style.fontSize = '1.5rem';

        const like = document.createElement('a');
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-heart');

        const likesP = document.createElement('p');
        const likeSpan = document.createElement('span');

        likesP.append(likeSpan, ' likes');
        like.appendChild(icon);

        let clicked;
        fetch(involvementLikes, { method: 'GET' })
           .then((response) => response.json())
            .then((result) => {
            const filteredResult = result.filter(
            (r) => r.item_id === `${i}`
           );
          likeSpan.textContent = filteredResult[0].likes;
          clicked = filteredResult[0].likes;
          console.log(filteredResult);
          });

        like.addEventListener('click', () => {
          clicked += 1;
          addToInvolvement(movie.id, clicked);
          likeSpan.textContent = clicked;
          console.log(`Movie ${movie.id} was touched`);
        })

        const movieBtn = document.createElement('div');
        movieBtn.classList.add('movieBtn');

        const genere = document.createElement('p');
        const summary = document.createElement('p');
        const comment = document.createElement('button');
        const reservation = document.createElement('button');

        summary.classList.add('summary');

        genere.textContent = result.genres;
        comment.textContent = 'Comment';
        reservation.textContent = 'Reservation';

        comment.addEventListener('click', () => {
          document.querySelector('main').classList.toggle('blur-50vh');
          document.querySelector('footer').classList.toggle('blur');

          const closeIcon = new Image();
          closeIcon.classList.add('x-icon');

          closeIcon.src = xIcon;

          closeIcon.addEventListener('click', () => {
            commentWraper.innerHTML = '';
            document.querySelector('main').classList.toggle('blur-50vh');
            document.querySelector('footer').classList.toggle('blur');
            window.location.reload();
          });

          const commentContainer = document.createElement('div');
          commentContainer.classList.add('comment-container');
          const commentListContainer = document.createElement('div');
          const commentsCounter = document.createElement('h3');
          commentsCounter.style.textAlign = 'center';
          commentsCounter.style.margin = '20px 0';

          const commentLists = document.createElement('ul');
          commentLists.classList.add('comment-lists');
          const commentListItem1 = document.createElement('li');
          const commentListItem2 = document.createElement('li');
          const commentListItem3 = document.createElement('li');

          commentListItem1.innerHTML = '03/11/2021 Alex:I\'d love to buy it!';
          commentListItem2.innerHTML = '03/11/2021 Alex:I\'d love to buy it!';
          commentListItem3.innerHTML = '03/11/2021 Alex:I\'d love to buy it!';

          commentLists.append(
            commentListItem1,
            commentListItem2,
            commentListItem3,
          );

          commentsCounter.innerHTML = 'Comments(2)';
          commentListContainer.append(commentsCounter, commentLists);

          commentContainer.classList.add('comment-container');
          const orginalImg = document.createElement('img');
          orginalImg.src = result.image.original;
          orginalImg.classList.add('orginal-image');
          movieTitle.textContent = result.name;
          genere.textContent = result.genres;

          summary.innerHTML = result.summary;
          summary.style.fontStyle = 'italic';
          commentContainer.append(
            orginalImg,
            movieTitle,
            genere,
            summary,
            commentListContainer,
          );
          commentContainer.appendChild(closeIcon);
          document.querySelector('form').classList.toggle('dn');
          commentWraper.prepend(commentContainer);
        });
        movieBtn.append(comment, reservation);
        img.src = result.image.medium;
        movieDesTop.append(movieTitle, like);
        movieDes.append(movieDesTop, likesP);

        movie.append(img, movieDes, movieBtn);
        movieWrapper.appendChild(movie);
      });
  }
};


document.addEventListener('DOMContentLoaded', (e) => {
  testMovie(baseMovieURL);
  // getFromInvolvement();
})