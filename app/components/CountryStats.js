import React from 'react';
import {View, FlatList, Dimensions, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';

const {width, height} = Dimensions.get('window');

const CountryStats = (props) => {
  const {countryStatData} = props;

  const renderItem = ({item, index}) => (
    <View
      key={`stat_${index}`}
      style={{
        flex: 1,
        flexDirection: 'row',
        width: width - 16,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#ffffff'
      }}>
      <View style={{justifyContent: 'center', width: (width - 16) / 4, height: 50}}>
        <Text  style={{textAlign: 'center', color: (index === 0) ? '#333333' : '#33cccc', padding: 4}}>{item.Country}</Text>
      </View>
      <View style={{justifyContent: 'center', width: (width - 16) / 4, height: 50}}>
        <Text style={{textAlign: 'center', color: (index === 0) ? '#333333' : '#ff3300'}}>{item.TotalConfirmed}</Text>
      </View>
      <View style={{justifyContent: 'center', width: (width - 16) / 4, height: 50}}>
        <Text style={{textAlign: 'center', color: (index === 0) ? '#333333' : '#00cc00'}}>{item.TotalRecovered}</Text>
      </View>
      <View style={{justifyContent: 'center', width: (width - 16) / 4, height: 40}}>
        <Text style={{textAlign: 'center', color: (index === 0) ? '#333333' : '#979797'}}>{item.TotalDeaths}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{flex: 1, width: width - 14, height, alignItems: 'center', marginTop: 4, borderColor: '#e6e6e6', borderWidth: 1, borderRadius: 10, elevation: 2}}>
      <View
        style={{
          flexDirection: 'row',
          width: width - 16,
          height: 50,
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomColor: '#e6e6e6',
          borderBottomWidth: 1
          // elevation: 2
        }}>
        <View style={{justifyContent: 'center', width: (width - 16) / 4, height: 50}}>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>{'Country'}</Text>
        </View>
        <View style={{justifyContent: 'center', width: (width - 16) / 4, height: 50}}>
          <Text style={{textAlign: 'center'}}>{'Confirmed'}</Text>
        </View>
        <View style={{justifyContent: 'center', width: (width - 16) / 4, height: 50}}>
          <Text style={{textAlign: 'center'}}>{'Recovered'}</Text>
        </View>
        <View style={{justifyContent: 'center', width: (width - 16) / 4, height: 40}}>
          <Text style={{textAlign: 'center'}}>{'Deaths'}</Text>
        </View>
      </View>
      <FlatList
        style={{flex: 1, width: width - 16, height}}
        data={countryStatData}
        renderItem={renderItem}
        keyExtractor={(item) => item.Country}
      />
    </SafeAreaView>
  );
};

export default CountryStats;
