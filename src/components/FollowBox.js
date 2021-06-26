/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {$baseUrl, $http} from '../api/fetcher';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
const FollowBox = ({type, profileData, profilePhotoBasic}) => {
  const store = useSelector((state) => state, shallowEqual);
  const navigation = useNavigation();
  const [profilePhoto, setProfilePhoto] = useState();
  const [following, setFollowing] = useState(profileData?.following);
  const [follower, setFollower] = useState(profileData?.follower);
  useEffect(() => {
    setProfilePhoto(profilePhotoBasic);
  }, [profilePhotoBasic]);

  useEffect(() => {
    setFollowing(profileData?.following);
    setFollower(profileData?.follower);
  }, [profileData]);

  const getProfile = async () => {
    try {
      const options = {
        noData: true,
        storageOptions: {
          skipBackup: true,
          privateDirectory: true,
        },
      };
      launchImageLibrary(options, (res) => {
        profileAdd(res.uri);
      });
    } catch (error) {
      console.log('getPhoto', error);
    }
  };

  const profileAdd = async (ee) => {
    try {
      const formData = new FormData();
      formData.append('url', {
        uri: ee,
        type: 'image/jpg',
        name: 'da',
      });

      const response = await $http.post('/api/photo', formData, {
        headers: {'content-type': 'multipart/form-data'},
      });

      const response2 = await $http.put('/api/account/mypage', {
        userId: store.auth?.id,
        intro: 'a',
        photo: response.data.id,
      });

      if (response2.status === 200) {
        const url = await response.data.url.split('/');
        setProfilePhoto(`/api/image/${url[url.length - 1]}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Pressable
        style={[styles.profileBox]}
        onPress={() => {
          if (type === 'mypage') {
            getProfile();
          }
        }}>
        <Image
          source={{
            uri: $baseUrl + profilePhoto,
          }}
          style={{width: '100%', height: '100%', borderRadius: 70}}
          resizeMode="cover"
        />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flex: 1,
        }}>
        <Pressable style={[styles.btn1]}>
          <Text style={[styles.text1]}>{profileData?.BoardList.length}</Text>
          <Text style={[styles.text2, {marginTop: 3}]}>게시물</Text>
        </Pressable>
        <Pressable
          style={[styles.btn1]}
          onPress={() => {
            navigation.navigate('follow', {
              screen: '팔로워',
              params: {
                userId: profileData.id,
                followType: 'follower',
              },
            });
          }}>
          <Text style={[styles.text1]}>{follower}</Text>
          <Text style={[styles.text2, {marginTop: 3}]}>팔로워</Text>
        </Pressable>
        <Pressable
          style={[styles.btn1]}
          onPress={() => {
            navigation.navigate('follow', {
              screen: '팔로잉',
              params: {
                userId: profileData.id,
                followType: 'following',
              },
            });
          }}>
          <Text style={[styles.text1]}>{following}</Text>
          <Text style={[styles.text2, {marginTop: 3}]}>팔로잉</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileBox: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: '#dedede',
    borderRadius: 70,
  },
  text1: {fontSize: 17},
  text2: {fontSize: 17},
  btn1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default FollowBox;
