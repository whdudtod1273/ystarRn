/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Animated} from 'react-native';
import {$baseUrl, $http} from '../api/fetcher';
import {$moment} from '../api/moment';
const CommentItem = ({item}) => {
  const [beforeTime, setBeforeTime] = useState();
  const [profileImg, setProfileImg] = useState('');
  const [commentInX, setLocationIn] = useState(0);
  const [commentOutX, setLocationOut] = useState(0);
  const [deleteBtn, setDeleteBtn] = useState(0);
  useEffect(() => {
    $http
      .get(`/api/account/mypage/${item.id}`)
      .then((res) => {
        const url = res.data.Profile.url.split('/');
        setProfileImg(`/api/image/${url[url.length - 1]}`);
      })
      .catch((error) => {
        console.log('account/mypage/:id', error);
      });

    const today = new Date();
    const nowYear = today.getFullYear();
    const nowMonth = today.getMonth() + 1;
    const nowDay = today.getDate();
    const nowHours = today.getHours();
    const nowMinutes = today.getMinutes();

    const boardYear = Number($moment(item.createdAt).format('Y'));
    const boardMonth = Number($moment(item.createdAt).format('M'));
    const boardDay = Number($moment(item.createdAt).format('D'));
    const boardHours = Number($moment(item.createdAt).format('h'));
    const boardMinutes = Number($moment(item.createdAt).format('m'));

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
  }, [item]);

  const deleteBtnWidth = useRef(new Animated.Value(0)).current;
  const deleteBtnText = useRef(new Animated.Value(0)).current;
  const itemWidthUp = () => {
    Animated.timing(deleteBtnWidth, {
      toValue: 80,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(deleteBtnText, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const itemWidthDown = () => {
    Animated.timing(deleteBtnWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(deleteBtnText, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const commentLocation = () => {
    if (commentOutX < commentInX) {
      itemWidthUp();
    } else if (commentOutX > commentInX) {
      itemWidthDown();
    }
  };

  const commentDelete = () => {
    console.log('댓글삭제');
  };

  return (
    <Pressable
      style={[styles.itemBox]}
      onPressIn={(e) => {
        setLocationIn(e.nativeEvent.locationX);
      }}
      onPressOut={(e) => {
        setLocationOut(e.nativeEvent.locationX);
        commentLocation();
      }}>
      <View style={[styles.imgBox]}>
        <Image
          source={{uri: $baseUrl + profileImg}}
          style={[styles.profileImg, {marginRight: 10}]}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 1, paddingRight: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.userName]}>{item.User.username}</Text>
          <Text style={[styles.contentText]}>{item.content}</Text>
        </View>
        <Text style={{color: '#999'}}>{beforeTime}</Text>
      </View>
      <Pressable onPress={commentDelete}>
        <Animated.View
          style={{
            width: deleteBtnWidth,
            height: '100%',
            backgroundColor: '#f44336',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              opacity: deleteBtnText,
            }}>
            삭제
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  itemBox: {
    // paddingVertical: 15,
    // paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  imgBox: {
    paddingVertical: 15,
    paddingLeft: 15,
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dedede',
  },
  userName: {marginRight: 5, fontWeight: 'bold', marginBottom: 5},
});

export default CommentItem;
