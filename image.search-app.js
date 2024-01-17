const accessKey = "W0TUfXY4lyym53jwK2LEY2_POKRyj9e3hZ6yF2OHjRM";

const formElement = document.querySelector('form');

const searchInputElement = document.querySelector('.search-bar');

const searchResultsElement = document.querySelector('.search-results');

const showMoreButtonElement = document.getElementById('show-more');

const descriptionElement = document.querySelector('description');

let inputData = '';
let page = 1;

async function searchImages(){
  inputData = searchInputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (page === 1) {
    searchResultsElement.innerHTML = '';
  }

  const results = data.results;
  
  results.map((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search-result');
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageWrapperDescription = document.createElement('div');
    imageWrapperDescription.classList.add('description');
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;
    

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageWrapperDescription)
    imageWrapperDescription.appendChild(imageLink);

    searchResultsElement.appendChild(imageWrapper);

    console.log(result)

  })

  page++;
  if (page > 1) {
    showMoreButtonElement.style.display = 'block';
    
  }

  console.log(page)
};

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
})

showMoreButtonElement.addEventListener('click', () => {
  searchImages()
})