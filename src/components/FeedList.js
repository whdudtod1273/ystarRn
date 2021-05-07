import React from 'react';
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
const FeedList = ({list}) => {
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
export default FeedList;
