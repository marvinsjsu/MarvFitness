import React from 'react';
import { Text } from 'react-native';

export default function DateHeader({ date, style }) {
  return (
    <Text style={style}>
      {date}
    </Text>
  );
}