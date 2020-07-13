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
        width: width - 14,
        height: 60,
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        // borderRadius: 4,
        backgroundColor: '#ffffff',
        elevation: 2
      }}>
      {/* {Object.keys(globalStatData).map((key, i) => ( */}
      <View
        key={`stat_data_${1}`}
        style={{
          width: (width - 32) / 3,
          height: 50,
          // backgroundColor: '#ffb3b3',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{'Confirmed'}</Text>
        <Text style={{textAlign: 'center', color: '#ff3300'}}>
          {globalStatData['TotalConfirmed']}
        </Text>
      </View>
      <View
        key={`stat_data_${3}`}
        style={{
          width: (width - 32) / 3,
          height: 50,
          // backgroundColor: '#99ff99',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{'Recovered'}</Text>
        <Text style={{textAlign: 'center', color: '#00cc00'}}>
          {globalStatData['TotalRecovered']}
        </Text>
      </View>
      <View
        key={`stat_data_${2}`}
        style={{
          width: (width - 32) / 3,
          height: 50,
          // backgroundColor: '#e6e6e6',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{'Deaths'}</Text>
        <Text style={{textAlign: 'center', color: '#979797'}}>
          {globalStatData['TotalDeaths']}
        </Text>
      </View>

      {/* ))} */}
    </View>
  );
};

export default GlobalStats;
