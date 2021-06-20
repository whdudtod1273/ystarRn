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
import FollowList from '../../../components/FollowList';

function Follower({route}) {
  const userId = route.params?.userId;
  const follower = route.params?.follower;

  console.log(route);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <FollowList />
      </View>
    </SafeAreaView>
  );
}

export default Follower;
