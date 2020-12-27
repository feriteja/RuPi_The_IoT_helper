import React from 'react';
import {View, Text} from 'react-native';
import Navigation from './config/navigation/';
import {Provider} from 'react-redux';
import store from './config/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Navigation />
      </View>
    </Provider>
  );
};

export default App;
