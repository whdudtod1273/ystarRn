import React, {useEffect} from 'react';
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
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Camera from './select/upload/Camera';
import Picker from './select/upload/Picker';
const Tab = createMaterialTopTabNavigator();
function Photo() {
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
export default Photo;
