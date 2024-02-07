// index.js

const url = 'http://localhost:3000/ramens'
const ramenName = document.querySelector('.name')
const restaurant = document.querySelector('.restaurant')
const ramenImage = document.querySelector('.detail-image')
const ratingDisplay = document.querySelector('#rating-display')
const commentDisplay = document.querySelector('#comment-display')
const ramenForm = document.querySelector('#new-ramen')
const ramenMenu = document.querySelector('#ramen-menu')

// Callbacks

const handleClick = (ramen) => {
  // Add code
  ramenName.innerText = ramen.name
  ramenImage.src = ramen.image
  ramenImage.alt = ramen.name
  restaurant.innerText = ramen.restaurant
  ratingDisplay.innerText = ramen.rating
  commentDisplay.innerText = ramen.comment
};

const handleSubmit = (e) => {
  e.preventDefault()
  const FormRamenName = e.target.name.value
  const FormRestaurant = document.querySelector('#new-restaurant').value
  const FormImage = document.querySelector('#new-image').value
  const FormRating = document.querySelector('#new-rating').value
  const FormComment = document.querySelector('#new-comment').value

  const newRamen = {
    name: FormRamenName,
    restaurant: FormRestaurant,
    image: FormImage,
    rating: FormRating,
    comment: FormComment
  }
  ramenForm.reset()
  displayRamen(newRamen)
}

const addSubmitListener = () => {
  // Add code
  ramenForm.addEventListener('submit', handleSubmit) 
}

const displayRamen = (ramenObj) => {
  const ramenImg = document.createElement("img");
  ramenImg.src = ramenObj.image;
  ramenImg.alt = ramenObj.name;
  ramenImg.addEventListener('click', () => handleClick(ramenObj));
  ramenMenu.appendChild(ramenImg);
}

const displayRamens = () => {
  // Add code
  return fetch(url)
  .then(resp => resp.json())
  .then((ramensData) => {
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
