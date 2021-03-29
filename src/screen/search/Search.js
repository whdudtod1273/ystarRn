import React, {useEffect, useState} from 'react';
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

function Search() {
  const [text, setText] = useState('');
  const onChange = () => {
    console.log('1');
    const response = $http.get('/api/account/usersearch', {
      params: {
        user: text,
      },
    });
  };
  useEffect(() => {
    onChange();
    console.log(text);
  }, [text]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.searchBox]}>
        <TextInput
          value={text}
          onChangeText={(val) => {
            setText(val);
          }}
        />
      </View>
      <View>
        <Text>{text}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  searchBox: {},
});
export default Search;
