import './style.css';
import xIcon from './images/x-icon.png';
import { DateTime } from 'luxon';

import {
  addToInvolvement,
  addCommentToInvolvement,
} from './modules/toInvolvementAPI.js';

import { commentCounterFunc } from './modules/commentCounter.js';

import { countAllMovies } from './modules/movieCounter.js';

const baseMovieURL = 'https://api.tvmaze.com/shows/';
const involvementLikes =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ADIK65sjpCXvzrCJe3B4/likes/';
const involvementComments =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ADIK65sjpCXvzrCJe3B4/comments/';
const movieWrapper = document.querySelector('.image-container');
const commentWraper = document.querySelector('.comment-main-container');
const movieCount = [];

const testMovie = async (baseMovieURL) => {
  for (let i = 20; i < 32; i += 1) {
    movieCount.push(i);
    fetch(baseMovieURL + i)
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
            const filteredResult = result.filter((r) => r.item_id === `${i}`);
            likeSpan.textContent = filteredResult[0].likes;
            clicked = filteredResult[0].likes;
          });

        like.addEventListener('click', () => {
          clicked += 1;
          addToInvolvement(involvementLikes, movie.id, clicked);
          likeSpan.textContent = clicked;
        });

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
          commentWraper.classList.remove('dn');
          document.querySelector('main').classList.toggle('blur-50vh');
          document.querySelector('footer').classList.toggle('blur');

          const closeIcon = new Image();
          closeIcon.classList.add('x-icon');

          closeIcon.src = xIcon;

          closeIcon.addEventListener('click', () => {
            commentWraper.classList.add('dn');
            document.querySelector('main').classList.toggle('blur-50vh');
            document.querySelector('footer').classList.toggle('blur');
            window.location.reload();
          });

          const commentContainer = document.createElement('div');
          commentContainer.classList.add('comment-container');
          const commentListContainer = document.createElement('div');
          commentListContainer.classList.add('comment-list-container');
          const commentsCounter = document.createElement('h3');
          commentsCounter.style.textAlign = 'center';
          commentsCounter.style.margin = '20px 0';

          const commentLists = document.createElement('ul');
          commentLists.classList.add('comment-lists');
          let commentCount;

          fetch(`${involvementComments}?item_id=${i}`, { method: 'GET' })
            .then((response) => response.json())
            .then((result) => {
              commentCount = commentCounterFunc(result);
              commentsCounter.innerHTML = `Comments (${commentCount})`;
              result.forEach((commentItem) => {
                const commentListItem = document.createElement('li');
                commentListItem.innerHTML = `<strong><time>${commentItem.creation_date}</time> <span>${commentItem.username}</span></strong> : <span>${commentItem.comment}</span>`;
                commentLists.appendChild(commentListItem);
              });
            });

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
            commentListContainer
          );
          commentContainer.appendChild(closeIcon);
          document.querySelector('form').classList.toggle('dn');
          commentWraper.prepend(commentContainer);

          const usernameInput = document.querySelector('#user-name');
          const commentInput = document.querySelector('#comment-message');
          const commentSubmitBtn = document.querySelector('#submit-comment');

          commentSubmitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (usernameInput.value !== '' && commentInput.value !== '') {
              commentCount += 1;
              commentsCounter.innerHTML = `Comments (${commentCount})`;
              const username = usernameInput.value;
              const comment = commentInput.value;

              addCommentToInvolvement(
                involvementComments,
                i,
                username,
                comment
              );

              const datePosted = DateTime.now().toFormat('yyyy-MM-dd');
              const newComment = document.createElement('li');
              newComment.innerHTML = `<strong><time>${datePosted}</time> <span>${username}</span></strong> : <span>${comment}</span>`;
              commentLists.appendChild(newComment);
            }

            usernameInput.value = '';
            commentInput.value = '';
          });
        });
        movieBtn.append(comment, reservation);
        img.src = result.image.medium;
        movieDesTop.append(movieTitle, like);
        movieDes.append(movieDesTop, likesP);

        movie.append(img, movieDes, movieBtn);
        movieWrapper.appendChild(movie);
      });
  }
  const movieCounter = document.getElementById('movieCount');
  movieCounter.innerHTML = countAllMovies(movieCount);
};

document.addEventListener('DOMContentLoaded', () => {
  testMovie(baseMovieURL);
});

export default involvementLikes;
