document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2847 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageDiv = document.getElementById("image_card")
  const formComments = document.getElementById("form-comments")
  const likeButton = document.getElementById("like_button")
  likeButton.addEventListener('click', addLikes)


fetch(imageURL)
.then(res =>res.json())
.then(img =>
  renderImage(img)
)

function renderImage(img){
  imageDiv.innerHTML = 
  `<img src=${img.url} id="image" data-id="${img.id}"/>
  <h4 id="name">${img.name}</h4>
  <span>Likes:
    <span id="likes">${img.like_count}</span>
  </span>`

formComments.innerHTML = 
  `<form id="comment_form">
  <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
  <input type="submit" value="Submit"/>
</form>
<ul id="comments">

<li>${img.comments.forEach(c =>{
  c.content})}</li>
</ul>`
}
renderImage()

function addLikes(){
  likes = document.getElementById("likes")
  ++likes.innerText

  fetch(likeURL, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: 
    {
      image_id: (2847)
    }
    // JSON.stringify({like_count: likes.innerText})
}).then(res =>res.json())
}















})
