/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import FollowList from '../../../components/FollowList';

function Follower({route}) {
  const follower = route.params?.follower;
  const followType = route.params?.followType;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FollowList followers={follower} followType={followType} />
      </View>
    </SafeAreaView>
  );
}

export default Follower;
