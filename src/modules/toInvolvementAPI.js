const addToInvolvement = async (involvementLikes, index, clicked) => {
  await fetch(involvementLikes, {
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

const addCommentToInvolvement = async (
  involvementComments,
  index,
  username,
  comment,
) => {
  await fetch(involvementComments, {
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