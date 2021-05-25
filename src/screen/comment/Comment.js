/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {$http, $baseUrl} from '../../api/fetcher';
import {$moment} from '../../api/moment';
import CommentItem from '../../components/CommentItem';
import useImgUrl from '../../hooks/useImgUrl';

const Comment = ({route}) => {
  const boardItem = route.params.item;
  const userId = route.params.userId;
  const store = useSelector((state) => state, shallowEqual);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [profileImg, setProfileImg] = useState();
  const [beforeTime, setBeforeTime] = useState();
  const [buttonState, buttonOpen] = useState(false);
  const inputRef = useRef();
  const profileUrl = useImgUrl(boardItem.Photo.url);
  useEffect(() => {
    boardItem;
  }, [boardItem]);
  useEffect(() => {
    $http.get(`/api/board/${userId}/comment`).then((res) => {
      setComments(res.data);
    });
    setProfileImg(profileUrl);
    const today = new Date();

    const nowYear = today.getFullYear();
    const nowMonth = today.getMonth() + 1;
    const nowDay = today.getDate();
    const nowHours = today.getHours();
    const nowMinutes = today.getMinutes();

    const boardYear = Number($moment(boardItem.createdAt).format('Y'));
    const boardMonth = Number($moment(boardItem.createdAt).format('M'));
    const boardDay = Number($moment(boardItem.createdAt).format('D'));
    const boardHours = Number($moment(boardItem.createdAt).format('h'));
    const boardMinutes = Number($moment(boardItem.createdAt).format('m'));

    if (boardYear !== nowYear) {
      const before = nowYear - boardYear;
      setBeforeTime(before + '년 전');
    } else if (boardMonth !== nowMonth) {
      const before = nowMonth - boardMonth;
      setBeforeTime(before + '달 전');
    } else if (boardDay !== nowDay) {
      const before = nowDay - boardDay;
      setBeforeTime(before + '일 전');
    } else if (boardHours !== nowHours) {
      const before = nowHours - boardHours;
      setBeforeTime(before + '시간 전');
    } else if (boardMinutes !== nowMinutes) {
      const before = nowMinutes - boardMinutes;
      setBeforeTime(before + '분 전');
    }
  }, [userId, boardItem, beforeTime, profileUrl]);

  const postComment = async () => {
    try {
      const response = await $http.post(`/api/board/${userId}/comment`, {
        content: comment,
        writer: store.auth.id,
      });
      if (response.status === 200) {
        console.log(response.status);
        $http.get(`/api/board/${userId}/comment`).then((res) => {
          setComments(res.data);
        });
        setComment('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      onPressOut={() => {
        buttonOpen(false);
      }}
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
        }}>
        <View style={[styles.boardRow]}>
          <View style={[styles.imgBox]}>
            <Image
              source={{uri: $baseUrl + profileImg}}
              style={[styles.profileImg, {marginRight: 10}]}
              resizeMode="cover"
            />
          </View>
          <View>
            <View style={[styles.textBox]}>
              <Text style={[styles.userName]}>{boardItem.User.username}</Text>
              <Text style={[styles.contentText]}>{boardItem.description}</Text>
            </View>
            <Text style={{marginTop: 5, color: '#999'}}>{beforeTime}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
          }}>
          <ScrollView>
            <View style={{}}>
              {comments?.map((item, index) => {
                return <CommentItem item={item} key={index} />;
              })}
            </View>
          </ScrollView>
        </View>
        <View style={[styles.inputBox]}>
          <View style={[styles.input]}>
            <TextInput
              value={comment}
              onChangeText={(text) => {
                setComment(text);
              }}
              placeholder="댓글달기"
              ref={inputRef}
              onFocus={() => {
                buttonOpen(true);
              }}
              onPressOut={() => {
                buttonOpen(false);
              }}
              style={{width: '100%', height: '100%', paddingHorizontal: 15}}
              onSubmitEditing={() => buttonOpen(false)}
            />
            <Pressable
              onPress={postComment}
              style={[
                styles.button,
                buttonState ? {display: 'flex'} : {display: 'none'},
              ]}>
              <Text style={{color: '#83C8F0'}}>게시</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  commentContainer: {paddingTop: 20},
  boardRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dedede',
  },
  textBox: {flexDirection: 'row'},
  userName: {marginRight: 5},
  contentText: {},
  inputBox: {
    borderTopColor: '#dedede',
    borderTopWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#dedede',
    borderWidth: 1,
    borderRadius: 50,
  },
  button: {
    height: '100%',
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
  },
});
export default Comment;
