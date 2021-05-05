import React, {useEffect, useState, useRef} from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import {useNavigation} from '@react-navigation/native';
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
  Button,
  Keyboard,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const HeaderRight = ({firstPhoto}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('filter', {
          picture: firstPhoto,
        });
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#4192ee',
          paddingRight: 20,
        }}>
        다음
      </Text>
    </Pressable>
  );
};

function Photo() {
  const navigation = useNavigation();
  const [photo, setPhots] = useState();
  const [firstPhoto, setFirstPhoto] = useState();
  const [buttonW, setButtonW] = useState(0);
  const screenH = Dimensions.get('screen').height / 2 - 60;

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({}) => <HeaderRight firstPhoto={firstPhoto} />,
    });
  }, [firstPhoto]);

  useEffect(() => {
    getPhotos();
  }, []);

  const buttonWidth = (event) => {
    const {width} = event.nativeEvent.layout;
    setButtonW(width);
  };

  const getPhotos = async () => {
    try {
      const {edges} = await CameraRoll.getPhotos({
        first: 100,
      });
      setPhots(edges);
      setFirstPhoto(edges[0].node.image.uri);
      console.log(edges);
    } catch (error) {
      console.log('getPhoto', error);
    }
  };

  const getAlbums = async () => {
    try {
      const options = {
        mediaType: 'photo',
      };

      launchImageLibrary(options, (response) => {
        setFirstPhoto(response.uri);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#101010'}}>
      {photo ? (
        <>
          <View style={[styles.itemBox1, {height: screenH}]}>
            <Image
              source={{
                uri: firstPhoto,
              }}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.itemBox2]}>
            <Pressable
              onPress={() => {
                getAlbums();
              }}>
              <Text style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
                최근 항목
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('camera');
              }}>
              <Text style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
                카메라
              </Text>
            </Pressable>
          </View>
          {/* {photo ? ( */}
          <View style={[styles.itemBox3]}>
            <ScrollView
              style={{
                width: '100%',
                height: '100%',
                flex: 1,
                backgroundColor: '#101010',
              }}>
              <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                {photo.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setFirstPhoto(item.node.image.uri);
                    }}
                    style={
                      (index + 1) % 3 === 0
                        ? {
                            width: '33.333%',
                            height: buttonW,
                            borderBottomColor: '#101010',
                            borderBottomWidth: 2,
                            borderRightWidth: 0,
                            borderRightColor: '#101010',
                          }
                        : {
                            width: '33.333%',
                            height: buttonW,
                            borderBottomColor: '#101010',
                            borderBottomWidth: 2,
                            borderRightColor: '#101010',
                            borderRightWidth: 2,
                          }
                    }
                    onLayout={buttonWidth}
                    key={index}>
                    <Image
                      source={{
                        uri: item.node.image.uri,
                      }}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  itemBox1: {
    width: '100%',
    height: 400,
    backgroundColor: '#101010',
  },
  itemBox2: {
    width: '100%',
    height: 50,
    backgroundColor: '#101010',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  itemBox3: {
    flex: 1,
    backgroundColor: '#101010',
  },
  photoBox: {},
});
export default Photo;
