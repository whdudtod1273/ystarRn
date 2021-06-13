/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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

const UserProfile = () => {
  const [isVisibleState, setIsVisible] = useState(false);
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
            profilePhoto={setProfilePhoto}
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
