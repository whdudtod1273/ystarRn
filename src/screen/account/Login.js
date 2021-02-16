import React, {useEffect, useRef, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const {email, password} = user;

  const Login = async () => {
    if (email === '') {
      Alert.alert('이메일을 입력해주세요');
    } else if (password === '') {
      Alert.alert('비밀번호를 입력해주세요');
    } else {
      await $http
        .post('/api/account/login', {
          email,
          password,
        })
        .then((res) => {
          console.log(res);
        });

      const response = await $http.get('/api/account');
      AsyncStorage.setItem('email', response.data.email);
      AsyncStorage.setItem('username', response.data.username);
      AsyncStorage.setItem('phone', response.data.phone);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.joinContainer]}>
        <View style={[styles.joinBox]}>
          <View style={[styles.inputBox]}>
            <TextInput
              style={[styles.input]}
              name="email"
              value={email}
              onChangeText={(text) => {
                setUser({...user, email: text});
              }}
              placeholder="이메일"
            />
          </View>
          <View style={[styles.inputBox]}>
            <TextInput
              style={[styles.input]}
              name="password"
              value={password}
              onChangeText={(text) => {
                setUser({...user, password: text});
              }}
              placeholder="비밀번호"
            />
          </View>

          <Pressable
            style={[styles.button]}
            onPress={() => {
              Login();
            }}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
              로그인
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            // backgroundColor: 'red',
            width: '100%',
            paddingHorizontal: 40,
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('회원가입');
            }}>
            <Text style={{fontSize: 15, color: '#333'}}>회원가입</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  joinContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  joinBox: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderRadius: 20,
    width: '90%',
    backgroundColor: '#fff',
  },
  inputBox: {width: '100%', height: 50, marginBottom: 15},
  input: {
    borderWidth: 1,
    borderColor: '#dedede',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#83C8F0',
  },
});

export default Login;
