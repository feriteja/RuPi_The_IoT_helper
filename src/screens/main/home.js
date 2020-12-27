import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Switch,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {color} from '../../constant';
import {Gap, WellcomeStat} from '../../components/';
import OctIcon from 'react-native-vector-icons/Octicons';
import authAction from '../../../config/redux/action/authAction';
import dataAction from '../../../config/redux/action/dataAction';
import Auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

const dataDummy = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const {width, height} = Dimensions.get('window');

const ItemBox = ({item, index}) => {
  const [enabled, setEnabled] = useState(false);
  const toggleSwitch = () => setEnabled((prev) => !prev);
  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          elevation: 1.6,
          width: width / 2 - 20,
          marginVertical: 10,
          height: 220,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 20,
          justifyContent: 'space-between',
        },
        index % 2 == 0 ? {marginRight: 2} : {marginLeft: 10},
      ]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <OctIcon
          name="light-bulb"
          size={50}
          color={enabled ? color.active : color.inactive}
        />
        <Switch
          disp
          value={enabled}
          trackColor={{false: color.inactive, true: color.active}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          thumbColor={enabled ? 'white' : '#f4f3f4'}
        />
      </View>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: enabled ? color.active : color.inactive,
          }}>
          Value
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: enabled ? color.active : '#000',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          My Device {item}
        </Text>
        <Text>Subtitle</Text>
      </View>
    </View>
  );
};

export default function home({navigation}) {
  const haii = useHeaderHeight();

  const dispatch = useDispatch();

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () =>
      dispatch(dataAction.getUserInfo()),
    );

    return subscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, {height: haii}]}>
        <Text style={styles.headerText}>Home</Text>
      </View>
      <View style={styles.content}>
        <WellcomeStat />
        <Gap height={20} />

        <TouchableOpacity
          onPress={() => navigation.push('addDevices')}
          style={styles.itemAdd}
          activeOpacity={0.8}>
          <Text style={{color: 'white'}}>Add your new item........</Text>
          <Image
            source={require('../../assets/icon/Bulk/Plus.png')}
            style={{
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
        <Gap height={20} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Running Nodes</Text>
          <TouchableOpacity
            onPress={() => navigation.push('showDevices')}
            activeOpacity={0.6}
            style={{
              backgroundColor: '#fff',
              paddingVertical: 2,
              paddingHorizontal: 5,
              borderRadius: 5,
            }}>
            <Text>View devices</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            contentContainerStyle={{margin: 4, paddingBottom: 200}}
            horizontal={false}
            numColumns={2}
            data={dataDummy}
            keyExtractor={(_, idx) => idx}
            renderItem={({item, index}) => (
              <ItemBox item={item} index={index} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: color.background},
  //!Header
  header: {
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.secondary,
    textAlign: 'center',
  },

  //!Content
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemAdd: {
    flexDirection: 'row',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: undefined,
    backgroundColor: color.primary,
  },
});
