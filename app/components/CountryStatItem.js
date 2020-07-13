import React from 'react';
import {View, Text, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

const CountryStatItem = ({item, index}) => {
  return (
    <View
      key={`stat_${index}`}
      style={{
        flex: 1,
        flexDirection: 'row',
        width: width - 16,
        height: 50,
        alignItems: 'center',
        backgroundColor: index === 0 ? '#ffffcc' : '#ffffff',
      }}>
      <View
        style={{justifyContent: 'center', width: (width - 16) / 4, height: 50}}>
        <Text
          style={{
            textAlign: 'center',
            color: index === 0 ? '#333333' : '#33cccc',
            padding: 4,
          }}>
          {item.Country}
        </Text>
      </View>
      <View
        style={{justifyContent: 'center', width: (width - 16) / 4, height: 50}}>
        <Text
          style={{
            textAlign: 'center',
            color: index === 0 ? '#333333' : '#ff3300',
          }}>
          {item.TotalConfirmed}
        </Text>
      </View>
      <View
        style={{justifyContent: 'center', width: (width - 16) / 4, height: 50}}>
        <Text
          style={{
            textAlign: 'center',
            color: index === 0 ? '#333333' : '#00cc00',
          }}>
          {item.TotalRecovered}
        </Text>
      </View>
      <View
        style={{justifyContent: 'center', width: (width - 16) / 4, height: 40}}>
        <Text
          style={{
            textAlign: 'center',
            color: index === 0 ? '#333333' : '#979797',
          }}>
          {item.TotalDeaths}
        </Text>
      </View>
    </View>
  );
};

export default CountryStatItem;
