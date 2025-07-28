import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
hideLoadMoreButton(); 

let query = '';
let page = 1;
let totalPages = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    if (data.hits.length === 0) {
      iziToast.warning({ message: 'No images found.' });
      return;
    }

    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / 15);

    if (page < totalPages) showLoadMoreButton();
    else iziToast.info({ message: "You've reached the end of search results." });
  } catch (error) {
    iziToast.error({ message: 'Error loading images.' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    if (page >= totalPages) {
      iziToast.info({ message: "You've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }

    const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({ message: 'Error loading more images.' });
  } finally {
    hideLoader();
  }
});

