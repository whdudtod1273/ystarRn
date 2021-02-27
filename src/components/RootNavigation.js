import React, {useEffect, useRef, useState} from 'react';
import HomeSvg from '../assets/svg/home.svg';
import HomeSelectSvg from '../assets/svg/homeSelect.svg';
import HeartSvg from '../assets/svg/heart.svg';
import HeartSelectSvg from '../assets/svg/heartSelect.svg';
import PhotoSvg from '../assets/svg/photo.svg';
import PhotoSelectSvg from '../assets/svg/photoSelect.svg';
import ProfileSvg from '../assets/svg/profile.svg';
import SearchSvg from '../assets/svg/search.svg';
import SearchSelectSvg from '../assets/svg/searchSelect.svg';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../screen/home/Home';
import Search from '../screen/search/Search';
import Photo from '../screen/photo/index';
import Activity from '../screen/activity/Activity';
import Profile from '../screen/profile/Profile';
import MainNavigation from './MainNavigation';
import Test from '../screen/test';
import Filter from '../screen/photo/upload/Filter';
import Write from '../screen/photo/upload/Write';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RootNavigation() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
  });

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

  const HeaderRight = () => {
    const navigation = useNavigation();
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Write', {});
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#83C8F0',
            paddingRight: 20,
          }}>
          다음
        </Text>
      </Pressable>
    );
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
      {userInfo.email === '' ? (
        <SafeAreaView style={{flex: 1}}>
          <Stack.Navigator>
            <Stack.Screen name="로그인" component={Login} />
            <Stack.Screen name="회원가입" component={Join} />
          </Stack.Navigator>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <Stack.Navigator mode="modal">
            <Stack.Screen name="로그인" component={Login} />
            <Stack.Screen name="회원가입" component={Join} />
            <Stack.Screen name="main" component={MainNavigation} />
            <Stack.Screen name="photo" component={Photo} />
            <Stack.Screen
              name="filter"
              options={{
                headerRight: ({}) => <HeaderRight />,
              }}
              component={Filter}
            />
            <Stack.Screen name="Write" component={Write} />
          </Stack.Navigator>
        </SafeAreaView>
      )}
    </>
  );
}
const styles = StyleSheet.create({});

export default RootNavigation;
