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
import HomeSvg from '../../assets/svg/heart.svg';
function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Pressable
        onPress={() => {
          navigation.navigate('로그인');
        }}>
        <Text>로그인</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('회원가입');
        }}>
        <Text>회원가입</Text>
      </Pressable>
    </SafeAreaView>
  );
}
export default Home;
