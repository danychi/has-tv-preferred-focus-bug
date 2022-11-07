import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Button from '../components/Button';
import {RootStackParamList} from '../router';
import {COLORS} from '../styles';
import {scaleSize} from '../utils';

export const CScreen: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen C</Text>
      <View style={styles.buttonContainer}>
        <Button
          index={0}
          outline
          label="Go to A"
          width={scaleSize(336)}
          onPress={() => navigation.navigate('A')}
          canGoUp={false}
          canGoDown={false}
          canGoLeft={false}
        />
        <Button
          index={1}
          label="Go to B"
          width={scaleSize(336)}
          onPress={() => navigation.navigate('B')}
          canGoUp={false}
          canGoDown={false}
          canGoRight={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    color: COLORS.shade1,
    marginBottom: scaleSize(40),
  },
  bodyText: {
    marginHorizontal: scaleSize(240),
    marginBottom: scaleSize(40),
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
