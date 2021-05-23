import {useState} from 'react';
const useImgUrl = (value) => {
  let arr = value.split('/');
  let url = `/api/image/${arr[arr.length - 1]}`;
  return url;
};

export default useImgUrl;
