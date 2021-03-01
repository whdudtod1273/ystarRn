import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react';
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
  console.log(picture);
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
  // const filters = [
  //   AdenCompat,
  //   BrannanCompat,
  //   BrooklynCompat,
  //   ClarendonCompat,
  //   EarlybirdCompat,
  //   GinghamCompat,
  //   HudsonCompat,
  //   InkwellCompat,
  //   KelvinCompat,
  //   LarkCompat,
  //   LofiCompat,
  //   MavenCompat,
  //   MayfairCompat,
  //   MoonCompat,
  //   NashvilleCompat,
  //   PerpetuaCompat,
  //   ReyesCompat,
  //   RiseCompat,
  //   SlumberCompat,
  //   StinsonCompat,
  //   ToasterCompat,
  //   ValenciaCompat,
  //   WaldenCompat,
  //   WillowCompat,
  //   Xpro2Compat,
  // ];
  const atx = (
    <Image
      style={{width: 100, height: 100, marginRight: 5}}
      source={{uri: picture}}
      resizeMode={'cover'}
    />
  );
  const list = (
    <>
      <AdenCompat image={atx} />
      <BrannanCompat image={atx} />
      <BrooklynCompat image={atx} />
      <ClarendonCompat image={atx} />
      <EarlybirdCompat image={atx} />
      <GinghamCompat image={atx} />
      <HudsonCompat image={atx} />
      <InkwellCompat image={atx} />
      <KelvinCompat image={atx} />
      <LarkCompat image={atx} />
      <LofiCompat image={atx} />
      <MavenCompat image={atx} />
      <MayfairCompat image={atx} />
      <MoonCompat image={atx} />
      <NashvilleCompat image={atx} />
      <PerpetuaCompat image={atx} />
      <ReyesCompat image={atx} />
      <RiseCompat image={atx} />
      <SlumberCompat image={atx} />
      <StinsonCompat image={atx} />
      <ToasterCompat image={atx} />
      <ValenciaCompat image={atx} />
      <WaldenCompat image={atx} />
      <WillowCompat image={atx} />
      <Xpro2Compat image={atx} />
    </>
  );
  useEffect(() => {
    console.log('count');
  }, [list]);
  const [filterList, setFilterList] = useState([]);
  // useLayoutEffect(() => {
  //   const filterList = filters.map((Item, index) => (
  //     <Pressable
  //       onPress={() => {
  //         setSelected(true);
  //         sertSelectFilter([Tes.item]);
  //       }}
  //       key={index}>
  //       <Item image={atx} />
  //     </Pressable>
  //   ));
  //   setFilterList(filterList);
  // }, []);

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
          <ScrollView>{list}</ScrollView>
          {/* <FlatList
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
          /> */}
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
