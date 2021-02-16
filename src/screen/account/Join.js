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
function Join(props) {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: '',
    password: '',
    rePassword: '',
    username: '',
    phone: '',
  });
  const {username, email, password, rePassword, phone} = user;
  // const emailRef = useRef();
  useEffect(() => {
    console.log(user);
  }, [user]);
  const CreateUser = async () => {
    const regExpEmail = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const regExpPw = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/;

    if (username === '') {
      Alert.alert('이름을 입력해주세요');
    } else if (email === '') {
      Alert.alert('이메일을 입력해주세요');
    } else if (regExpEmail.test(email) == false) {
      Alert.alert('이메일 주소를 확인해 주세요');
    } else if (password === '') {
      Alert.alert('비밀번호를 입력해주세요');
    } else if (regExpPw.test(password) == false) {
      Alert.alert(
        '비밀번호는 최소 8자리에 숫자, 문자, 특수문자가 각 1개 이상 포함되어야 합니다.',
      );
    } else if (rePassword === '') {
      Alert.alert('비밀번호 확인을 입력해주세요');
    } else if (password != rePassword) {
      Alert.alert('비밀번호를 확인해주세요');
    } else if (phone === '') {
      Alert.alert('휴대폰번호를 입력해주세요');
    } else {
      try {
        await $http
          .post('/api/account/join', {
            username,
            email,
            password,
            phone,
          })
          .then((res) => {
            navigation.navigate('로그인');
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.joinContainer]}>
        <View style={[styles.joinBox]}>
          <View style={[styles.inputBox]}>
            <TextInput
              style={[styles.input]}
              name="username"
              value={username}
              onChangeText={(text) => {
                setUser({...user, username: text});
              }}
              placeholder="이름"
            />
          </View>
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
          <View style={[styles.inputBox]}>
            <TextInput
              style={[styles.input]}
              name="rePassword"
              value={rePassword}
              onChangeText={(text) => {
                setUser({...user, rePassword: text});
              }}
              placeholder="비밀번호 확인"
            />
          </View>
          <View style={[styles.inputBox]}>
            <TextInput
              style={[styles.input]}
              name="phone"
              value={phone}
              onChangeText={(text) => {
                setUser({...user, phone: text});
              }}
              placeholder="휴대폰 번호"
            />
          </View>
          <Pressable
            style={[styles.button]}
            onPress={() => {
              CreateUser();
            }}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
              회원가입
            </Text>
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

export default Join;
