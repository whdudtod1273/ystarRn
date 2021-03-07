import axios from 'axios';
global.$http = axios.create({
  // baseURL: 'http://192.168.0.221:3000',
  // baseURL: 'http://172.20.10.1:3000',
  // baseURL: 'http://172.20.10.2:3000',
  // baseURL: 'http://127.0.0.1:3306',
  baseURL: 'http://localhost:3000',
  // android
  // baseURL: 'http://10.0.2.2:3000',
  // 내아이폰
});
global.$baseUrl = 'http://localhost:3000';
// global.$baseUrl = 'http://172.20.10.2:3000';
