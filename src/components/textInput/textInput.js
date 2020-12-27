import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default function textInput({
  source,
  type = null,
  onChangeText,
  placeHolder,
}) {
  const [showPass, setShowPass] = useState(false);
  const [filledText, setFilledText] = useState('');

  useEffect(() => {
    onChangeText(filledText);
  }, [filledText]);
  return (
    <View style={styles.inputContainer}>
      <Image
        source={source}
        style={{resizeMode: 'cover', height: 40, width: 40}}
      />
      <TextInput
        autoCapitalize="none"
        placeholder={placeHolder}
        style={{flex: 1}}
        secureTextEntry={type == 'password' && !showPass}
        onChangeText={(text) => setFilledText(text)}
      />
      {type && (
        <TouchableOpacity onPress={() => setShowPass((prev) => !prev)}>
          {showPass ? (
            <Image
              source={require('../../assets/icon/Bulk/Show.png')}
              style={{resizeMode: 'cover', height: 25, width: 25}}
            />
          ) : (
            <Image
              source={require('../../assets/icon/Bulk/Hide.png')}
              style={{resizeMode: 'cover', height: 25, width: 25}}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderColor: '#333',
    borderRadius: 10,
    flexDirection: 'row',
  },
});
