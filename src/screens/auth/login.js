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

export default function login({navigation}) {
  const [userName, setUserName] = useState(null);
  const [passWord, setPassWord] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const loginFunc = () => {
    if (userName && passWord) {
      return dispatch(
        authAction.login({email: userName, password: passWord}),
      ).then((res) => setErrorMessage(res));
    } else {
      return setErrorMessage('Invalid Credentials');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
          width,
        }}>
        <Text style={{fontSize: 50, fontWeight: 'bold', color: color.primary}}>
          RuPi
        </Text>
        <Text>Make your IoT Project easy to monitor</Text>
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
          source={require('../../assets/icon/Bulk/2User.png')}
          onChangeText={(a) => setUserName(a)}
          placeHolder="Username"
        />
        <Gap height={10} />
        <TextInput
          source={require('../../assets/icon/Bulk/Lock.png')}
          type="password"
          onChangeText={(a) => setPassWord(a)}
          placeHolder="Password"
        />

        <Gap height={20} />

        <TouchableOpacity
          onPress={() => loginFunc()}
          style={{
            backgroundColor: color.secondary,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={{fontSize: 20}}>Create account </Text>
        <TouchableOpacity onPress={() => navigation.push('register')}>
          <Text style={{color: color.value, fontSize: 20}}>here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCard: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    flex: 1,
    minHeight: 130,
    maxHeight: 290,
    paddingVertical: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderLeftWidth: 1,
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
