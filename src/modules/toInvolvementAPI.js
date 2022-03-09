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

export default addToInvolvement;