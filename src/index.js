// Описаний в документації
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

import { cards } from './cards.js';

import {
  success,
  warning,
  error,
  loading,
  removeLoading,
  info,
} from './notifix.js';

import { fetchHits } from './pixabay.js';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
let page = 1;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const searchQuery = form.searchQuery.value.trim();

  if (searchQuery) {
    page = 1; // Reset page when a new search is initiated
    await performSearch(searchQuery);
  } else {
    notiflix.Notify.failure('Please enter a search query.');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  const searchQuery = form.searchQuery.value.trim();
  await performSearch(searchQuery);
});

async function performSearch(query) {
  try {
    const apiKey = '41202396-a47a029e48d66a37c965c69f5';
    const response = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    const data = await response.json();

    if (data.hits.length > 0) {
      if (page === 1) {
        gallery.innerHTML = ''; // Clear gallery for new searches
        notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }

      data.hits.forEach(image => {
        const card = createImageCard(image);
        gallery.appendChild(card);
      });

      if (page === 1) {
        loadMoreBtn.style.display = 'block';
      }

      page++;

      if (data.hits.length < 40) {
        loadMoreBtn.style.display = 'none';
        notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } else {
      notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.style.display = 'none';
    }

    // Initialize or refresh SimpleLightbox after adding new images
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();

    // Smoothly scroll to the newly added images
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    notiflix.Notify.failure('An error occurred. Please try again later.');
  }
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.className = 'photo-card';

  const a = document.createElement('a');
  a.href = image.largeImageURL;
  a.setAttribute('data-lightbox', 'gallery');
  a.setAttribute('data-title', image.tags);

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const info = document.createElement('div');
  info.className = 'info';

  const likes = document.createElement('p');
  likes.className = 'info-item';
  likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

  const views = document.createElement('p');
  views.className = 'info-item';
  views.innerHTML = `<b>Views:</b> ${image.views}`;

  const comments = document.createElement('p');
  comments.className = 'info-item';
  comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

  const downloads = document.createElement('p');
  downloads.className = 'info-item';
  downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  a.appendChild(img);
  card.appendChild(a);
  card.appendChild(info);

  return card;
}
