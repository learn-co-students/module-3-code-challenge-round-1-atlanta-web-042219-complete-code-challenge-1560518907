document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
 
  let imageId = 1 //Enter the id from the fetched image here
 
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
 
  const likeURL = `https://randopic.herokuapp.com/likes/`
 
  const commentsURL = `https://randopic.herokuapp.com/comments/`
 
  const response = {
    "id": 1,
    "url": "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg",
    "name": "The Internet!",
    "like_count": 0,
    "comments": [
      {
        "id": 5941,
        "content": "first comment!",
        "image_id": 1158,
        "created_at": "2018-10-18T17:06:14.859Z",
        "updated_at": "2018-10-18T17:06:14.859Z"
      }
    ]
  }
  showImage(response)
 
  // like logic
  const like_button  = document.getElementById("like_button")
  like_button.addEventListener('click',increaseLikes)
 
  // comment logic
  const comment_form = document.getElementById("comment_form")
  comment_form.addEventListener('submit',addComment)
 
  function showImage(response){
    const image_ele = document.getElementById("image")
    const name_ele = document.getElementById("name")
    const like_ele = document.getElementById("likes")
    const comment_list = document.getElementById("comments")
 
    image_ele.src = response.url
    name_ele.innerText = response.name
    like_ele.innerText = response.like_count
 
    response.comments.forEach(comment => {
      comment_list.innerHTML += `<li> ${comment.content}</li>`
    })
  }
 

  
  function increaseLikes(e){
    const like_ele = document.getElementById("likes")
    like_ele.innerText = parseInt(like_ele.innerText) + 1 
    const like_update = {
      "image_id": imageId
    }
    fetch(imageURL,{
      method: "PATCH",
      headers: {  
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(like_update)
    }).then(res => res.json())
    
  
  }


  
  function addComment(e){
    e.preventDefault()
    // console.log(e.target.comment.value)
    const comment_list = document.getElementById("comments")
   
    comment_list.innerHTML += `<li> ${e.target.comment.value} </li>`
    }
 
    fetch("https://randopic.herokuapp.com/comments",{
      method: "POST",
      headers: {  
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(like_update)
    }).then(res => res.json())
    
})

