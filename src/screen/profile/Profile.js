import React, {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import PhotoSvg from '../../assets/svg/photo.svg';
import MenuSvg from '../../assets/svg/menu.svg';
import {logout} from '../../reducers/auth';
import FeedList from '../../components/FeedGridList';
import {$http, $baseUrl} from '../../api/fetcher';

function Profile() {
  const store = useSelector((state) => state, shallowEqual);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState();
  const [myBoardList, setMyBoardList] = useState();
  const [photo, setPhoto] = useState();
  const [profilePhoto, setProfilePhoto] = useState('');
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isVisibleState, setIsVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (profileData === undefined) {
        $http
          .get(`/api/account/mypage/${store.auth?.id}`)
          .then((res) => {
            setProfileData(res.data);
            setMyBoardList(res.data.BoardList);
            const url = res.data.Profile.url.split('/');
            setProfilePhoto(`/api/image/${url[url.length - 1]}`);
          })
          .catch((error) => {
            console.log('account/mypage/:id', error);
          });

        $http
          .get(`/api/account/follow/${store.auth?.id}`)
          .then((res) => {
            setFollower(res.data.Follower);
            setFollower(res.data.Following);
          })
          .catch((error) => {
            console.log('account/follow:id', error);
          });
      }
      return () => {};
    }, [profileData, store.auth?.id]),
  );

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

      const response2 = await $http.put(`/api/account/mypage`, {
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
        setPhoto(res.uri);
        profileAdd(res.uri);
      });
    } catch (error) {
      console.log('getPhoto', error);
    }
  };

  const logOut = () => {
    dispatch(logout());
    Alert.alert('로그아웃이 완료되었습니다.', '');
  };
  const getFollowing = () => {};
  const getFollower = () => {};

  return profileData ? (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, width: '100%', height: '100%'}}>
        {/******************************* modal ********************************/}
        <Modal
          isVisible={isVisibleState}
          // onBackdropPress={() => {
          //   setIsVisible(false);
          // }}
          style={{justifyContent: 'flex-end'}}
          swipeDirection={['down']}
          onSwipeComplete={() => {
            setIsVisible(false);
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              height: 500,
            }}>
            <Pressable
              onPress={() => {
                logOut();
              }}>
              <Text>로그아웃</Text>
            </Pressable>
          </View>
        </Modal>
        {/******************************* modal ********************************/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            height: 50,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {store?.auth?.username}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable style={{alignItems: 'center'}}>
              <PhotoSvg width={25} height={25} />
            </Pressable>
            <Pressable
              style={{alignItems: 'center', marginLeft: 20}}
              onPress={() => {
                setIsVisible((prev) => !prev);
              }}>
              <MenuSvg width={25} height={25} />
            </Pressable>
          </View>
        </View>
        <View style={[styles.conBox1]}>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={[styles.profileBox]}
              onPress={() => {
                getProfile();
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
                <Text style={[styles.text1]}>
                  {profileData.BoardList.length}
                </Text>
                <Text style={[styles.text2, {marginTop: 3}]}>게시물</Text>
              </Pressable>
              <Pressable
                style={[styles.btn1]}
                onPress={() => {
                  navigation.navigate('follow');
                }}>
                <Text style={[styles.text1]}>{profileData.follower}</Text>
                <Text style={[styles.text2, {marginTop: 3}]}>팔로워</Text>
              </Pressable>
              <Pressable style={[styles.btn1]}>
                <Text style={[styles.text1]}>{profileData.following}</Text>
                <Text style={[styles.text2, {marginTop: 3}]}>팔로잉</Text>
              </Pressable>
            </View>
          </View>
          <Pressable style={[styles.profileEdit]}>
            <Text style={{fontSize: 17}}>프로필 편집</Text>
          </Pressable>
        </View>
        <View style={[styles.conBox2]}>
          <ScrollView style={{flex: 1}}>
            {myBoardList && <FeedList list={myBoardList} />}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  ) : null;
}
const styles = StyleSheet.create({
  profileBox: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: '#dedede',
    // backgroundColor: '#fff',
    borderRadius: 70,
  },
  conBox1: {
    padding: 20,
    paddingBottom: 30,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  profileEdit: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 5,
    paddingVertical: 7,
    marginTop: 20,
  },
  conBox2: {
    flex: 1,
  },
  text1: {fontSize: 17},
  text2: {fontSize: 17},
  btn1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Profile;
