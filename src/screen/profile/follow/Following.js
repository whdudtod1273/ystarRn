import React, {useEffect, useCallback} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {$http} from '../../../api/fetcher';

function Following({route}) {
  const userId = route.params?.userId;
  useFocusEffect(
    useCallback(() => {
      $http
        .get(`/api/account/follow/${userId}`)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      return () => {};
    }, [userId]),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text>팔로잉</Text>
      </View>
    </SafeAreaView>
  );
}

export default Following;
