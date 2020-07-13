import React from 'react';
import {View, Text, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const GlobalStats = (props) => {
  const {globalStatData} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width,
        height: 60,
      }}>
      {/* {Object.keys(globalStatData).map((key, i) => ( */}
      <View
        key={`stat_data_${1}`}
        style={{
          width: (width - 32) / 3,
          height: 50,
          backgroundColor: '#ffb3b3',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{'Confirmed'}</Text>
        <Text style={{textAlign: 'center'}}>
          {globalStatData['TotalConfirmed']}
        </Text>
      </View>
      <View
        key={`stat_data_${3}`}
        style={{
          width: (width - 32) / 3,
          height: 50,
          backgroundColor: '#99ff99',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{'Recovered'}</Text>
        <Text style={{textAlign: 'center'}}>
          {globalStatData['TotalRecovered']}
        </Text>
      </View>
      <View
        key={`stat_data_${2}`}
        style={{
          width: (width - 32) / 3,
          height: 50,
          backgroundColor: '#e6e6e6',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{'Deaths'}</Text>
        <Text style={{textAlign: 'center'}}>
          {globalStatData['TotalDeaths']}
        </Text>
      </View>

      {/* ))} */}
    </View>
  );
};

export default GlobalStats;
