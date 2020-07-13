import React from 'react';
import {View, Text, Dimensions, Picker} from 'react-native';
// import {Picker} from '@react-native-community/picker';

const {width, height} = Dimensions.get('window');

const FilterSection = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        width: width - 14,
        height: 50,
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      {/* <View style={{width: width - 16, backgroundColor: '#fff', alignItems: 'center'}}> */}
        <View style={{width: (width - 16) / 6}}>
          <Text style={{ textAlign: 'center' }}>Filter</Text>
        </View>
        <View style={{width: 2 * (width - 16) / 6}}>
          <Picker></Picker>
        </View>
        <View style={{width: (width - 16) / 6}}></View>
        <View style={{width: 2 * (width - 16) / 6}}></View>
      {/* </View> */}
    </View>
  );
};

export default FilterSection;
