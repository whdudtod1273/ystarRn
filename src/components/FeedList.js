import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import FeedItem from './FeedItem';

const FeedList = ({boardList}) => {
  const [items, setItems] = useState(boardList);
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {items?.map((item, index) => {
          return <FeedItem key={index} item={item} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FeedList;
