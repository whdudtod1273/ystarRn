import React from 'react';
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
const Tab = createMaterialTopTabNavigator();
function Follow() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen name="팔로워" component={Follower} />
        <Tab.Screen name="팔로잉" component={Following} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
export default Follow;
