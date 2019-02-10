import React from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';

export default function MarvSlider({ max, min = 0, unit, step, value, onChange, width = 100}) {

  return (
    <View style={styles.rowContainer}>
      <Slider
        style={styles.btn}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChange}
        width={width}
      />
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