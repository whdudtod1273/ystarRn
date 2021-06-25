/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation, CommonActions} from '@react-navigation/native';
import Follower from './Follower';
import Following from './Following';
import {$http} from '../../../api/fetcher';

const Tab = createMaterialTopTabNavigator();

function Follow({route}) {
  const navigation = useNavigation();
  const userId = route.params.params.userId;
  const followType = route.params.params?.followType;
  const [followers, setFollowers] = useState();
  const [followings, setFollowings] = useState();
  useEffect(() => {
    $http
      .get(`/api/account/follow/${userId}`)
      .then((res) => {
        setFollowers(res.data.Follower);
        setFollowings(res.data.Following);
        console.log(followType);
        console.log(res.data);
        if (followType === 'follower') {
          navigation.dispatch(
            CommonActions.navigate({
              name: '팔로워',
              params: {
                follower: res.data.Follower,
              },
            }),
          );
        } else if (followType === 'following') {
          navigation.dispatch(
            CommonActions.navigate({
              name: '팔로잉',
              params: {
                following: res.data.Following,
              },
            }),
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [followType, navigation, userId]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen
          name="팔로워"
          component={Follower}
          listeners={({navigation}) => ({
            tabPress: (e) => {
              navigation.navigate('팔로워', {
                userId: userId,
                follower: followers,
              });
            },
          })}
        />
        <Tab.Screen
          name="팔로잉"
          component={Following}
          listeners={({navigation}) => ({
            tabPress: (e) => {
              navigation.navigate('팔로잉', {
                userId: userId,
                following: followings,
              });
            },
          })}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
export default Follow;
