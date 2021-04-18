import React, {useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RNCamera, FaceDetector} from 'react-native-camera';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Exchange from '../../assets/svg/exchange.svg';
function Camera() {
  const navigation = useNavigation();
  const screenW = Dimensions.get('screen').width;
  const screenH = Dimensions.get('screen').height;
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const cameraRef = useRef();
  const [picture, setPicture] = useState();

  const change = () => {
    if (cameraType == RNCamera.Constants.Type.back) {
      setCameraType(RNCamera.Constants.Type.front);
    } else {
      setCameraType(RNCamera.Constants.Type.back);
    }
  };
  const save = async () => {
    // console.log(cameraRef.current.takePictureAsync());
    const options = {quality: 0.5, base64: true};
    const data = await cameraRef.current.takePictureAsync(options);
    navigation.navigate('filter', {
      picture: data.uri,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, width: '100%', height: '100%'}}>
        <View
          style={[
            styles.photoBox1,
            {
              width: screenW,
              height: 300,
              backgroundColor: 'red',
              position: 'relative',
            },
          ]}>
          <RNCamera
            ref={cameraRef}
            style={{width: screenW, height: '100%'}}
            type={cameraType}
            captureAudio={false}
          />
          <Pressable
            style={{
              position: 'absolute',
              width: 35,
              height: 35,
              zIndex: 99,
              bottom: 15,
              left: 15,
            }}
            onPress={() => {
              change();
            }}>
            <Exchange width={35} height={35} />
          </Pressable>
        </View>
        <View style={[styles.photoBox2]}>
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              backgroundColor: '#999',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              save();
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#fff',
                borderRadius: 50,
              }}></View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  photoBox1: {},
  photoBox2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
export default Camera;
