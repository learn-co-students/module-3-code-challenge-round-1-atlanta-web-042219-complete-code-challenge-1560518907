/////////////////////////VARIABLES I NEED//////////////////////////////
const imageId = 2852 //Enter the id from the fetched image here
//I changed this variable to const to make sure I don't change it
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const image = document.querySelector("#image")//where we put the imageURL
const imageName = document.querySelector("#name")
const imageDiv = document.querySelector("#image_card")

const likeURL = `https://randopic.herokuapp.com/likes/`
let likesGoHere = document.querySelector("#likes")
const likeButton = document.querySelector("#like_button")

const commentURL = `https://randopic.herokuapp.com/comments/`
const commentUL = document.querySelector("#comments")
const commentForm = document.querySelector("#comment_form")


///////////////////////////DOMCONTENTLOADED///////////////////////////////
document.addEventListener('DOMContentLoaded', init)
///////////////////////////FUNCTIONS//////////////////////////////////////

//init WORKING
function init(){
  console.log('%c Les get it started! UH HUH! Les get it started in here!', 'color: magenta')
  fetchImage()
  likeButton.addEventListener("click", addLike)
  commentForm.addEventListener("submit", addComment)
}//END

//fetchImage WORKING
function fetchImage(){
  console.log("%c Look at you! Fetchin n shit!", "color:magenta")

  fetch(imageURL)
  .then(res => res.json())
  .then(res => loadImage(res))
}//END

//loadImage WORKING
function loadImage(img){
  // console.log(img)
  image.src = img.url
  imageName.innerText = img.name
  likesGoHere.innerText = img.like_count
}//END

//addLikes WORKING
function addLike(){
  console.log("%c I like you too..", "color:red", likeURL)
  let newNum = parseInt(likesGoHere.innerText)
  newNum += 1
  likesGoHere.innerText = newNum
  toString(likesGoHere)
  persistLike()
}//END

//persistLike WORKING
function persistLike(){
  let updateImg = {image_id: imageId}
  fetch(likeURL, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "accepts": "application/json",
    },
    body: JSON.stringify(updateImg)
  })
}//END

//addComment WORKING
function addComment(e){
  e.preventDefault()
  console.log("%c Phuck the time. KEEP GOING QUEEN!", "color:green")
  let commentInput = e.target.comment_input.value

  let li = document.createElement('li')
  li.innerText = commentInput
  commentUL.appendChild(li)

  persistComment(e, commentInput)
}//END

function persistComment(e, commentInput){
  // debugger
  let updateCom = {image_id: imageId, content: commentInput}

  fetch(commentURL, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "accepts": "application/json",
    },
    body: JSON.stringify(updateCom)
  })


  console.log("ALMOST THERE!")
}//END
