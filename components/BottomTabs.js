import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function BottomTabs() {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 30,
        justifyContent: 'space-between',
      }}>
      <Text>Home</Text>
      <Text>Profile</Text>
    </View>
  );
}
