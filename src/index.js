import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import {
  success,
  warning,
  info,
  error,
  loading,
  removeLoading,
} from './notiflix';

import { createMarkup } from './cards';

import { getData } from './pixabay';

const gallery = document.querySelector('.gallery');
const load = document.querySelector('.load-more');
const form = document.querySelector('.search-form');

let page = 1;

let searchQuery = '';

let maxPages;

load.style.visibility = 'hidden';

form.addEventListener('submit', onSub);

load.addEventListener('click', onLoad);

async function onSub(event) {
  event.preventDefault();

  gallery.innerHTML = '';

  page = 1;

  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  loading();

  try {
    const { hits, totalHits } = await fetchHits(searchQuery, page);
    removeLoading();

    maxPages = Math.ceil(totalHits / 40);

    if (searchQuery === '' || totalHits === 0) {
      load.style.visibility = 'hidden';
      return warning();
    }

    load.style.visibility = 'visible';

    success(totalHits);

    gallery.insertAdjacentHTML('beforeend', createCard(hits));

    if (page >= maxPages) {
      load.style.visibility = 'hidden';
      info();
    }
  } catch (error) {
    error(error.message);
  }

  lightbox.refresh();
}

async function onLoad(event) {
  event.preventDefault();
  page += 1;
  loading();
  try {
    const { hits } = await fetchHits(searchQuery, page);
    removeLoading();
    if (page >= maxPages) {
      load.style.visibility = 'hidden';
      info();
    }
    gallery.insertAdjacentHTML('beforeend', createCard(hits));
  } catch (error) {
    error(error.message);
  }

  lightbox.refresh();
}
