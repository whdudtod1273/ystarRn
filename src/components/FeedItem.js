import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const FeedItem = () => {
  const store = useSelector((state) => state, shallowEqual);

  return (
    <View style={{flex: 1}}>
      <View></View>
    </View>
  );
};

export default FeedItem;
