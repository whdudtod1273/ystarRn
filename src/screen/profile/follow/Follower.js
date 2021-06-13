import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

function Follower({route}) {
  const userId = route.params?.userId;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text>팔로워</Text>
      </View>
    </SafeAreaView>
  );
}

export default Follower;
