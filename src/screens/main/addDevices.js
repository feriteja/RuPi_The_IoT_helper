import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Gap} from '../../components';
import {color} from '../../constant';

import dataAction from '../../../config/redux/action/dataAction';
import {useDispatch} from 'react-redux';

export default function addDevices({navigation}) {
  const [input1, setInput1] = useState(false);
  const [input1Text, setInput1Text] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const addFunc = () => {
    if (input1Text.length > 0) {
      dispatch(dataAction.addDevices({doc: input1Text})).then((a) => {
        setErrorMessage(a);
        a == null && navigation.pop();
      });
    } else {
      setErrorMessage('Please fill the blank input');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 20, color: color.value, fontWeight: 'bold'}}>
          Add new devices
        </Text>
      </View>
      <View style={styles.content}>
        {errorMessage && (
          <>
            <Text style={{textAlign: 'center', color: 'red', fontSize: 16}}>
              {errorMessage}
            </Text>
            <Gap height={20} />
          </>
        )}

        <TextInput
          onFocus={(a) => setInput1(true)}
          onBlur={(a) => setInput1(false)}
          onChangeText={(text) => setInput1Text(text)}
          style={{
            borderWidth: 1,
            borderColor: input1 ? color.primary : color.inactive,
          }}
        />
        <Gap height={20} />
        <TouchableOpacity
          onPress={() => addFunc()}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 17}}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingHorizontal: 10,
  },
  header: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.secondary,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
