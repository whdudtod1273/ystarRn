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
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
function Test() {
  const navigation = useNavigation();
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const backAction = () => {
    navigation.pop(2);

    return true;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text>테스트!!!!!!!!!</Text>
      </View>
    </SafeAreaView>
  );
}
export default Test;
