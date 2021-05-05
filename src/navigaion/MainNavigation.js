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

import Home from '../screen/home/Home';
import Search from '../screen/search/Search';
import Activity from '../screen/activity/Activity';
import Profile from '../screen/profile/Profile';
const Tab = createBottomTabNavigator();

function MainNavigation() {
  const navigation = useNavigation();
  const TabBarIcon = (focused, name) => {
    if (name === 'home') {
      return focused ? (
        <HomeSelectSvg width={25} height={25} />
      ) : (
        <HomeSvg width={25} height={25} />
      );
    } else if (name === 'search') {
      return focused ? (
        <SearchSelectSvg width={25} height={25} />
      ) : (
        <SearchSvg width={25} height={25} />
      );
    } else if (name === 'temporary') {
      return focused ? (
        <PhotoSelectSvg width={25} height={25} />
      ) : (
        <PhotoSvg width={25} height={25} />
      );
    } else if (name === 'activity') {
      return focused ? (
        <HeartSelectSvg width={25} height={25} />
      ) : (
        <HeartSvg width={25} height={25} />
      );
    } else if (name === 'profile') {
      return <ProfileSvg width={25} height={25} />;
    }
  };
  const temporary = () => {
    return <Pressable></Pressable>;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: route.name,
          tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
        })}
        tabBarOptions={{
          tabStyle: {
            justifyContent: 'center',
          },
          showLabel: false,
        }}>
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="search" component={Search} />
        <Tab.Screen
          name="temporary"
          component={temporary}
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              // Do something with the `navigation` object
              navigation.navigate('photo');
            },
          })}
        />
        <Tab.Screen name="activity" component={Activity} />
        <Tab.Screen name="profile" component={Profile} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});

export default MainNavigation;
