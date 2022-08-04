import axios from 'axios';

const api = axios.create({ baseURL: 'https://to-do-api-ts.herokuapp.com' });

export default api;
