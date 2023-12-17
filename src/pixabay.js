import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getData(searchQuery, currentPage) {
  try {
    const response = await axios.get('', {
      params: {
        key: '41202396-a47a029e48d66a37c965c69f5',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: '40',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
