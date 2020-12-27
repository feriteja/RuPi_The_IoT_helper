import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import login from '../../src/screens/auth/login';
import register from '../../src/screens/auth/register';
import forgotPass from '../../src/screens/auth/forgotPass';

const AuthStack = createStackNavigator();

const authScreen = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="login" component={login} />
      <AuthStack.Screen name="register" component={register} />
      <AuthStack.Screen name="forgotPass" component={forgotPass} />
    </AuthStack.Navigator>
  );
};

export default authScreen;
