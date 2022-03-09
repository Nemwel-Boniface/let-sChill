const addToInvolvement = (involvementLikes, index, clicked) => {
  fetch(involvementLikes, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      item_id: index,
      likes: clicked,
    }),
  })
    .then((response) => response.text());
};

const addCommentToInvolvement = (
  involvementComments,
  index,
  username,
  comment,
) => {
  fetch(involvementComments, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      item_id: index,
      username,
      comment,
    }),
  }).then((response) => response.text());
};

export { addToInvolvement, addCommentToInvolvement };