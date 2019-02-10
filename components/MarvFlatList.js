import React from 'react';
import { View, Text, FlatList, SectionList } from 'react-native';

export default function MarvFlatList({ data, onRender}) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={onRender}
      />
    </View>
  );
}