import React from 'react';
import {View} from 'react-native';

export default function gap({height, width, style}) {
  return <View style={{height, width, ...style}} />;
}
