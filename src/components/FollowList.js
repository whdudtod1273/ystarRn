import React from 'react';
import {View, StyleSheet} from 'react-native';
import FollowItem from './FollowItem';

const FollowList = ({followers, followings}) => {
  return (
    <View style={[styles.container]}>
      {followers &&
        followers.map((follower, index) => {
          return <FollowItem followData={follower} key={`follower-${index}`} />;
        })}
      {followings &&
        followings.map((following, index) => {
          return (
            <FollowItem followData={following} key={`following-${index}`} />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 15, paddingVertical: 10},
  name: {fontSize: 15, color: '#000', fontWeight: 'bold'},
});

export default FollowList;
