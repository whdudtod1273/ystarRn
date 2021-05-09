import React, {useState, useEffect} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions,
  Keyboard,
  ScrollView,
} from 'react-native';
import FeedList from '../../components/FeedGridList';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchDropBox from '../../components/SearchDropBox';
const Search = () => {
  const [content, setContent] = useState();
  const [tagListOpen, setTagListOpen] = useState(false);
  const [searchItem, setSearchItem] = useState();
  const searchDropBoxHeight = Dimensions.get('window').height - 60;
  const [boardList, setBoardList] = useState();
  const [searchTagList, setSearchTagList] = useState();
  useFocusEffect(
    React.useCallback(() => {
      $http.get('/api/board').then((res) => {
        setBoardList(res.data);
      });
      return () => {};
    }, []),
  );

  useEffect(() => {
    if (searchItem !== '' || searchItem !== null || searchItem !== undefined) {
      $http
        .get('/api/board/explore', {
          params: {
            name: searchItem?.name?.substr(1, searchItem?.name?.length - 1),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setBoardList(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchItem]);

  useEffect(() => {}, [tagListOpen]);

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
              }}
            />
          </View>
        </View>
        <ScrollView>
          <FeedList list={boardList} />
        </ScrollView>
        <View
          style={{
            width: '100%',
            height: tagListOpen ? searchDropBoxHeight : 0,
            position: 'absolute',
            top: 50,
            left: 0,
          }}>
          <SearchDropBox
            content={content}
            tagOpen={setTagListOpen}
            searchItem={setSearchItem}
            searchTagList={setSearchTagList}
          />
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
