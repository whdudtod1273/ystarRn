import axios from 'axios';
global.$http = axios.create({
  // baseURL: 'http://192.168.0.221:3000',
  // baseURL: 'http://172.20.10.1:3000',
  // baseURL: 'http://localhost:3000',
  baseURL: 'http://10.0.2.2:3000',
});
