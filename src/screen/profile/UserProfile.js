/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import PhotoSvg from '../../assets/svg/photo.svg';
import Bell from '../../assets/svg/bell.svg';
import More from '../../assets/svg/more.svg';
import Back from '../../assets/svg/backIcon.svg';
import MenuSvg from '../../assets/svg/menu.svg';
import {logout} from '../../reducers/auth';
import FeedList from '../../components/FeedGridList';
import {$http} from '../../api/fetcher';
import FollowBox from '../../components/FollowBox';

const UserProfile = ({route}) => {
  const userId = route.params?.userId;
  const store = useSelector((state) => state, shallowEqual);
  const navigation = useNavigation();
  const [isVisibleState, setIsVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [profileData, setProfileData] = useState();
  const [myBoardList, setMyBoardList] = useState();
  const [followCheck, setFollowCheck] = useState();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const getUserData = useCallback(() => {
    $http
      .get(`/api/account/mypage/${userId}`)
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
        setProfileData(res.data);
        setMyBoardList(res.data.BoardList);
        const url = res.data.Profile.url.split('/');
        setProfilePhoto(`/api/image/${url[url.length - 1]}`);
      })
      .catch((error) => {
        console.log('account/mypage/:id', error);
      });
  }, [store.auth.id, userId]);

  const followPress = () => {
    followCheck
      ? $http
          .delete(`/api/account/follow/${userId}`, {
            data: {
              from: store?.auth?.id,
              to: userId,
            },
          })
          .then((res) => {
            setFollowCheck(false);
            getUserData();
          })
          .catch((error) => {
            console.log(error);
          })
      : $http
          .post(`/api/account/follow/${userId}`, {
            from: store?.auth?.id,
            to: userId,
          })
          .then((res) => {
            setFollowCheck(true);
            getUserData();
          })
          .catch((error) => {
            console.log(error);
          });
  };

  return (
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
            <Pressable onPress={() => {}}>
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
          <Pressable
            onPress={() => {
              navigation.pop();
            }}
            style={{justifyContent: 'center'}}>
            <Back width={25} height={25} />
          </Pressable>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {profileData?.username}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable style={{alignItems: 'center'}}>
              <Bell width={25} height={25} />
            </Pressable>
            <Pressable
              style={{alignItems: 'center', marginLeft: 20}}
              onPress={() => {
                setIsVisible((prev) => !prev);
              }}>
              <More width={15} height={15} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.conBox1]}>
          <FollowBox
            type="user"
            profileData={profileData}
            profilePhotoBasic={profilePhoto}
          />
          {followCheck === true || followCheck === false ? (
            <Pressable
              onPress={() => {
                followPress();
              }}
              style={[
                styles.profileEdit,
                followCheck
                  ? {backgroundColor: '#fff'}
                  : {backgroundColor: '#3c95ef'},
              ]}>
              <Text
                style={
                  ({fontSize: 17},
                  followCheck ? {color: '#000'} : {color: '#fff'})
                }>
                팔로우
              </Text>
            </Pressable>
          ) : null}
        </View>

        <View style={[styles.conBox2]}>
          <ScrollView style={{flex: 1}}>
            {myBoardList && <FeedList list={myBoardList} />}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
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
export default UserProfile;
