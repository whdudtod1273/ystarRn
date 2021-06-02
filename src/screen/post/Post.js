import React, {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {View, Text, ScrollView} from 'react-native';
import {$http} from '../../api/fetcher';
import FeedItem from '../../components/FeedItem';
const Post = ({route}) => {
  const store = useSelector((state) => state, shallowEqual);
  const writeId = route.params.writeId;
  const [item, setItem] = useState();
  useEffect(() => {
    $http.get(`/api/board/write/${writeId}`).then((res) => {
      res.data.likeState = false;
      res.data.like.find((val) => {
        if (val.user_id === store.auth.id) {
          res.data.likeState = true;
        }
      });
      setItem(res.data);
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>{item && <FeedItem item={item} />}</ScrollView>
    </View>
  );
};

export default Post;
