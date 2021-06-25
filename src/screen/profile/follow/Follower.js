import React from 'react';
import {SafeAreaView, View} from 'react-native';
import FollowList from '../../../components/FollowList';

function Follower({route}) {
  const userId = route.params?.userId;
  const follower = route.params?.follower;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FollowList followers={follower} />
      </View>
    </SafeAreaView>
  );
}

export default Follower;
