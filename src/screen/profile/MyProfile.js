/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import PhotoSvg from '../../assets/svg/photo.svg';
import MenuSvg from '../../assets/svg/menu.svg';
import {logout} from '../../reducers/auth';
import FeedList from '../../components/FeedGridList';
import {$http} from '../../api/fetcher';
import FollowBox from '../../components/FollowBox';

function MyProfile() {
  const store = useSelector((state) => state, shallowEqual);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState();
  const [myBoardList, setMyBoardList] = useState();
  const [profilePhoto, setProfilePhoto] = useState('');
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isVisibleState, setIsVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      $http
        .get(`/api/account/mypage/${store.auth?.id}`)
        .then((res) => {
          console.log('mypage', res.data);
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

      return () => {};
    }, [store.auth?.id]),
  );

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
          <FollowBox
            type="mypage"
            profileData={profileData}
            profilePhotoBasic={profilePhoto}
          />
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
export default MyProfile;
