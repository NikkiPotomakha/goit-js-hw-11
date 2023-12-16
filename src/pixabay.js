import axios from 'axios';

export async function fetchHits(query = '', page = '') {
  const URL = 'https://pixabay.com/api/?';
  const params = new URLSearchParams({
    key: '41202396-a47a029e48d66a37c965c69f5',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });
  return await axios.get(`${URL}&${params}`).then(response => {
    return response.data;
  });
}
