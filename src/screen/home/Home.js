import React, {useEffect, useState} from 'react';
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
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import SvgBox from '../../api/ImageBox';
import {logout} from '../../reducers/auth';
import FeedList from '../../components/FeedList';
function Home() {
  const navigation = useNavigation();
  const store = useSelector((state) => state, shallowEqual);
  const dispatch = useDispatch();
  const [boardList, setBoardList] = useState();
  useFocusEffect(
    React.useCallback(() => {
      $http.get('/api/board').then((res) => {
        setBoardList(res.data);
      });
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Pressable
        onPress={() => {
          dispatch(logout());
        }}>
        <Text>로그아웃</Text>
      </Pressable>
      {/* <SvgBox type={'HomeSvg'} width={20} height={20} />
      <SvgBox type={'HomeSelectSvg'} width={20} height={20} />
      <SvgBox type={'HeartSvg'} width={20} height={20} />
      <SvgBox type={'HeartSelectSvg'} width={20} height={20} />
      <SvgBox type={'PhotoSvg'} width={20} height={20} /> */}
      <FeedList boardList={boardList} />
    </SafeAreaView>
  );
}
export default Home;
