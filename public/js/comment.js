const commentFormHandler = async function (event) {
  event.preventDefault();

  const postId = document.querySelector('.new-comment-form').dataset.post_id;

  const commentMessage = document
    .querySelector('#comment-message')
    .value.trim();

  if (commentMessage) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        commentMessage,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    document.location.reload();
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', commentFormHandler);
