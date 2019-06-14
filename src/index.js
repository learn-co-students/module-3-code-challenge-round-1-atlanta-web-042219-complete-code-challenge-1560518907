document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2724 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
//01
  fetch_display()

  function fetch_display(){
    fetch(imageURL)
    .then(res => res.json())
    .then(image => display_Setup(image))
  }

  function display_Setup(image){
    let display_image = document.querySelector('#image')
    let display_name = document.querySelector('#name')
    let display_likes = document.querySelector('#likes')
    let comment_ul = document.querySelector('#comments')

    display_image.src = image.url
    display_name.textContent = image.name
    display_likes.textContent = image.like_count

    image.comments.forEach(comment => {
      comment_ul.innerHTML += `<li>${comment.content}</li>`
    })
  }
//02
  like_button.addEventListener('click',function(e){
    e.preventDefault()

    let show_likes = parseInt(document.querySelector('#likes').innerText)
    show_likes++
    document.querySelector('#likes').textContent = show_likes
//03
    fetch(likeURL, {
      method: 'POST',
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({image_id: imageId})
    })
  })
//04
  comment_form.addEventListener('submit', function(e){
    e.preventDefault()

    let input_comment = e.target.comment_input.value
    let comment_ul = document.querySelector('#comments')
    comment_ul.innerHTML += `<li>${input_comment}</li>`
//05
    fetch(commentsURL, {
      method: 'POST',
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({image_id: imageId, content: input_comment})
    })
    e.target.reset()
  })
})
