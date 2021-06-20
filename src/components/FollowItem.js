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

const FollowItem = () => {
  return (
    <Pressable>
      <View>1</View>
      <View>
        <Text style={[styles.name]}>이름</Text>
      </View>
      <Pressable>
        <Text style={[styles.name]}>팔로잉</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  name: {fontSize: 15, color: '#000', fontWeight: 'bold'},
});

export default FollowItem;
