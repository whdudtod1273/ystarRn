/* eslint-disable react-native/no-inline-styles */
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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Follower from './Follower';
import Following from './Following';
import {$http} from '../../../api/fetcher';

const Tab = createMaterialTopTabNavigator();

function Follow({route}) {
  const userId = route.params.params.userId;
  useEffect(() => {
    $http
      .get(`/api/account/follow/${userId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen
          name="팔로워"
          component={Follower}
          listeners={({navigation}) => ({
            tabPress: (e) => {
              navigation.navigate('팔로워', {
                userId: userId,
              });
            },
          })}
        />
        <Tab.Screen
          name="팔로잉"
          component={Following}
          listeners={({navigation}) => ({
            tabPress: (e) => {
              navigation.navigate('팔로잉', {
                userId: userId,
              });
            },
          })}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
export default Follow;
