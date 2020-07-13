import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AppBar = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
      <Text style={{ fontSize: 16, opacity: 0 }}>{'<'}</Text>
      <Text style={{ color: '#ffffff' }}>{'COVID STATS'}</Text>
      <Text style={{ fontSize: 16, opacity: 0 }}>{'<'}</Text>
    </View>
  );
}

export default AppBar;  