// index.js

//! Global Variables
const url = 'http://localhost:3000/ramens'
const ramenName = document.querySelector('.name')
const restaurant = document.querySelector('.restaurant')
const ramenImage = document.querySelector('.detail-image')
const ratingDisplay = document.querySelector('#rating-display')
const commentDisplay = document.querySelector('#comment-display')
const ramenForm = document.querySelector('#new-ramen')
const ramenMenu = document.querySelector('#ramen-menu')

// Callbacks

//! Function handleClick takes the ramen information and displays it in the middle
const handleClick = (ramen) => {
  // Add code
  ramenName.innerText = ramen.name
  ramenImage.src = ramen.image
  ramenImage.alt = ramen.name
  restaurant.innerText = ramen.restaurant
  ratingDisplay.innerText = ramen.rating
  commentDisplay.innerText = ramen.comment
};

//! function handleSubmit takes all the information from the form and displays it on the top menu
const handleSubmit = (e) => {
  e.preventDefault()
  const FormRamenName = e.target.name.value
  const FormRestaurant = e.target.restaurant.value
  const FormImage = e.target.image.value
  const FormRating = e.target.rating.value
  const FormComment = document.querySelector('#new-comment').value

  //! Makes new ramen from the form as an object
  const newRamen = {
    name: FormRamenName,
    restaurant: FormRestaurant,
    image: FormImage,
    rating: FormRating,
    comment: FormComment
  }
  ramenForm.reset()
  //! take the new ramen object and run displayRamen function with the new ramen
  displayRamen(newRamen)
  //! POST the new information on the database so it remains after refresh
  fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body:JSON.stringify(newRamen)
  })
  .catch(error => alert(error))
}

//! Function that invokes the handleSubmit function after listening to event of 'submit'
const addSubmitListener = () => {
  // Add code
  ramenForm.addEventListener('submit', handleSubmit) 
}

// const handleDelete = (e) =>{
//   ramenDelete.target.parentNode.remove()

// }

//! function displayRamen takes the ramen object and displays them in the ramen menu as an image that is clickable
const displayRamen = (ramenObj) => {
  const ramenImg = document.createElement('img');
  const ramenDelete = document.createElement('button')
  ramenDelete.innerText = ' x '
  ramenImg.src = ramenObj.image;
  ramenImg.alt = ramenObj.name;
  ramenImg.addEventListener('click', () => handleClick(ramenObj));
  // ramenDelete.addEventListener('click', () => handleDelete(ramenObj))
  ramenMenu.append(ramenImg, ramenDelete)
}

//! Function displayRamens fetches the ramen data in the db.json and for each of ramen in the data, invoke displayRamen function
const displayRamens = () => {
  // Add code
  return fetch(url)
  .then(resp => resp.json())
  .then((ramensData) => {
    //! Invoke handleClick function with the first object in ramensData as the page loads
    handleClick(ramensData[0])
    ramensData.forEach(ramenData => displayRamen(ramenData))
    })
  .catch(err => console.log(err))
}

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens()
  addSubmitListener()

}

main()

// Export functions for testing
export {
  displayRamen,
  displayRamens,
  addSubmitListener,
  handleClick,
  handleSubmit,
  main,
};
