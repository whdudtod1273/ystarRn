/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import './src/api/global';
import {Provider} from 'react-redux';
import configureStore from './src/store';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/components/RootNavigation';

const store = configureStore();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
