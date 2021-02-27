import React, {useEffect, useState} from 'react';
import CameraRoll from '@react-native-community/cameraroll';
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
  ScrollView,
} from 'react-native';

function Picker() {
  const [Photos, setPhots] = useState();
  const screenW = Dimensions.get('screen').width;
  const [buttonH, setButtonH] = useState(0);
  const buttonWidth = (event) => {
    const {width} = event.nativeEvent.layout;
    setButtonH(width);
  };
  useEffect(() => {
    const getPhotos = async () => {
      try {
        const {edges} = await CameraRoll.getPhotos({
          first: 10,
        });
        console.log('📸', edges);
        setPhots(edges);
        console.log(edges);
      } catch (error) {
        console.log('getPhoto', error);
      }
    };
    console.log(Photos);
    getPhotos();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      {Photos ? (
        <View style={{flex: 1, width: '100%', height: '100%'}}>
          <View style={[styles.photoBox1, {width: screenW, height: screenW}]}>
            <Image
              source={{
                uri: Photos?.[0]?.node?.image?.uri,
              }}
              style={{width: screenW, height: screenW}}
              resizeMode="cover"
            />
          </View>
          <ScrollView style={{}}>
            <View style={[styles.photoBox2]}>
              {Photos.map((item, index) => (
                <Pressable
                  style={
                    (index + 1) % 3 === 0
                      ? {
                          width: '33.333%',
                          height: buttonH,
                          borderTopColor: '#fff',
                          borderTopWidth: 2,
                          borderRightWidth: 0,
                          borderRightColor: '#101010',
                        }
                      : {
                          width: '33.333%',
                          height: buttonH,
                          borderTopColor: '#fff',
                          borderTopWidth: 2,
                          borderRightColor: '#fff',
                          borderRightWidth: 2,
                        }
                  }
                  onLayout={buttonWidth}
                  key={index}>
                  <Image
                    source={{
                      uri: Photos[index].node.image.uri,
                    }}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  photoBox1: {},
  photoBox2: {flex: 1, flexDirection: 'row', flexWrap: 'wrap'},
});
export default Picker;
