import React from 'react';
import {SafeAreaView, View} from 'react-native';
import FollowList from '../../../components/FollowList';

function Following({route}) {
  const following = route.params?.following;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FollowList followings={following} />
      </View>
    </SafeAreaView>
  );
}

export default Following;
