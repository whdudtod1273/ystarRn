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

import {logout} from '../../reducers/auth';
import FeedList from '../../components/FeedList';
import SvgBox from '../../components/SvgBox';
import {$http} from '../../api/fetcher';
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Pressable
        onPress={() => {
          dispatch(logout(null));
        }}>
        <Text>로그아웃</Text>
      </Pressable>
      <FeedList boardList={boardList} />
    </SafeAreaView>
  );
}
export default Home;
