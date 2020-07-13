import React from 'react';
import {View, Text, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const FilterSection = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#e6e6e6',
        width: width - 16,
        height: 50,
      }}>
      <View style={{width: (2 * width) / 3, backgroundColor: '#fff'}}>
        <Text>CUrrent Filter</Text>
      </View>
      <View style={{width: width / 3}}>
        <Text>Filter</Text>
      </View>
    </View>
  );
};

export default FilterSection;
