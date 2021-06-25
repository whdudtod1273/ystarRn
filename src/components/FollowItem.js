import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {$baseUrl, $http} from '../api/fetcher';

const FollowItem = ({follower}) => {
  const store = useSelector((state) => state, shallowEqual);
  const [profileImg, setProfileImg] = useState('');
  const [followCheck, setFollowCheck] = useState();
  useEffect(() => {
    $http
      .get(`/api/account/mypage/${follower.id}`)
      .then((res) => {
        if (res.data.checkFollower.length !== 0) {
          res.data.checkFollower.filter((item) => {
            if (item.id === store.auth.id) {
              setFollowCheck(true);
              console.log('a');
            } else {
              console.log('b');
              setFollowCheck(false);
            }
          });
        } else {
          setFollowCheck(false);
        }
        const url = res.data.Profile.url.split('/');
        setProfileImg(`/api/image/${url[url.length - 1]}`);
      })
      .catch((error) => {
        console.log('account/mypage/:id', error);
      });
  }, [follower.id, store.auth.id]);

  const FollowBtn = () => {
    followCheck
      ? $http
          .delete(`/api/account/follow/${follower.id}`, {
            data: {
              from: store?.auth?.id,
              to: follower.id,
            },
          })
          .then((res) => {
            setFollowCheck(false);
          })
          .catch((error) => {
            console.log(error);
          })
      : $http
          .post(`/api/account/follow/${follower.id}`, {
            from: store?.auth?.id,
            to: follower.id,
          })
          .then((res) => {
            setFollowCheck(true);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  return (
    <Pressable style={[styles.container]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: $baseUrl + profileImg}}
          style={[styles.profileImg]}
          resizeMode="cover"
        />
        <Text style={[styles.name]}>{follower?.username}</Text>
      </View>

      {followCheck === true || followCheck === false ? (
        <Pressable
          onPress={FollowBtn}
          style={[
            styles.button,
            followCheck
              ? {backgroundColor: '#fff', borderWidth: 1, borderColor: '#333'}
              : {backgroundColor: '#3c95ef'},
          ]}>
          <Text style={[styles.followText, followCheck && {color: '#333'}]}>
            {followCheck ? '팔로잉' : '팔로우'}
          </Text>
        </Pressable>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {fontSize: 15, color: '#000', fontWeight: 'bold'},
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dedede',
    marginRight: 10,
  },
  followText: {fontSize: 15, color: '#fff'},
  button: {
    borderRadius: 5,
    backgroundColor: '#3c95ef',
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FollowItem;
