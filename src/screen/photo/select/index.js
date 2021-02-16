import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Picker from './upload/Picker.js';
import Camera from './upload/Camera.js';
const Tab = createBottomTabNavigator();
function Select() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({})}
        tabBarOptions={{
          tabStyle: {
            justifyContent: 'center',
          },
          showLabel: false,
        }}>
        <Tab.Screen name="picker" component={Picker}></Tab.Screen>
        <Tab.Screen name="camera" component={Camera}></Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}
export default Select;
