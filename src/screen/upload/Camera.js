/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';

import {
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';

function Camera() {
  const navigation = useNavigation();
  const screenW = Dimensions.get('screen').width;
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [photo, setPhots] = useState();
  const cameraRef = useRef();

  useEffect(() => {
    getPhotos();
  }, []);

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'main'}],
  });

  const getPhotos = async () => {
    try {
      const {edges} = await CameraRoll.getPhotos({
        first: 1,
      });
      setPhots(edges?.[0]?.node.image.uri);
    } catch (error) {
      console.log('getPhoto', error);
    }
  };

  const change = () => {
    if (cameraType === RNCamera.Constants.Type.back) {
      setCameraType(RNCamera.Constants.Type.front);
    } else {
      setCameraType(RNCamera.Constants.Type.back);
    }
  };

  const save = async () => {
    const options = {quality: 0.5, base64: true, width: 1500};
    const data = await cameraRef.current.takePictureAsync(options);
    console.log(data);
    navigation.navigate('filter', {
      picture: data.uri,
    });
  };
  const styles = {
    style1: {
      fontWeight: '900',
    },
    style2: {
      fontWeight: '100',
    },
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          position: 'relative',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          overflow: 'hidden',
        }}>
        <View
          style={[
            styles.photoBox1,
            {
              width: '100%',
              height: '100%',
              position: 'relative',
            },
          ]}>
          <RNCamera
            ref={cameraRef}
            style={{width: screenW, height: '100%'}}
            type={cameraType}
            captureAudio={false}
          />
        </View>
        <View style={[styles.photoBoxTop]}>
          <Pressable
            onPress={() => {
              navigation.dispatch(resetAction);
            }}>
            <Text style={{fontSize: 20, color: '#fff'}}>
              {/* <Icon name="close" size={35} color="#ffffff" style1 /> */}
              카메라
            </Text>
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
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          height: 50,
          backgroundColor: '#000',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('photo');
          }}
          style={{
            width: 30,
            height: 30,
            borderColor: '#fff',
            borderWidth: 3,
            borderRadius: 7,
          }}>
          <Image
            source={{
              uri: photo,
            }}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </Pressable>
        <Pressable
          onPress={() => {
            change();
          }}>
          <Text style={{fontSize: 20, color: '#fff'}}>전환</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
export default Camera;
