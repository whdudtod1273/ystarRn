import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {$http, $baseUrl} from '../../api/fetcher';
const Comment = ({route}) => {
  const boardItem = route.params.item;
  const userId = route.params.userId;
  const store = useSelector((state) => state, shallowEqual);
  const [comment, setComment] = useState('');

  useEffect(() => {
    $http.get(`/api/board/${userId}/comment`).then((res) => {
      console.log(res);
    });
    console.log(boardItem);
  }, [userId, boardItem]);

  const postComment = async () => {
    await $http.post(`/api/board/${userId}/comment`, {
      content: comment,
      writer: store.auth.id,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <ScrollVie></ScrollVie> */}
      <View style={[styles.boardRow]}>
        <View>
          <Image
            source={{uri: ''}}
            style={[styles.profileImg, {marginRight: 10}]}
            resizeMode="cover"
          />
        </View>
      </View>
      <View>
        <TextInput
          value={comment}
          onChangeText={(text) => {
            setComment(text);
          }}
          placeholder="댓글달기"
        />
        <Pressable onPress={postComment}>
          <Text>게시</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  commentContainer: {},
  boardRow: {},
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dedede',
  },
});
export default Comment;
