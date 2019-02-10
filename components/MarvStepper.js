import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Entepo } from '@expo/vector-icons';

export default function MarvStepper({ max, unit, step, value, onIncrement, onDecrement}) {

  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity style={styles.btn} onPress={onDecrement}>
        <FontAwesome name='minus' size={30} color={'black'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onIncrement}>
        <FontAwesome name='plus' size={30} color={'black'} />
      </TouchableOpacity>
      <View style={styles.values}>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btn: {
    margin: 20,
  },
  values: {
    margin: 20,
  }
});