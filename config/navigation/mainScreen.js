import React, {useRef, useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import authAction from '../redux/action/authAction';
import dataAction from '../redux/action/dataAction';

import Home from '../../src/screens/main/home';
import Profile from '../../src/screens/main/profile';
import AddDevices from '../../src/screens/main/addDevices';
import ShowDevices from '../../src/screens/main/showDevices';
import {color} from '../../src/constant';

const StackScreen = createStackNavigator();

const HomeNav = (props) => {
  const dispatch = useDispatch();

  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, props.style])}>
      <StackScreen.Navigator
        screenOptions={{
          headerTitle: null,
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{padding: 20}}
              onPress={() => props.navigation.openDrawer()}>
              <FeatherIcon name="menu" size={18} />
            </TouchableOpacity>
          ),
        }}>
        <StackScreen.Screen name="home" component={Home} />
        <StackScreen.Screen name="profile" component={Profile} />
        <StackScreen.Screen
          options={{
            headerLeft: () => (
              <TouchableOpacity
                style={{padding: 7}}
                onPress={() => props.navigation.pop()}>
                <Image
                  source={require('../../src/assets/icon/Bulk/Arrow-Left2.png')}
                  style={{height: 42, width: 42}}
                />
              </TouchableOpacity>
            ),
          }}
          name="addDevices"
          component={AddDevices}
        />
        <StackScreen.Screen
          options={{
            headerLeft: () => (
              <TouchableOpacity
                style={{padding: 7}}
                onPress={() => props.navigation.pop()}>
                <Image
                  source={require('../../src/assets/icon/Bulk/Arrow-Left2.png')}
                  style={{height: 42, width: 42}}
                />
              </TouchableOpacity>
            ),
          }}
          name="showDevices"
          component={ShowDevices}
        />
      </StackScreen.Navigator>
    </Animated.View>
  );
};

const DrawerContent = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    props.getProgress(props.progress);
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <DrawerItem
          activeBackgroundColor="#faa"
          activeTintColor="#aff"
          label="Home"
          labelStyle={{marginLeft: -16}}
          onPress={() => props.navigation.navigate('home')}
          icon={() => (
            <Image
              source={require('../../src/assets/icon/Bulk/Home.png')}
              style={{height: 32, width: 32}}
            />
          )}
        />

        <DrawerItem
          label="Profile"
          labelStyle={{marginLeft: -16}}
          onPress={() => props.navigation.navigate('profile')}
          icon={() => (
            <Image
              source={require('../../src/assets/icon/Bulk/Profile.png')}
              style={{height: 32, width: 32}}
            />
          )}
        />
      </View>

      <View style={{}}>
        <DrawerItem
          label="Logout"
          labelStyle={{fontSize: 20, marginLeft: -20}}
          icon={() => (
            <Image
              source={require('../../src/assets/icon/Bulk/Logout.png')}
              style={{height: 32, width: 32}}
            />
          )}
          onPress={() => dispatch(authAction.logout())}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const SideNav = createDrawerNavigator();

export default function sideBar() {
  const [progress, setProgress] = useState(Animated.useValue(0));

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <LinearGradient
      style={{flex: 1}}
      colors={[color.value, color.primary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <SideNav.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{flex: 1}}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={(props) => {
          // setProgress(props.progress);
          return (
            <DrawerContent {...props} getProgress={(prg) => setProgress(prg)} />
          );
        }}>
        <SideNav.Screen name="Screens">
          {(props) => <HomeNav {...props} style={animatedStyle} />}
        </SideNav.Screen>
      </SideNav.Navigator>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: 'hidden',
  },
  drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'},
  drawerItem: {alignItems: 'flex-start', marginVertical: 0},
  drawerLabel: {color: 'white', marginLeft: -16},
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
