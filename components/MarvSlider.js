import React from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';

export default function MarvSlider({ max, min = 0, unit, step, value, onChange, width = 100}) {

  return (
    <View>
      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChange}
        width={width}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}