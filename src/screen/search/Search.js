import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchDropBox from '../../components/SearchDropBox';
const Search = () => {
  const [content, setContent] = useState();
  const [tagListOpen, setTagListOpen] = useState(false);
  const searchDropBoxHeight = Dimensions.get('window').height - 60;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Pressable onPress={Keyboard.dismiss}>
        <View style={[styles.searchContainer]}>
          <View style={[styles.searchBox]}>
            {/* <Ionicons name={'ios-search'} size={17} color="gray" /> */}
            <TextInput
              style={{paddingLeft: 7, flex: 1}}
              placeholder="검색"
              value={content}
              onChangeText={(val) => {
                setContent(val);
                console.log(val);
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: tagListOpen ? searchDropBoxHeight : 0,
            position: 'absolute',
            top: 50,
            left: 0,
          }}>
          <SearchDropBox content={content} tagOpen={setTagListOpen} />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  searchBox: {
    backgroundColor: '#dedede',
    borderRadius: 7,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
});
export default Search;
