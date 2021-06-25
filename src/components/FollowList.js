import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import FollowItem from './FollowItem';

const FollowList = ({followers}) => {
  return (
    <View style={[styles.container]}>
      {followers &&
        followers.map((follower, index) => {
          return <FollowItem follower={follower} key={`f-${index}`} />;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 15, paddingVertical: 10},
  name: {fontSize: 15, color: '#000', fontWeight: 'bold'},
});

export default FollowList;
