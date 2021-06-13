/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';

import {SafeAreaView} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Join from '../screen/account/Join';
import Login from '../screen/account/Login';
import Photo from '../screen/upload/Photo';
import MainNavigation from './MainNavigation';
import Follow from '../screen/profile/follow/Follow';
import Filter from '../screen/upload/Filter';
import Write from '../screen/upload/Write';
import Comment from '../screen/comment/Comment';
import Post from '../screen/post/Post';
import Following from '../screen/profile/follow/Following';

const Stack = createStackNavigator();

function RootNavigation() {
  const store = useSelector((state) => state, shallowEqual);
  const getItem = async () => {
    let email = '';
    let username = '';
    await AsyncStorage.getItem('email').then((value) => {
      email = value;
    });
    await AsyncStorage.getItem('username').then((value) => {
      username = value;
    });
  };

  useEffect(() => {
    getItem();
  }, [store.auth]);

  return (
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
          <Stack.Screen
            name="photo"
            component={Photo}
            options={{
              title: '새 게시물',
              headerStyle: {
                backgroundColor: '#101010',
                shadowOpacity: 0,
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="filter"
            component={Filter}
            options={{
              headerStyle: {
                backgroundColor: '#101010',
                shadowOpacity: 0,
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen name="write" component={Write} />
          <Stack.Screen name="follow" component={Follow} />
          <Stack.Screen name="post" component={Post} />
          <Stack.Screen
            options={{
              title: '댓글',
            }}
            name="comment"
            component={Comment}
          />
          <Stack.Screen name="로그인2" component={Login} />
          <Stack.Screen name="회원가입" component={Join} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootNavigation;
