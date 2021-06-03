/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  AdenCompat,
  BrannanCompat,
  BrooklynCompat,
  ClarendonCompat,
  EarlybirdCompat,
  GinghamCompat,
  HudsonCompat,
  InkwellCompat,
  KelvinCompat,
  LarkCompat,
  LofiCompat,
  MavenCompat,
  MayfairCompat,
  MoonCompat,
  NashvilleCompat,
  PerpetuaCompat,
  ReyesCompat,
  RiseCompat,
  SlumberCompat,
  StinsonCompat,
  ToasterCompat,
  ValenciaCompat,
  WaldenCompat,
  WillowCompat,
  Xpro2Compat,
} from 'react-native-image-filter-kit';

const HeaderRight = ({filterUri, mainPhoto}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('write', {
          filterUri,
          mainPhoto,
        });
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#4192ee',
          paddingRight: 20,
        }}>
        다음
      </Text>
    </Pressable>
  );
};

function Filter({route}) {
  const picture = route?.params?.picture;
  const navigation = useNavigation();
  const screenH = Dimensions.get('screen').height / 2 - 60;
  const filters = [
    BrannanCompat,
    BrooklynCompat,
    ClarendonCompat,
    EarlybirdCompat,
    GinghamCompat,
    HudsonCompat,
    InkwellCompat,
    KelvinCompat,
    LarkCompat,
    LofiCompat,
    MavenCompat,
    MayfairCompat,
    MoonCompat,
    NashvilleCompat,
    PerpetuaCompat,
    ReyesCompat,
    RiseCompat,
    SlumberCompat,
    StinsonCompat,
    ToasterCompat,
    ValenciaCompat,
    WaldenCompat,
    WillowCompat,
    Xpro2Compat,
    AdenCompat,
  ];
  const [mainPhoto] = useState(route.params.picture);
  const [filterUri, setFilterUri] = useState('');
  const [SelectFilter, setSelectFilter] = useState();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({}) => (
        <HeaderRight filterUri={filterUri} mainPhoto={mainPhoto} />
      ),
    });
  }, [filterUri, mainPhoto, navigation]);

  const renderItem = (Filters) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(true);
          setSelectFilter(Filters);
        }}
        style={{
          width: 100,
          height: 100,
          marginRight: 5,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 10,
            textAlign: 'center',
            marginBottom: 5,
          }}>
          {Filters.item.displayName}
        </Text>
        <Filters.item
          extractImageEnabled={true}
          image={
            <Image
              style={{width: 100, height: 100}}
              source={{uri: picture}}
              resizeMode={'cover'}
            />
          }
        />
      </TouchableOpacity>
    );
  };
  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  return picture ? (
    <View style={{flex: 1, backgroundColor: '#101010'}}>
      <View
        style={[
          styles.itemBox1,
          {
            width: '100%',
            height: screenH,
          },
        ]}>
        {selected ? (
          <SelectFilter.item
            onExtractImage={({nativeEvent}) => setFilterUri(nativeEvent.uri)}
            extractImageEnabled={true}
            image={
              <Image
                source={{uri: picture}}
                style={{width: '100%', height: '100%'}}
                resizeMode={'cover'}
              />
            }
          />
        ) : (
          <Image
            source={{uri: mainPhoto}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={[styles.itemBox2]}>
        <View>
          <FlatList
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            data={[...filters]}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            horizontal={true}
            maxToRenderPerBatch={15}
            windowSize={15}
            initialNumToRender={15}
          />
        </View>
      </View>
    </View>
  ) : null;
}
const styles = StyleSheet.create({
  itemBox1: {},
  itemBox2: {flex: 1, justifyContent: 'center', backgroundColor: '#101010'},
});

export default Filter;
