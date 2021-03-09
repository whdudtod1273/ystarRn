import React, {useEffect, useState} from 'react';
// import CameraRoll from '@react-native-community/cameraroll';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Profile() {
  const [profileData, setProfileData] = useState();
  const [photo, setPhoto] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  useEffect(() => {
    $http.get('/api/account/mypage/1').then((res) => {
      setProfileData(res.data);
    });
  }, [photo]);

  useEffect(() => {
    $http.get(`/api/account/mypage/1`).then((res) => {
      console.log(res);
      setProfileData(res.data);
      const url = res.data.Profile.url.split('/');
      setProfilePhoto(`/api/image/${url[url.length - 1]}`);
    });
  }, []);
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
  const profileAdd = async (ee) => {
    const formData = new FormData();

    formData.append('url', {
      uri: ee,
      type: 'image/jpg',
      name: 'da',
    });
    await $http
      .post('/api/photo/', formData, {
        headers: {'content-type': 'multipart/form-data'},
      })
      .then((res) => {
        $http
          .put(`/api/account/mypage`, {
            userId: 1,
            intro: 'a',
            photo: res.data.id,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              const url = res.data.Profile.url.split('/');
              setProfilePhoto(`/api/image/${url[url.length - 1]}`);
              console.log('수정 완료');
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFollowing = () => {};
  const getFollower = () => {};

  return profileData ? (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, width: '100%', height: '100%'}}>
        <View style={[styles.conBox1]}>
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable>
              <Text>{profileData.BoardList.length}</Text>
              <Text>게시물</Text>
            </Pressable>
            <Pressable>
              <Text>{profileData.follower}</Text>
              <Text>팔로워</Text>
            </Pressable>
            <Pressable>
              <Text>{profileData.following}</Text>
              <Text>팔로잉</Text>
            </Pressable>
          </View>
        </View>
        <Pressable style={[styles.profileEdit]}>
          <Text style={{}}>프로필 편집</Text>
        </Pressable>
        <View style={[styles.conBox2]}>
          <ScrollView></ScrollView>
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
    flexDirection: 'row',
  },
  profileEdit: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conBox2: {},
});
export default Profile;
