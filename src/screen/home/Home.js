import React from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
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
import SvgBox from '../../api/ImageBox';
import {logout} from '../../reducers/auth';
function Home() {
  const navigation = useNavigation();
  const store = useSelector((state) => state, shallowEqual);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Pressable
        onPress={() => {
          dispatch(logout());
        }}>
        <Text>로그아웃</Text>
      </Pressable>
      <SvgBox type={'HomeSvg'} width={20} height={20} />
      <SvgBox type={'HomeSelectSvg'} width={20} height={20} />
      <SvgBox type={'HeartSvg'} width={20} height={20} />
      <SvgBox type={'HeartSelectSvg'} width={20} height={20} />
      <SvgBox type={'PhotoSvg'} width={20} height={20} />
    </SafeAreaView>
  );
}
export default Home;
