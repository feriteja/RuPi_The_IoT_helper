import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './mainScreen';
import AuthScreen from './authScreen';
import {useDispatch, useSelector} from 'react-redux';
import authAction from '../redux/action/authAction';

const MainStack = createStackNavigator();

const index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAction.checkauthstat());
  }, []);

  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <MainStack.Navigator headerMode="none">
        {auth.auth == false ? (
          <MainStack.Screen name="authScreen" component={AuthScreen} />
        ) : (
          <MainStack.Screen name="mainScreen" component={MainScreen} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default index;
