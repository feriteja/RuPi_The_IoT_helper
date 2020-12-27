import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';

export default function showDevices() {
  const [dataList, setDataList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {}, []);
  return (
    <View>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({});
