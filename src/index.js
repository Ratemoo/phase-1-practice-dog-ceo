// console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', ()=>{
const dogImageContainer = document.getElementById('dog-image-container');
const dogBreedsList = document.getElementById('dog-breeds');
const breedDropdown = document.getElementById('breed-dropdown');

const dogImageUrl = 'https://dog.ceo/api/breeds/image/random/4';
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

function renderDogImages(images) {
  images.message.forEach(imageUrl => {
    const imageEl = document.createElement('img');
    imageEl.src = imageUrl;
    imageEl.classList.add('dog-image');
    dogImageContainer.appendChild(imageEl);
  });
}

function renderDogBreeds(breeds) {
  const breedObjects = breeds.message;
  Object.keys(breedObjects).forEach(breedName => {
    const breedListItem = document.createElement('li');
    breedListItem.textContent = breedName;
    breedListItem.classList.add('breed-item');
    dogBreedsList.appendChild(breedListItem);
  });
}

function handleBreedSelection(event) {
  const selectedLetter = event.target.value;
  const breedItems = document.querySelectorAll('.breed-item');

  breedItems.forEach(item => {
    const breedName = item.textContent;
    if (breedName.startsWith(selectedLetter) || !selectedLetter) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

fetch(dogImageUrl)
  .then(response => response.json())
  .then(data => renderDogImages(data))
  .catch(error => console.error('Error fetching dog images:', error));

fetch(breedUrl)
  .then(response => response.json())
  .then(data => renderDogBreeds(data))
  .catch(error => console.error('Error fetching dog breeds:', error));

breedDropdown.addEventListener('change', handleBreedSelection);
})
