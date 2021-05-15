/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {$http, $baseUrl} from '../api/fetcher';
import More from '../assets/svg/more.svg';
import Heart from '../assets/svg/heart.svg';
import HeartFull from '../assets/svg/heartFull.svg';
import Message from '../assets/svg/message.svg';
import PaperPlane from '../assets/svg/paperPlane.svg';

const FeedItem = ({item}) => {
  const height = Dimensions.get('window').width;
  const [profilePhoto, setProfilePhoto] = useState();
  const [boardPhoto, setBoardPhoto] = useState();
  const [likeState, setLikeState] = useState(item.likeState);
  const store = useSelector((state) => state, shallowEqual);
  useEffect(() => {
    $http
      .get(`/api/account/mypage/${item.id}`)
      .then((res) => {
        const url = res.data.Profile.url.split('/');

        setProfilePhoto(`/api/image/${url[url.length - 1]}`);
      })
      .catch((error) => {
        console.log('account/mypage/:id', error);
      });
    const boardUrl = item.Photo.url.split('/');
    setBoardPhoto(`/api/image/${boardUrl[boardUrl.length - 1]}`);
  }, [item, profilePhoto]);

  const likePress = async () => {
    try {
      const method = likeState ? 'delete' : 'post';
      const response = await $http({
        method,
        url: '/api/board/like',
        data: {
          user_id: store.auth.id,
          board_id: item.id,
        },
      });

      if (response.status === 200) {
        setLikeState((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={[styles.feedHead]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: $baseUrl + profilePhoto}}
            style={[styles.profileImg]}
            resizeMode="cover"
          />
          <Text>{item.User.username}</Text>
        </View>
        <More width={15} height={15} />
      </View>
      <Image
        source={{uri: $baseUrl + boardPhoto}}
        style={[{width: '100%', height: height}]}
        resizeMode="cover"
      />
      <View style={[styles.itemLine1]}>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={likePress}>
            {likeState ? (
              <HeartFull width={20} height={20} style={{marginRight: 10}} />
            ) : (
              <Heart width={20} height={20} style={{marginRight: 10}} />
            )}
          </Pressable>
          <Heart width={20} height={20} style={{marginRight: 10}} />
          <Message width={20} height={20} style={{marginRight: 10}} />
          <PaperPlane width={20} height={20} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
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
  itemLine1: {flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10},
});

export default FeedItem;
