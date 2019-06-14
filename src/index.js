document.addEventListener('DOMContentLoaded', () => {
let imageId = 2842
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imageCard = document.querySelector('#image_card')
let likeArea = document.querySelector('#likes')
let commentBar = document.querySelector('#comments')
let commentForm = document.querySelector('#comment_form')
showComments()

document.addEventListener('click', handleEvent)
imageCard.addEventListener('submit', handleSubmit)

fetch(imageURL)
.then(res =>res.json())
.then(showImage)

function showImage(image){
  imageCard.innerHTML =
  `<img src="${image.url}" id="image" data-id="${image.id}"/>
  <h4 id="name">${image.name}</h4>
  <span>Likes:
    <span id="likes">${image.like_count}</span>
  </span>
  <button id="like_button">Like</button>
  <form id="comment_form">
    <input id="comment_input" type="text" name="comment" value=" " placeholder="Add Comment"/>
    <input type="submit" value="Submit"/>
  </form>
  <ul id="comments">${commentBar.innerHTML}</ul>
  `
}

function showComments(comment){
  commentBar.innerHTML = `
       <li>${image.comments? image.comments : 'No Comments Yet'}</li>`
}
function handleEvent(e){
  if (e.target.innerHTML === 'Like'){
    increaseLikeCount(e)
  }
}

function increaseLikeCount(e){

  let imageId = e.target.offsetParent.childNodes[0].dataset.id
  let updatedLikes = ++ e.target.offsetParent.childNodes[4].childNodes[1].innerText

  likeArea.innerHTML = `${updatedLikes}`

  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json'
    },
    body: JSON.stringify({
       image_id: imageId
    })
  })
  .then(res => res.json())
}

function handleSubmit(e){
  e.preventDefault()
  // console.log(e)
  let imageID = e.target.parentElement.children[0].attributes[2].nodeValue
  // console.log(commentForm.parentElement)
  // let content = something I cannot figure out atm, unfortunately should be innerTEXT of comment-input

  fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: content
    })
  }).then(res => res.json())



}

})
