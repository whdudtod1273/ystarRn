import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

function Write({route}) {
  const navigation = useNavigation();
  const filterProps = route?.params?.filterProps;
  const [text, setText] = useState();
  const HeaderRight = () => {
    const navigation = useNavigation();
    return (
      <Pressable
        onPress={() => {
          photoUpload();
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#83C8F0',
            paddingRight: 20,
          }}>
          작성
        </Text>
      </Pressable>
    );
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: ({}) => <HeaderRight />,
    });
  }, []);
  useEffect(() => {}, []);
  const photoUpload = async () => {
    const formData = new FormData();
    formData.append('url', {
      uri: filterProps,
      type: 'image/jpg',
      name: 'da',
    });
    formData.append('filter', '테스트2');

    await $http
      .post('/api/photo/', formData, {
        headers: {'content-type': 'multipart/form-data'},
      })
      .then((res) => {
        $http
          .post('/api/board/write', {
            description: text,
            tag: '임시',
            writer: 1,
            photo: res.data.id,
          })
          .then((res) => {
            console.log('write', res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('========================================', text);
    // await $http
    //   .post('/api/board/write', {
    //     description: textInput,
    //     tag: '임시',
    //     writer: 1,
    //     photo: 12,
    //   })
    //   .then((res) => {
    //     console.log('write', res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 20,
            borderBottomColor: '#dedede',
            borderBottomWidth: 1,
          }}>
          <Image
            source={{uri: filterProps}}
            style={{width: 100, height: 100}}
            resizeMode={'cover'}
          />
          <View style={{padding: 10}}>
            <TextInput
              multiline={true}
              style={[styles.textInput]}
              placeholder="문구입력..."
              valu={text}
              onChange={(val) => {
                setText(val);
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    flex: 1,
    textAlignVertical: 'top',
  },
});
export default Write;
