import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
  TouchableOpacity,
  ScrollView,
  FlatList,
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

function Filter({route}) {
  const navigation = useNavigation();
  const picture = route?.params?.picture;
  console.log(route);
  const screenW = Dimensions.get('screen').width;
  const [selected, setSelected] = useState(false);
  const [SelectFilter, sertSelectFilter] = useState([]);
  const [filterUri, setFilterUri] = useState();
  const HeaderRight = () => {
    const navigation = useNavigation();
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Write', {
            filterProps: filterUri,
          });
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#83C8F0',
            paddingRight: 20,
          }}>
          다음
        </Text>
      </Pressable>
    );
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: ({}) => <HeaderRight filterUri={filterUri} />,
    });
  }, [filterUri]);
  const filters = [
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
  ];
  const atx = (
    <Image
      style={{width: 100, height: 100, marginRight: 5}}
      source={{uri: picture}}
      resizeMode={'cover'}
    />
  );
  const atx2 = (
    <Image
      style={{width: '100%', height: '100%'}}
      source={{uri: picture}}
      resizeMode={'cover'}
      // ref={filterRef}
    />
  );
  const filterItem = SelectFilter.map((Item2, index) => (
    <Item2
      key={index}
      onExtractImage={({nativeEvent}) => setFilterUri(nativeEvent.uri)}
      extractImageEnabled={true}
      image={atx2}
    />
  ));
  const Item = ({Tes}) => <Tes.item image={atx} />;
  // const filterRef = useRef();
  const renderItem = (Tes) => (
    <Pressable
      onPress={() => {
        setSelected(true);
        sertSelectFilter([Tes.item]);
      }}>
      <Text style={{fontSize: 9, textAlign: 'center', marginBottom: 5}}>
        {Tes.item.displayName}
      </Text>
      <Item
        Tes={Tes}
        style={{
          justifyContent: 'center',
          height: '100%',
          flex: 1,
          width: '100%',
        }}
      />
    </Pressable>
  );

  return picture ? (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, width: '100%', height: '100%'}}>
        <View
          style={[
            styles.photoBox1,
            {
              width: screenW,
              height: 300,
              position: 'relative',
            },
          ]}>
          {selected ? (
            <View>{filterItem}</View>
          ) : (
            // <View></View>
            <Image
              source={{uri: picture}}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          )}
        </View>
        <View style={[styles.photoBox2]}>
          <FlatList
            style={{
              height: '100%',
            }}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            data={filters}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  photoBox1: {},
  photoBox2: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Filter;
