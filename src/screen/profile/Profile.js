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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Profile() {
  const [profileData, setProfileData] = useState();
  const [photo, setPhoto] = useState();
  useEffect(() => {
    $http.get('/api/account/mypage/1').then((res) => {
      setProfileData(res);
    });
  }, [photo]);
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
              console.log('수정 완료');
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, width: '100%', height: '100%'}}>
        <Pressable
          onPress={() => {
            getProfile();
          }}>
          <View style={[styles.profileBox]}>
            {/* <Image
            source={{uri:}}
            /> */}
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  profileBox: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#dedede',
    backgroundColor: '#fff',
    borderRadius: 70,
  },
});
export default Profile;
