/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
const height = Dimensions.get('window').width / 3;
const FeedGridList = ({list}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
      {list?.map((item, index) => {
        const url = item.Photo.url.split('/');

        return (
          <Pressable
            key={index}
            style={{
              maxWidth: '33.3333%',
              flexBasis: '33.3%',
              height,
              borderWidth: 1,
              borderColor: '#fff',
              flex: 1,
            }}
            onPress={() => {
              navigation.navigate('post', {
                writeId: item.id,
                photoUrl: item.Photo.url,
              });
            }}>
            <Image
              source={{
                uri: `http://localhost:3000/api/image/${url[url.length - 1]}`,
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
          </Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({});
export default FeedGridList;
