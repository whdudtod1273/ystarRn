import React, {useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
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
  Button,
  Keyboard,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import SearchDropBox from '../../components/SearchDropBox';

const HeaderRight = ({content, filterUri, mainPhoto, tags}) => {
  const navigation = useNavigation();
  const store = useSelector((state) => state, shallowEqual);
  const [tagList, setTagList] = useState([]);
  const photoUpload = async () => {
    let tag = [];
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].includes('#')) {
        if (tags[i].match(/#/g).length > 1) {
          let arr = [];

          if (tags[i][0] === '#') {
            arr = await tags[i].substr(1, tags[i].length - 1).split('#');
          } else {
            let hashIndex = await tags[i].indexOf('#');
            arr = await tags[i]
              .substring(hashIndex, tags[i].length)
              .substr(1, tags[i].length - 1)
              .split('#');
          }
          for (let i = 0; i < arr.length; i++) {
            tag.push('#' + arr[i]);
          }
        } else {
          if (tags[i][0] === '#') {
            tag.push(tags[i]);
          } else {
            let hashIndex = await tags[i].indexOf('#');
            tag.push(tags[i].substring(hashIndex, tags[i].length));
          }
        }
      }
    }

    const formData = new FormData();
    let image = filterUri === '' ? mainPhoto : filterUri;
    let filterUriArray = image.split('/');
    let fileName = filterUriArray[filterUriArray.length - 1];
    formData.append('url', {
      uri: image,
      type: 'image/jpg',
      name: fileName,
    });

    formData.append('filter', 'filter');

    const response1 = await $http.post('/api/photo/', formData, {
      headers: {'content-type': 'multipart/form-data'},
    });

    const response2 = await $http.post('/api/board/write', {
      description: content,
      tag: tag.join(' '),
      writer: store.auth.id,
      photo: response1.data.id,
    });
  };

  return (
    <Pressable
      onPress={() => {
        photoUpload();
        navigation.navigate('home');
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#4192ee',
          paddingRight: 20,
        }}>
        공유
      </Text>
    </Pressable>
  );
};

function Write({route}) {
  const filterUri = route.params.filterUri;
  const mainPhoto = route.params.mainPhoto;
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagListOpen, setTagListOpen] = useState(false);
  const searchDropBoxHeight = Dimensions.get('window').height - 100;
  console.log(mainPhoto);
  console.log(route);
  useEffect(() => {
    navigation.setOptions({
      headerRight: ({}) => (
        <HeaderRight
          content={content}
          filterUri={filterUri}
          mainPhoto={mainPhoto}
          tags={tags}
        />
      ),
    });
  }, [content, filterUri, tags]);

  const changeText = (val) => {
    setContent(val);
    setTags(val.split(' '));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#dedede',
        }}>
        <Image
          source={{uri: filterUri === '' ? mainPhoto : filterUri}}
          style={{width: 70, height: 70}}
          resizeMode={'cover'}
        />
        <View style={{flex: 1, paddingLeft: 15}}>
          <TextInput
            style={{height: 70}}
            multiline={true}
            placeholder="문구 입력 ..."
            valu={content}
            onChangeText={(val) => {
              changeText(val);
            }}
          />
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: tagListOpen ? searchDropBoxHeight : 0,
          position: 'absolute',
          top: 100,
          left: 0,
        }}>
        <SearchDropBox content={content} tagOpen={setTagListOpen} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
export default Write;
