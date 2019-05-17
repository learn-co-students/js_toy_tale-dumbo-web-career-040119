const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block';
    // submit listener here
  } else {
    toyForm.style.display = 'none';
  }
});

const toyCollection = document.querySelector("#toy-collection")


fetch("http://localhost:3000/toys")
  .then(function(res) { 
    return res.json()
  })
  // .then(console.log)
  .then(data => data.forEach(slapToyOnTheDom))

function slapToyOnTheDom(toy){
  const div = document.createElement("div")
  div.className = "card"
  
  div.innerHTML = div.innerHTML + `
    <h2>${ toy.name }</h2>
    <img src="${ toy.image }" class="toy-avatar" />
    <p><span id="toy-${ toy.id }-likes">${ toy.likes }</span> Likes</p>
  `
  const button = document.createElement("button")
  button.innerText = "Like 💗"
  button.dataset.toyId = toy.id
  button.addEventListener("click", increaseLikes)
  div.appendChild(button)

  toyCollection.appendChild(div)
}

function increaseLikes(event) {
  // figure out which toy needs its likes increased
  const button = event.target
  // console.log(event)
  // console.log(button)
  const toyId = button.dataset.toyId

  const likesSpan = document.getElementById(`toy-${ toyId }-likes`)
  const likes = parseInt(likesSpan.innerText)
  const newNumberOfLikes = likes + 1
  // console.log(likes)

  // console.log(button.dataset.toyId)

  // fetch a PATCH to the toy
  fetch(`http://localhost:3000/toys/${ toyId }`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: newNumberOfLikes
    })
  }).then(function(response){
    return response.json()
  }).then(function(data){
    // console.log(data)
    likesSpan.innerText = data.likes //pessimistic
  })

  // likesSpan.innerText = newNumberOfLikes //optimisti



  // update the number of likes on the DOM

}

// OR HERE!
