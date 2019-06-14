document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2849 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imgDiv = document.getElementById('image_card')
  const likeSpan = document.getElementById('likes')
  const commentList = document.getElementById('comments')
  const likeBtn = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')


  likeBtn.addEventListener('click', handleLike)
  commentForm.addEventListener('submit', handleComment)
  commentList.addEventListener('click', handleDelete)

  fetchImages()
  function fetchImages(){
    fetch(imageURL)
    .then(res => res.json())
    .then(renderImg)
  }

  function renderImg(img){
    imgDiv.children[0].src = img.url
    imgDiv.children[0].dataset.id = img.id
    imgDiv.children[1].innerText = img.name
    likeSpan.innerText = img.like_count
    if (img.comments.length){
      img.comments.forEach(createComment)
    }
  }

  function handleLike(e){
    let likedId = parseInt(e.target.parentNode.children[0].dataset.id)
    let parsedLikes = parseInt(likeSpan.innerText)
    likeSpan.innerText = ++parsedLikes

    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: likedId
      })
    })
  }

  function handleComment(e){
    e.preventDefault()
    let newContent = e.target.comment.value
    let imageId = parseInt(e.target.parentNode.children[0].dataset.id)
    

    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: newContent,
        image_id: imageId
      })
    }).then(res => res.json())
    .then(json => createComment(json))
    .then(e.target.reset())
  }

  function createComment(comment){
    let delBtn = document.createElement('button')
    let li = document.createElement('li')
    delBtn.innerText = 'x'
    delBtn.id = 'delete-button'
    li.id = comment.id
    li.innerText = comment.content
    li.append(delBtn)
    commentList.append(li)
  }

  function handleDelete(e){
    if (e.target.id === 'delete-button'){
      let comId = e.target.parentNode.id
      fetch(`${commentsURL}/${comId}`, {
        method: 'DELETE'
      }).then(removeComment(comId))
    }
  }
  
  function removeComment(id){
   let comm = document.getElementById(id)
   comm.remove()
  }

})
