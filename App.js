/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Splash from './app/components/Splash';
import Home from './app/components/Home';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.83;

const RouteConfigs = {
  Splash: {
    screen: Splash,
  },
  Home: {
    screen: Home,
  },
};

const DrawerNavigatorConfigs = {
  initialRouteName: 'Splash',
  drawerWidth: DRAWER_WIDTH,
  drawerPosition: 'left',
  drawerType: 'slide',
  edgeWidth: 30,
  drawerLockedMode: 'unlocked',
  contentOptions: {
    itemStyle: {
      height: 50,
    },
    labelStyle: {
      fontSize: 16,
      fontFamily: 'Sahitya-Bold',
      fontWeight: 'normal',
    },
  },
  // contentComponent: (<CustomDrawerContentComponent />)
};

const DrawerNavigator = createDrawerNavigator(
  RouteConfigs,
  DrawerNavigatorConfigs,
);

export default createAppContainer(DrawerNavigator);
