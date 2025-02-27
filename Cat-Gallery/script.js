const apiKey = 'live_nmmGakxWqgAEYBN0KV8s9i9yB5L7eQvP6Vpj7fFy3p73xYEMOHvSlwtP6gLQlDGm';
const apiUrl = 'https://api.thecatapi.com/v1';
const gallery = document.getElementById('gallery');
const breedSelect = document.getElementById('breedSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let currentPage = 0;
const limit = 20; 

// Fetch breeds and populate the breed dropdown
async function fetchBreeds() {
    try {
        const response = await fetch(`${apiUrl}/breeds`, {
            headers: { 'x-api-key': apiKey }
        });
        const breeds = await response.json();
        populateBreedSelect(breeds);
    } catch (error) {
        console.error('Error fetching breeds:', error);
    }
}

// Populate the breed dropdown menu
function populateBreedSelect(breeds) {
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
    });
}

// Fetch cat images based on the selected breed and page
async function fetchCatImages(breedId = '', page = 0) {
    try {
        const url = new URL(`${apiUrl}/images/search`);
        url.searchParams.append('limit', limit);
        url.searchParams.append('page', page);
        if (breedId) {
            url.searchParams.append('breed_id', breedId);
        }
        const response = await fetch(url, {
            headers: { 'x-api-key': apiKey }
        });
        const images = await response.json();
        displayCatImages(images);
    } catch (error) {
        console.error('Error fetching cat images:', error);
    }
}

// Display cat images in the gallery
function displayCatImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = 'Cute cat';
        gallery.appendChild(imgElement);
    });
}

// Load more images when the "Load More" button is clicked
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    const selectedBreed = breedSelect.value;
    fetchCatImages(selectedBreed, currentPage);
});

// Fetch images based on the selected breed
breedSelect.addEventListener('change', () => {
    currentPage = 0;
    gallery.innerHTML = ''; // Clear existing images
    const selectedBreed = breedSelect.value;
    fetchCatImages(selectedBreed, currentPage);
});


fetchBreeds();
fetchCatImages();
