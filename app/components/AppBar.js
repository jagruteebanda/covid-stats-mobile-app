import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const AppBar = ({ handleFilterPopup = f => f }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width,
        height: 50,
        backgroundColor: '#00cc99',
      }}>
      <View style={{padding: 8}}>
        <Text style={{fontSize: 16, opacity: 0}}>{'<'}</Text>
      </View>
      <Text style={{color: '#ffffff'}}>{'COVID STATS'}</Text>
      <TouchableOpacity onPress={() => handleFilterPopup()}>
        <View style={{padding: 8}}>
          <Text style={{fontSize: 16}}>{'='}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppBar;
