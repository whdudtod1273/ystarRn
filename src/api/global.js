import axios from 'axios';
global.$http = axios.create({
  baseURL: 'http://localhost:3000',
});
