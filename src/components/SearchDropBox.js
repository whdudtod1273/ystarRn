import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
const SearchDropBox = ({content, tagOpen}) => {
  const [searchTagList, setSearchTagList] = useState();
  const [searchTagBoardList, setSearchTagBoardList] = useState();

  useEffect(() => {
    searchTag(content);
  }, [content]);

  const searchTag = async (val) => {
    try {
      let valArray = val?.split(' ');
      let searchTag = valArray[valArray?.length - 1];

      if (searchTag.includes('#')) {
        let arr = [];
        let hashIndex = await searchTag.indexOf('#');
        arr = await searchTag
          .substring(hashIndex, searchTag?.length)
          .substr(1, searchTag?.length - 1)
          ?.split('#');
        if (searchTag !== '#') {
          const response = await $http.get('/api/board/explore/tag', {
            params: {
              name: arr[arr?.length - 1],
            },
          });
          console.log(response);
          const responseBoard = await $http.get('/api/board/explore', {
            params: {
              name: arr[arr?.length - 1],
            },
          });

          if (response.status === 200) {
            setSearchTagList(response.data);
            if (response.data?.length > 0) {
              tagOpen(true);
            } else {
              tagOpen(false);
            }
          }
          if (responseBoard.status === 200) {
            setSearchTagBoardList(responseBoard.data);
          }
        } else {
          tagOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
      }}>
      {searchTagList ? (
        <ScrollView>
          {searchTagList.map((item, index) => (
            <Pressable
              style={[styles.tagBox]}
              key={index}
              onPress={() => {
                tagOpen(false);
              }}>
              <View style={[styles.hashBox]}>
                {/* <Feather name="hash" size={25} /> */}
              </View>
              <View style={[styles.textBox]}>
                <Text>{item.name}</Text>
                <Text>게시물 {searchTagBoardList?.length}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  tagBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  hashBox: {
    width: 50,
    height: 50,
    borderColor: '#dedede',
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    justifyContent: 'center',
    paddingLeft: 20,
  },
});
export default SearchDropBox;
