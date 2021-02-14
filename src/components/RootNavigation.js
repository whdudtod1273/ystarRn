import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Join from '../screen/account/Join';
import Login from '../screen/account/Login';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RootNavigation(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="로그인" component={Login} />
      <Stack.Screen name="회원가입" component={Join} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({});

export default RootNavigation;
