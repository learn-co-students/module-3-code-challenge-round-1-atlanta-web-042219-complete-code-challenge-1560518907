document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  // URLs
  let imageId = 2851 //Enter the id from the fetched image here
  const IMAGE_URL = `https://randopic.herokuapp.com/images/${imageId}`
  const LIKE_URL = `https://randopic.herokuapp.com/likes/`
  const COMMENT_URL = `https://randopic.herokuapp.com/comments/`

  // HTML ELEMENTS
  const imageDiv = document.getElementById('image_card')
  const commentsUl = document.getElementById('comments')
  const likeSpan = document.getElementById('likes')
  const likeBtn = document.getElementById('like_button')
  const commForm = document.getElementById('comment_form')

  // EVENT LISTENERS
  document.addEventListener('click', handleClickEvent)
  commForm.addEventListener('submit', new_comment)
  likeBtn.addEventListener('click', like_image)

  // START or MAIN
  fetch_picture()

  //											//
  // FUNCTION DEFINITIONS //
  //											//
  function handleClickEvent(e) {
  	if(e.target.className === 'comm-delete-btn')
  		delete_comment(e.target.parentElement)
  }

  function fetch_picture() {
  	fetch(IMAGE_URL)
  	.then(resp => resp.json())
  	.then(show_image)
  }

  function like_image() {
  	likeSpan.innerText = parseInt(likeSpan.innerText)+1
  	fetch(LIKE_URL,{
  		method: 'POST',
  		headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify( {image_id: imageId} )
  	})
  }

  function new_comment(e) {
  	e.preventDefault()
  	fetch(COMMENT_URL,{
  		method: 'POST',
  		headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image_id: imageId,
				content: commForm.firstElementChild.value
			})
  	})
  	.then(resp => resp.json())
  	.then(add_comment_li)
  	commForm.reset()
  }

  function delete_comment(commLi) {
  	fetch(COMMENT_URL+'/'+commLi.id, {method: 'DELETE'})
  	.then(resp => resp.json())
  	.then(resp => console.log(resp.message))
  	.then(commLi.remove())
  }

  function show_image(image) {
  	// console.log(image)
  	imageDiv.dataset.imageId = image.id
  	imageDiv.firstElementChild.src = image.url
  	imageDiv.children[1].innerText = image.name
  	likeSpan.innerText = image.like_count

  	commentsUl.innerHTML = ''
  	image.comments.forEach(add_comment_li)
  }

  function add_comment_li(comment) {
  	commentsUl.innerHTML += `<li id=${comment.id}>${comment.content} <button class="comm-delete-btn">Delete</button></li>`
  }

  // END //
})
