import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {$http} from '../api/fetcher';
// import Feather from 'react-native-vector-icons/Feather';
const SearchDropBox = ({content, tagOpen, searchItem}) => {
  const [searchTagList, setSearchTagList] = useState();
  const [searchTagBoardList, setSearchTagBoardList] = useState();

  useEffect(() => {
    const searchTag = async (val) => {
      try {
        let valArray = val?.split(' ');
        let searchTagVal = valArray[valArray?.length - 1];

        if (searchTagVal.includes('#')) {
          let arr = [];
          let hashIndex = await searchTagVal.indexOf('#');
          arr = await searchTagVal
            .substring(hashIndex, searchTagVal?.length)
            .substr(1, searchTagVal?.length - 1)
            ?.split('#');
          if (searchTagVal !== '#') {
            const response = await $http.get('/api/board/explore/tag', {
              params: {
                name: arr[arr?.length - 1],
              },
            });

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
    searchTag(content);
  }, [content, tagOpen]);

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
                searchItem(item);
              }}>
              <View style={[styles.hashBox]}>{/* <Feather name="hash" size={25} /> */}</View>
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
