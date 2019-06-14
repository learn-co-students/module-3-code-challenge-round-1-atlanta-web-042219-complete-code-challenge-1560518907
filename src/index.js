let imageId = 2850 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const image = document.querySelector('#image')
const name = document.querySelector('#name')
const likes = document.querySelector('#likes')
const comments = document.querySelector('#comments')
const form = document.querySelector('#comment_form')
let editHolder

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  document.querySelector('#like_button').addEventListener('click', addLike)
  form.addEventListener('submit', addComment)
  document.addEventListener('click', handleClicks)
  init()
})

function init() {
  fetch(imageURL)
    .then(res => res.json())
    .then(displayPic)
}

function displayPic(pic) {
  image.dataset.id = pic.id
  image.src = pic.url
  name.innerText = pic.name
  likes.innerText = pic.like_count
  pic.comments.forEach(displayComment);
}

function displayComment(comment) {
  comments.innerHTML += `<li data-id="${comment.id}">${comment.content}<span><button class="2nd best">Edit</button></span><span><button class="best button">x</button></span></li>`
}

function addLike(e) {
  likes.innerText++
  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image_id: imageId })
  })
}

function addComment(e) {
  e.preventDefault()
  const comment = { image_id: imageId, content: e.target.comment.value }
  fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())
    .then(displayComment)
}

function handleClicks(e) {
  if (e.target.className === "best button") deleteComment(e)
  if (e.target.className === "2nd best") editComment(e)
}

function deleteComment(e) {
  const comment = e.target.parentElement
  fetch(commentsURL + `/${comment.dataset.id}`, {
    method: 'DELETE'
  }).then(() => comment.remove())
}

function editComment(e) {
  editHolder = e.target.parentElement.parentElement
  const comment = e.target.parentElement.parentElement.innerText.split('Editx')[0]
  const result = prompt(`Edit Comment`, comment)
  console.log(editHolder.dataset.id);
  editHolder.innerHTML = `${result}<span><button class="2nd best">Edit</button></span><span><button class="best button">x</button></span>`
  fetch(commentsURL + `${editHolder.dataset.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: result })
  })
}
