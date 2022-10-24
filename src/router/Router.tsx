import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {AScreen, BScreen, CScreen} from '../screens';
import {COLORS} from '../styles';

StatusBar.setBarStyle('light-content');

const RootStack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.shade6,
  },
};

export const Router = () => (
  <NavigationContainer theme={navTheme}>
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="A" component={AScreen} />
      <RootStack.Screen name="B" component={BScreen} />
      <RootStack.Screen name="C" component={CScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
