import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Gap} from '..';
import {color} from '../../constant';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const monthName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  ' May',
  'Jun',
  ' Jul',
  ' Aug',
  ' Sept',
  ' Oct',
  ' Nov',
  ' Dec',
];

export default function index() {
  const [time, setTime] = useState('');
  const [month, setMonth] = useState('');

  const data = useSelector((state) => state.data);
  const date = new Date();

  const timeState = () => {
    const TimeState = date.getHours();

    if (TimeState > 4 && TimeState <= 11) {
      setTime('Good Morning');
    } else if (TimeState > 11 && TimeState <= 18) {
      setTime('Good Day');
    } else if (TimeState > 18 && TimeState <= 4) {
      setTime('Good Evening');
    }
  };

  useEffect(() => {
    timeState();
  }, []);

  return (
    <View style={styles.wellcomeStat}>
      <View style={{flex: 0.7, alignSelf: 'center'}}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
          {time}
        </Text>
        <Text style={{color: 'white'}}>{data?.name} </Text>
      </View>
      <Gap width={2} style={{backgroundColor: 'white', marginHorizontal: 20}} />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
          <Text
            style={{
              color: 'white',
              letterSpacing: 3,
            }}>
            {monthName[date.getMonth()]}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              letterSpacing: 5,
            }}>
            {date.getDate()}
          </Text>
        </View>
        <View style={{position: 'absolute', right: 0, alignSelf: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: 'white'}}>
              {data?.deviceCount}
            </Text>
            <MaterialIcon name="device-hub" size={24} color="white" />
          </View>
          <Text style={{color: 'white'}}>Total devices </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wellcomeStat: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: color.primary,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
