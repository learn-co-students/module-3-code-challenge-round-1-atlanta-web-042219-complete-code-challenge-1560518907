document.addEventListener('DOMContentLoaded', init)
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2845 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/${imageId}`
  const commentsURL = `https://randopic.herokuapp.com/comments/${imageId}`
  const imageCard = document.getElementsByClassName("#image_card")
  const commentForm = document.querySelector("#comment_form")
  const commentInput = document.querySelector("#comment_input")
  const comments = document.querySelector("#comments")
  const likes = document.querySelector("#likes")
  const likeBtn = document.querySelector("#like_button")

function init(){
  getImage()

  commentForm.addEventListener("submit", addComment)
  likeBtn.addEventListener("click", increaseLikes)

}

function getImage() {
  return fetch(imageURL)
  .then(res => res.json())
  .then(res => addImage(res))
}

function addImage(image){
  let card = `<img src="${imageURL.url}" id="image" data-id="${image.image_id}">
      <h4 id="name">${image.name}</h4>
      <span>Likes:
        <span id="likes">${image.like_count}</span>
      </span>
      <button id="like_button">Like</button>
      <form id="comment_form">
        <input id="comment_input" type="text" name="comment" placeholder="Add Comment">
        <input type="submit" value="Submit">
      </form>
      <ul id="comments">
          <li> ${image.comments.content}
      </ul>
    </div>`

imageCard.innerHTML += card
}