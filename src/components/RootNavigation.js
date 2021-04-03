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
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Join from '../screen/account/Join';
import Login from '../screen/account/Login';
import Home from '../screen/home/Home';
import Search from '../screen/search/Search';
import Photo from '../screen/photo/index';
import Activity from '../screen/activity/Activity';
import Profile from '../screen/profile/Profile';
import MainNavigation from './MainNavigation';
import Test from '../screen/test';
import Filter from '../screen/photo/upload/Filter';
import Write from '../screen/photo/upload/Write';
import Follow from '../screen/profile/follow/Follow';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RootNavigation() {
  const store = useSelector((state) => state, shallowEqual);

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
  });
  const [filter, serFilter] = useState({});

  const getItem = async () => {
    let email = '';
    let username = '';
    await AsyncStorage.getItem('email').then((value) => {
      email = value;
    });
    await AsyncStorage.getItem('username').then((value) => {
      username = value;
    });
    setUserInfo({email, username});
  };

  ////////////////////////////////////////////////////////////////////////////////
  getMyStringValue = async () => {
    try {
      await AsyncStorage.getItem('email').then((val) => {
        console.log(val);
      });
      await AsyncStorage.getItem('username').then((val) => {
        console.log(val);
      });
    } catch (e) {
      // read error
    }
    console.log('Done.');
  };
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('username');
    } catch (e) {
      // remove error
    }
    console.log('Done.');
  };
  ////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    // getMyStringValue();
    // removeValue();
    getItem();
    console.log(store.auth);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator>
        {store.auth === null ? (
          <>
            <Stack.Screen
              name="로그인"
              component={Login}
              options={{
                animationTypeForReplace: store.auth == null ? 'pop' : 'push',
              }}
            />
            <Stack.Screen name="회원가입" component={Join} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="main"
              component={MainNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen name="photo" component={Photo} />
            <Stack.Screen name="filter" component={Filter} />
            <Stack.Screen name="Write" component={Write} />
            <Stack.Screen name="follow" component={Follow} />
            <Stack.Screen name="로그인2" component={Login} />
            <Stack.Screen name="회원가입" component={Join} />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});

export default RootNavigation;
