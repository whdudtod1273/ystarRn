/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {$http, $baseUrl} from '../api/fetcher';
import SvgBox from './SvgBox';
const FeedItem = ({item}) => {
  const height = Dimensions.get('window').width;
  console.log(item);
  const [profilePhoto, setProfilePhoto] = useState();
  const [boardPhoto, setBoardPhoto] = useState();
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
        <SvgBox type="More" width={15} height={15} />
      </View>
      <Image
        source={{uri: $baseUrl + boardPhoto}}
        style={[{width: '100%', height: height}]}
        resizeMode="cover"
      />
      <View style={[styles.itemLine1]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  itemLine1: {},
});

export default FeedItem;
