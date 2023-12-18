import Notiflix from 'notiflix';

const success = params => {
  return Notiflix.Notify.success(` Hooray! We found ${params} images. `);
};

const warning = () => {
  return Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
};

const info = () => {
  return Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
};

const error = error => {
  return Notiflix.Notify.failure(error);
};

const loading = () => {
  return Notiflix.Loading.arrows('Loading...');
};

const removeLoading = () => {
  return Notiflix.Loading.remove();
};

export { success, warning, info, error, loading, removeLoading };
