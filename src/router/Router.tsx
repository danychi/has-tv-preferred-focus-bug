import {
  NavigationContainer,
  DefaultTheme,
  NavigationState,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {AScreen, BScreen, CScreen} from '../screens';
import {COLORS} from '../styles';
import {FocusService} from '../utils';

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
    <RootStack.Navigator
      screenOptions={{headerShown: false}}
      screenListeners={() => ({
        state: (e: any) => {
          const {index, routes} = e.data.state as NavigationState;
          const route = routes[index];

          if (FocusService.instance) {
            FocusService.instance.activeRoute = route.name;
          }
        },
      })}>
      <RootStack.Screen name="A" component={AScreen} />
      <RootStack.Screen name="B" component={BScreen} />
      <RootStack.Screen name="C" component={CScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
