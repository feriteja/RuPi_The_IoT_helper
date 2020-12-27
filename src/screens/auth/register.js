import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import {color} from '../../constant';
import {Gap, TextInput} from '../../components/index';
import authAction from '../../../config/redux/action/authAction';
import {useDispatch} from 'react-redux';

const {height, width} = Dimensions.get('window');

export default function register() {
  const [name, setName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [passWord, setPassWord] = useState(null);
  const [confPassWord, setConfPassWord] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const regisFunc = () => {
    if (userName && passWord && confPassWord && name) {
      if (passWord === confPassWord) {
        dispatch(
          authAction.register({email: userName, password: passWord, name}),
        );
      } else {
        setErrorMessage('Password not match');
      }
    } else {
      setErrorMessage('Please fill the blank input');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 50, fontWeight: 'bold', color: color.primary}}>
          Register
        </Text>
      </View>
      <View style={styles.contentCard}>
        {errorMessage && (
          <>
            <Gap height={20} />
            <Text style={{textAlign: 'center', color: 'red', fontSize: 16}}>
              {errorMessage}
            </Text>
          </>
        )}

        <Gap height={20} />
        <TextInput
          source={require('../../assets/icon/Bulk/Profile.png')}
          onChangeText={(a) => setName(a)}
          placeHolder="your name"
        />
        <Gap height={10} />
        <TextInput
          source={require('../../assets/icon/Bulk/2User.png')}
          onChangeText={(a) => setUserName(a)}
          placeHolder="email"
        />
        <Gap height={10} />
        <TextInput
          source={require('../../assets/icon/Bulk/Lock.png')}
          type="password"
          onChangeText={(a) => setPassWord(a)}
          placeHolder="Password"
        />
        <Gap height={10} />
        <TextInput
          source={require('../../assets/icon/Bulk/Lock.png')}
          type="password"
          onChangeText={(a) => setConfPassWord(a)}
          placeHolder="confirm password"
        />

        <Gap height={20} />

        <TouchableOpacity
          // onPress={() => regisFunc()}
          onPress={() => regisFunc()}
          style={styles.buttonRegis}>
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRegis: {
    backgroundColor: color.secondary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCard: {
    flex: 2,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,

    paddingVertical: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    flex: 2,
  },
  inputContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderColor: '#333',
    borderRadius: 10,
    flexDirection: 'row',
  },
});
